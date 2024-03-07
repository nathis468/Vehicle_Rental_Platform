package com.example.vehiclerentalplatform.dto;

import com.example.vehiclerentalplatform.model.Vehicles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NearestVehicles {
    private double distance;
    private Vehicles vehicles;
}
