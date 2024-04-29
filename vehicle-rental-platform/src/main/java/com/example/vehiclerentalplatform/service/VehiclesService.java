package com.example.vehiclerentalplatform.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.Filters;
import com.example.vehiclerentalplatform.dto.NearestVehicles;
import com.example.vehiclerentalplatform.dto.UpdateVehicle;
import com.example.vehiclerentalplatform.model.Vehicles;

public interface VehiclesService {
    NearestVehicles getVehicleById(String vehicleId);
    List<NearestVehicles> getFilteredVehicleService(Filters newFilter);
    Vehicles insertNewVehicleService(Vehicles newVehicle);
    Vehicles updateVehicleService(UpdateVehicle updateVehicle);
    List<NearestVehicles> haversine(Filters newFilter,List<Vehicles> filteredVehicles);
    String imageConvet(MultipartFile file);
    boolean deleteVehicleService(Vehicles deleteVehicle) throws ParseException;
    List<String> getCarsName();
}
