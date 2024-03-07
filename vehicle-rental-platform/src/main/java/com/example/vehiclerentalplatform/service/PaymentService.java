package com.example.vehiclerentalplatform.service;

import com.example.vehiclerentalplatform.dto.Payments;
import com.example.vehiclerentalplatform.model.PaymentRecord;

public interface PaymentService {
    Payments createTransaction(double amount);
}
