package com.example.vehiclerentalplatform.security.controller;

import lombok.Data;

@Data
public class Token {
    private String token;

    public Token(String jwt){
        this.token = jwt;
    }
}