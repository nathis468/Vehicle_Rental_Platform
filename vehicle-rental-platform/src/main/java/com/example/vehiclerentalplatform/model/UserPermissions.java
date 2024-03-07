package com.example.vehiclerentalplatform.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.vehiclerentalplatform.security.model.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_permissions")
public class UserPermissions {
    @Id
    private String _id;
    @DocumentReference(collection = "userEntity")
    private UserEntity user; 
    @DocumentReference(collection = "permissions")
    @Field("user_permissions")
    private List<Permissions> userPermissions;
}

