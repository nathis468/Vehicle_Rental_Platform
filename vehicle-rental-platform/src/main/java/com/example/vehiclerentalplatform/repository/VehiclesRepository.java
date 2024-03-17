package com.example.vehiclerentalplatform.repository;

import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.Vehicles;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;


@Repository
public interface VehiclesRepository extends MongoRepository<Vehicles,String>{
    Vehicles findByCarModel(String carModel);
    Optional<Vehicles> findBy_id(String _id);
    List<Vehicles> findByDeleted(boolean deleted);
}
