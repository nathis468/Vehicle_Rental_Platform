package com.example.vehiclerentalplatform.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UpdateVehicle {
    private String id;
    private String carModel;
    private String seatingCapacity;
    private String mileage;
    private String fuelCapacity;
    private String fuelType;
    private String insuranceCoverage;
    private String cancellationPolicy;
    private double price;
    private double latitude;
    private double longitude;
    private List<String> images;

    public UpdateVehicle(){
        this.images = new ArrayList<>();
    }

}
