package com.example.vehiclerentalplatform.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dto.Filters;
import com.example.vehiclerentalplatform.dto.NearestVehicles;
import com.example.vehiclerentalplatform.dto.UpdateVehicle;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.service.VehiclesService;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return new ResponseEntity<>("All good", HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<NearestVehicles>> getFilteredController(@RequestParam String latitude,@RequestParam String longitude,@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate, @RequestParam int currentPage) {
        Filters newFilter = new Filters();
        newFilter.setLatitude(latitude);
        newFilter.setLongitude(longitude);
        newFilter.setStartDate(startDate);
        newFilter.setEndDate(endDate);
        newFilter.setCurrentPage(currentPage);
        return new ResponseEntity<>(vehiclesService.getFilteredVehicleService(newFilter),HttpStatus.OK);
    }    

    @GetMapping("/{vehicleId}")
    public ResponseEntity<NearestVehicles> getVehicleById(@PathVariable String vehicleId) {
        return new ResponseEntity<>(vehiclesService.getVehicleById(vehicleId),HttpStatus.OK);
    }
    

    @PostMapping("")
    public ResponseEntity<Vehicles> insertNewVehicleController(@ModelAttribute Vehicles newVehicle,@RequestParam("file") MultipartFile[] imageFile){
        for(int i=0;i<imageFile.length;i++){
            newVehicle.getImages().add(vehiclesService.imageConvet(imageFile[i]));
        }
        return new ResponseEntity<>(vehiclesService.insertNewVehicleService(newVehicle),HttpStatus.OK);
    }  
    
    @PutMapping("")
    public ResponseEntity<Vehicles> updateVehicleController(@ModelAttribute UpdateVehicle newVehicle,@RequestParam("file") MultipartFile[] imageFile) {
        if(!imageFile[0].getOriginalFilename().equals("empty.txt")) {
            for(int i=0;i<imageFile.length;i++){
                newVehicle.getImages().add(vehiclesService.imageConvet(imageFile[i]));
            }
        }
        return new ResponseEntity<>(vehiclesService.updateVehicleService(newVehicle), HttpStatus.OK);
    }
    
    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteVehicleController(@RequestBody Vehicles deleteVehicle) throws ParseException {
        return new ResponseEntity<>(vehiclesService.deleteVehicleService(deleteVehicle),HttpStatus.OK);
    }

    @GetMapping("/getCarsName")
    public ResponseEntity<List<String>> getCarNameController() {
        return new ResponseEntity<>(vehiclesService.getCarsName(), HttpStatus.OK);
    }
}
