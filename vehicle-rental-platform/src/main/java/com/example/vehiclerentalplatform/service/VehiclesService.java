package com.example.vehiclerentalplatform.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.Filters;
import com.example.vehiclerentalplatform.dto.NearestVehicles;
import com.example.vehiclerentalplatform.model.Vehicles;

public interface VehiclesService {
    NearestVehicles getVehicleById(String vehicleId);
    List<NearestVehicles> getFilteredVehicleService(Filters newFilter);
    Vehicles insertNewVehicleService(Vehicles newVehicle);
    Vehicles updateVehicleService(Vehicles updateVehicle);
    List<NearestVehicles> haversine(Filters newFilter,List<Vehicles> filteredVehicles);
    String imageConvet(MultipartFile file);
    void deleteVehicleService(Vehicles deleteVehicle);
    List<String> getCarsName();
}
