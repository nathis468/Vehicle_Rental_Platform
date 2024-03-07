package com.example.vehiclerentalplatform.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.RolePermissions;
import com.example.vehiclerentalplatform.security.model.Role;

@Repository
public interface RolePermissionsRepository extends MongoRepository<RolePermissions,String>{

    RolePermissions findByRole(Role role);
    
}
