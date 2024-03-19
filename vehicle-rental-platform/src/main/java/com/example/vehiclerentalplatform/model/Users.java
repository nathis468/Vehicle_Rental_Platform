package com.example.vehiclerentalplatform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
public class Users {
    @Id
    private String _id;

    @Field("user_name")
    private String userName;
    
    @Field("email")
    private String email;

    @Field("profile_pic")
    private String profilePic;

    @Field("contact_number")
    private String contactNumber;

    @Field("bio")
    private String bio;

    @Field("address")
    private String address;

    @Field("city")
    private String city;

    @Field("state")
    private String state;

    @Field("zipcode")
    private String zipCode;    

    public Users() {
        this.profilePic = "";
        this.bio = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
    }
}
