package com.example.vehiclerentalplatform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.vehiclerentalplatform.model.Bookings;
import java.util.List;


public interface BookingsRepository extends MongoRepository<Bookings,String>{
    List<Bookings> findByEmail(String email);
    Page<Bookings> findByEmail(String email, PageRequest pageRequest);

    @Query("{ $or: [ { 'carModelName' : { $regex: ?0, $options: 'i' } }, { 'email' : { $regex: ?0, $options: 'i' } } ] }")
    Page<Bookings> findByCarModelNameAndEmail(String searchedValue, PageRequest pageRequest);

    @Query("{ 'email' : ?0, $or[{'carModelName' : { $regex: ?1, $options: 'i' } }, {'email' : { $regex: ?1, $options: 'i' } }]")
    Page<Bookings> findByEmailAndCarModelNameAndEmail(String email, String searchedValue, PageRequest pageRequest);
}
