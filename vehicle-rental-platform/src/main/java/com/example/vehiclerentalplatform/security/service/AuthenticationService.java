package com.example.vehiclerentalplatform.security.service;

import java.io.File;
import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.UserCreate;
import com.example.vehiclerentalplatform.dto.UserRoleUpdate;
import com.example.vehiclerentalplatform.dto.UserUpdate;
import com.example.vehiclerentalplatform.exception.ContactNumberAlreadyExistsException;
import com.example.vehiclerentalplatform.exception.EmailAlreadyExistsException;
// import com.example.vehiclerentalplatform.model.UserPermissions;
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

    // private final UserPermissions userPermissions;

    // private final UserPermissionsDAO userPermissionsDAO;

    public void register(UserCreate userCreate) {

        Users userData = new Users();
        userData.setUserName(userCreate.getUserName());
        userData.setEmail(userCreate.getEmail());
        userData.setContactNumber(userCreate.getContactNumber());
        userData.setRole(Role.USER);

        UserEntity user = new UserEntity();
        user.setUserName(userData.getUserName());
        user.setEmail(userData.getEmail());


        user.setPassword(passwordEncoder.encode(userCreate.getPassword()));
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        if(usersRepo.existsByContactNumber(userCreate.getContactNumber())) {
            throw new ContactNumberAlreadyExistsException("Contact Number Already Exists");
        }

        else{
            user.setRole(Role.USER);
            usersRepo.save(userData);
            userRepo.save(user);
        }

        permissionUpdateService.addNewUserPermissionsFromUserEntity(user);
    }

    public Token authenticate(LoginRequest request) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        }
        catch(Exception e){
            throw new BadCredentialsException("Invalid Credentials");
        }
        UserEntity user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        String jwt = jwtService.generateToken(user, permissionUpdateService.getPermissions(user), usersRepo.findByEmail(request.getEmail()));

        Token token = new Token(jwt);
        return token;
    }

    public Users updateProfile(UserUpdate user){
        Users existingUser =  usersRepo.findById(user.getId()).get();
        existingUser.setUserName(user.getUserName());
        existingUser.setContactNumber(user.getContactNumber());
        existingUser.setProfilePic(user.getProfilePic());
        existingUser.setBio(user.getBio());
        existingUser.setAddress(user.getAddress());
        existingUser.setCity(user.getCity());
        existingUser.setState(user.getState());
        existingUser.setZipCode(user.getZipCode());

        UserEntity userEntity = userRepo.findByEmail(existingUser.getEmail()).get();
        userEntity.setUserName(user.getUserName());

        if(user.getRole() != null){
            existingUser.setRole(Role.FLEET_MANAGER);
            userEntity.setRole(Role.FLEET_MANAGER); 
        }

        userRepo.save(userEntity);
        return usersRepo.save(existingUser);
    }

    public Users updateRole(UserRoleUpdate user) {
        Users existingUser = usersRepo.findByEmail(user.getEmail());
        existingUser.setRole(user.getRole());

        UserEntity userEntity = userRepo.findByEmail(existingUser.getEmail()).get();
        userEntity.setRole(user.getRole());

        userRepo.save(userEntity);

        permissionUpdateService.updateUserPermissionsFromUserEntity(userEntity);

        return usersRepo.save(existingUser);
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
