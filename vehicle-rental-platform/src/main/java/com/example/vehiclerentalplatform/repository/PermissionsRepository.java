package com.example.vehiclerentalplatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.Permissions;


@Repository
public interface PermissionsRepository extends MongoRepository<Permissions,String>{
    Permissions findBy_id(String _id);
}
