package com.example.vehiclerentalplatform.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.vehiclerentalplatform.model.Maintanance;


public interface MaintananceRepository extends MongoRepository<Maintanance,String>{
    Page<Maintanance> findByMaintananceType(String maintananceType, PageRequest page);    
}
