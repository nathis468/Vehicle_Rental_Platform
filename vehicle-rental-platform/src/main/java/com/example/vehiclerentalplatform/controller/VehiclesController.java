package com.example.vehiclerentalplatform.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.Filters;
import com.example.vehiclerentalplatform.dto.MonthlyIncome;
import com.example.vehiclerentalplatform.dto.NearestVehicles;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.service.VehiclesService;
import com.example.vehiclerentalplatform.service.implementaion.VehiclesServiceImpl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/vehicles")
@CrossOrigin()
public class VehiclesController {

    @Autowired
    private VehiclesService vehiclesService;

    @Autowired
    private VehiclesServiceImpl vehiclesServiceImpl;

    @GetMapping("")
    public ResponseEntity<List<NearestVehicles>> getFilteredController(@RequestParam String latitude,@RequestParam String longitude,@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        Filters newFilter = new Filters();
        newFilter.setLatitude(latitude);
        newFilter.setLongitude(longitude);
        newFilter.setStartDate(startDate);
        newFilter.setEndDate(endDate);
        return new ResponseEntity<>(vehiclesService.getFilteredVehicleService(newFilter),HttpStatus.OK);
    }    

    @GetMapping("/{vehicleId}")
    public ResponseEntity<NearestVehicles> getVehicleById(@PathVariable String vehicleId) {
        return new ResponseEntity<>(vehiclesService.getVehicleById(vehicleId),HttpStatus.OK);
    }
    

    @PostMapping("")
    public ResponseEntity<Vehicles> insertNewVehicleController(@ModelAttribute Vehicles newVehicle,@RequestParam("file") MultipartFile imagFile){
        newVehicle.setImage(vehiclesService.imageConvet(imagFile));
        return new ResponseEntity<>(vehiclesService.insertNewVehicleService(newVehicle),HttpStatus.OK);
    }  
    
    @PutMapping("")
    public ResponseEntity<Vehicles> updateVehicleController(@RequestBody Vehicles updateVehicle) {
        return new ResponseEntity<>(vehiclesService.updateVehicleService(updateVehicle),HttpStatus.OK);
    }
    
    @DeleteMapping("")
    public ResponseEntity<Vehicles> deleteVehicleController(@RequestBody Vehicles deleteVehicle) {
        vehiclesService.deleteVehicleService(deleteVehicle);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getCarsName")
    public ResponseEntity<List<String>> getCarNameController() {
        return new ResponseEntity<>(vehiclesService.getCarsName(),HttpStatus.OK);
    }  
}
