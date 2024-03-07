package com.example.vehiclerentalplatform.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.vehiclerentalplatform.model.PaymentRecord;

public interface PaymentRecordRepository extends MongoRepository<PaymentRecord,String>{
    
}
