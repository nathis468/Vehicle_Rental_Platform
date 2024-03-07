package com.example.vehiclerentalplatform.dto;

import lombok.Data;

@Data
public class UsersList {
    private String userName;
    private String email;

    public UsersList(String userName, String email){
        this.userName = userName;
        this.email = email;
    }
}
