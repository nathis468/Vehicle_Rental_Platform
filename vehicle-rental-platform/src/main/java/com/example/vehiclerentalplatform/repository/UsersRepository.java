package com.example.vehiclerentalplatform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.vehiclerentalplatform.model.Users;

public interface UsersRepository extends MongoRepository<Users,String>{
    Page<Users> findAll(Pageable page);
    Users findByEmail(String email);
}
