package com.example.vehiclerentalplatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.Roles;

@Repository
public interface RolesRepository extends MongoRepository<Roles,String>{
    
}
