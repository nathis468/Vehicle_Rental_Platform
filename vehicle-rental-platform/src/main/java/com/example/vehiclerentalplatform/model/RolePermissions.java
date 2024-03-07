package com.example.vehiclerentalplatform.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "role_permissions")
public class RolePermissions {
    @Id
    private String _id;
    private String role;
    @DocumentReference(collection = "permissions")
    @Field("role_permissions")
    private List<Permissions> rolePermissions;
}
