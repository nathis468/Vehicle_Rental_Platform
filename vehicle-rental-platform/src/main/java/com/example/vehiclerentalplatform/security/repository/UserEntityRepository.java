package com.example.vehiclerentalplatform.security.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.security.model.UserEntity;

@Repository
public interface UserEntityRepository extends MongoRepository<UserEntity,String>{
    Optional<UserEntity> findByUserName(String username);
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
}