package com.example.vehiclerentalplatform.dto;

import java.util.List;

import lombok.Data;

@Data
public class NewVehicle {  
    private String carModel;
    private String seatingCapacity;
    private String mileage;
    private String fuelCapacity;
    private String fuelType;
    private String insuranceCoverage;
    private String cancellationPolicy;
    private String price;
    private String latitude;
    private String longitude;
    private String ratings;
    private List<String> booking_details;
    private String image;
}
