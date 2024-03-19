package com.example.vehiclerentalplatform.dto;

import com.example.vehiclerentalplatform.model.Vehicles;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NearestVehicles {
    private double distance;
    private Vehicles vehicles;
    private int currentImage;

    public NearestVehicles() {
        this.currentImage = 0;
    }
}
