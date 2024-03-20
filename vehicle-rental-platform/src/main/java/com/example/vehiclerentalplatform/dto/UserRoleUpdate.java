package com.example.vehiclerentalplatform.dto;

import com.example.vehiclerentalplatform.security.model.Role;

import lombok.Data;

@Data
public class UserRoleUpdate {
    private String email;
    private Role role;
}
