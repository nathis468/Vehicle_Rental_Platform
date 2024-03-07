package com.example.vehiclerentalplatform.security.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.UserCreate;
import com.example.vehiclerentalplatform.dto.UserUpdate;
import com.example.vehiclerentalplatform.model.Users;
import com.example.vehiclerentalplatform.repository.UsersRepository;
import com.example.vehiclerentalplatform.security.controller.Token;
import com.example.vehiclerentalplatform.security.model.LoginRequest;
import com.example.vehiclerentalplatform.security.model.Role;
import com.example.vehiclerentalplatform.security.model.UserEntity;
import com.example.vehiclerentalplatform.security.repository.UserEntityRepository;
import com.example.vehiclerentalplatform.service.PermissionUpdateService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserEntityRepository userRepo;

    private final UsersRepository usersRepo;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;
    
    private final AuthenticationManager authenticationManager;

    private final PermissionUpdateService permissionUpdateService;

    public Token register(UserCreate userCreate) {

        Users userData = new Users();
        userData.setUserName(userCreate.getUserName());
        userData.setEmail(userCreate.getEmail());
        userData.setContactNumber(userCreate.getContactNumber());

        UserEntity user = new UserEntity();
        user.setUserName(userData.getUserName());
        user.setEmail(userData.getEmail());


        user.setPassword(passwordEncoder.encode(userCreate.getPassword()));
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        else{
            user.setRole(Role.USER);
            usersRepo.save(userData);
            userRepo.save(user);
        }

        permissionUpdateService.addNewUserPermissionsFromUserEntity(user);

        String jwt = jwtService.generateToken(user);
        Token token = new Token(jwt,new ArrayList<>(), new Users());
        return token;
    }

    public Token authenticate(LoginRequest request) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        }
        catch(Exception e){
            throw new BadCredentialsException("Invalid Credentials");
        }
        UserEntity user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        
        Token token = new Token(jwt, permissionUpdateService.getPermissions(user), usersRepo.findByEmail(request.getEmail()));
        return token;
    }

    public void updateProfile(UserUpdate user){
        Users existingUser =  usersRepo.findById(user.getId()).get();
        existingUser.setUserName(user.getUserName());
        existingUser.setContactNumber(user.getContactNumber());
        existingUser.setBio(user.getBio());
        existingUser.setProfilePic(user.getProfilePic());

        UserEntity userEntity = userRepo.findByEmail(existingUser.getEmail()).get();
        userEntity.setUserName(user.getUserName());

        userRepo.save(userEntity);
        usersRepo.save(existingUser);
    }

    public String imageConvet(MultipartFile file) {
        String url = "";
        String contentType = file.getContentType();

        if (contentType != null && contentType.startsWith("image")) {
            url = "http://localhost:8080/static/images/" + file.getOriginalFilename();
            try {
                file.transferTo(new File("C:/Trustrace/Vehicle Rental Platform/vehicle-rental-platform/src/main/resources/static/images/" + file.getOriginalFilename()));
            } 
            catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        } 
        else {
            throw new RuntimeException("Invalid file type");
        }
        return url;
    }
}
