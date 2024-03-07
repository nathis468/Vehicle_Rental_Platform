package com.example.vehiclerentalplatform.dto;

import lombok.Data;

@Data
public class UserCreate {
    private String userName;
    private String email;
    private String password;
    private String contactNumber;
}
