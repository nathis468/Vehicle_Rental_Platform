package com.example.vehiclerentalplatform.dto;

import lombok.Data;

@Data
public class UserUpdate {
    private String id;
    private String userName;
    private String contactNumber;
    private String profilePic;
    private String bio;
}
