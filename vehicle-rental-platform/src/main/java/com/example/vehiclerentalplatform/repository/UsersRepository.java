package com.example.vehiclerentalplatform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.vehiclerentalplatform.model.Users;

public interface UsersRepository extends MongoRepository<Users,String>{
    Users findByEmail(String email);

    @Query("{ $or: [ { 'emaiil' : { $regex: ?0, $options: 'i' } }, { 'userName' : { $regex: ?0, $options: 'i' } } ] }")
    Page<Users> findByEmailAndUserName(String serachedValue, Pageable paegRequest);
}
