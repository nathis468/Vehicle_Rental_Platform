package com.example.vehiclerentalplatform.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerentalplatform.dto.MailInfo;
import com.example.vehiclerentalplatform.model.Bookings;
import com.example.vehiclerentalplatform.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/email")
@CrossOrigin()
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("{status}")
    public ResponseEntity<Void> sendEmail(@RequestBody MailInfo mailInfo, @PathVariable String status) {
        emailService.sendEmail(mailInfo, status);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
