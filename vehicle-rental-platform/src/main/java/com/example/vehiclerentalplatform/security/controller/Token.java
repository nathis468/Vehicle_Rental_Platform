package com.example.vehiclerentalplatform.security.controller;

import java.util.List;

import com.example.vehiclerentalplatform.model.Users;

public class Token {
    private final String token;
    private final List<String> permissions;
    private Users userInfo;

    public Token(String jwt,List<String> permission,Users userInfo) {
        this.token = jwt;
        this.permissions = permission;
        this.userInfo = userInfo;
    }

    public String getToken() {
        return token;
    }
    public List<String> getPermission() {
        return permissions;
    }

    public Users getUserInfo(){
        return userInfo;
    }
}