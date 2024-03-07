package com.example.vehiclerentalplatform.dto;

import com.example.vehiclerentalplatform.model.Bookings;

import lombok.Data;

@Data
public class MailInfo {
    private String toEmail;
    private String subject;
    private String body;
    private Bookings bookingDetails;
}
