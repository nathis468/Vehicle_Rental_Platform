package com.example.vehiclerentalplatform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor 
@Document(collection = "roles")
public class Roles {
    @Id 
    private String _id;
    private String role;
}
