package com.example.vehiclerentalplatform.dto;

import com.example.vehiclerentalplatform.security.model.Role;

import lombok.Data;

@Data
public class UserUpdate {
    private String id;
    private String userName;
    private String contactNumber;
    private String profilePic;
    private String bio;
    private Role role;
    private String address;
    private String city;
    private String state;
    private String zipCode;    
}
