package com.example.vehiclerentalplatform.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.UserCreate;
import com.example.vehiclerentalplatform.dto.UserUpdate;
import com.example.vehiclerentalplatform.model.Users;
import com.example.vehiclerentalplatform.security.model.LoginRequest;
import com.example.vehiclerentalplatform.security.service.AuthenticationService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping(path = "/api/auth")
@RequiredArgsConstructor
@CrossOrigin()
public class AuthenticationController { 
    @Autowired
    private AuthenticationService service;

    @PostMapping("/register")
    public void register(@RequestBody UserCreate request){
        service.register(request);
    }

    @PostMapping("/login")
    public Token authenticate(@RequestBody LoginRequest request){  
        Token token = service.authenticate(request);
        return token;
    }

    @PutMapping("updateProfile")
    public Users putMethodName(@ModelAttribute UserUpdate user, @RequestParam("file") MultipartFile fileImage) {

        if(!fileImage.isEmpty()){
            user.setProfilePic(service.imageConvet(fileImage));
        }
        return service.updateProfile(user);
    }
}   