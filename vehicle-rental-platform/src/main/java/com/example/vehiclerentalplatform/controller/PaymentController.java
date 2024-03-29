package com.example.vehiclerentalplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerentalplatform.dto.Payments;
import com.example.vehiclerentalplatform.service.PaymentService;

@RestController
@RequestMapping("/payment")
@CrossOrigin()
@PreAuthorize("hasRole('USER')")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("")
    public ResponseEntity<Payments> createTransaction(@RequestParam double amount) {
        try {
            Payments response = paymentService.createTransaction(amount);
            return new ResponseEntity<>(response,HttpStatus.OK);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }    
}
