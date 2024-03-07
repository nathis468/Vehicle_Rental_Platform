package com.example.vehiclerentalplatform.repository;

import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.Vehicles;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface VehiclesRepository extends MongoRepository<Vehicles,String>{
    Optional<Vehicles> findById(String id);
    Vehicles findByCarModel(String carModel);
}
