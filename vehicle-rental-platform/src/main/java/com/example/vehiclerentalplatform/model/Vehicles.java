package com.example.vehiclerentalplatform.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.vehiclerentalplatform.dto.Ratings;
import com.example.vehiclerentalplatform.dto.UpdateVehicle;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "vehicles")
public class Vehicles {
    @Id
    private String _id;

    @Field("car_model")
    private String carModel;

    @Field("seating_capacity")
    private String seatingCapacity;

    @Field("mileage")
    private String mileage;
    
    @Field("fuel_capacity")
    private String fuelCapacity;

    @Field("fuel_type")
    private String fuelType;

    @Field("insurance_coverage")
    private String insuranceCoverage;

    @Field("cancellation_policy")
    private String cancellationPolicy;

    @Field("price")
    private double price;

    @Field("latitude")
    private double latitude;

    @Field("longitude")
    private double longitude;

    @Field("ratings")
    private List<Ratings> ratings;

    @Field("booking_details")
    private List<String> booking_details;

    @Field("images")
    private List<String> images;

    @Field("maintanance")
    private List<String> maintanance;

    @Field("deleted")
    private boolean deleted;

    public Vehicles(){
        this.images = new ArrayList<>();
        this.maintanance = new ArrayList<>();
        this.deleted = false;
    }

    public void updateVehicle(UpdateVehicle updateVehicle) {
        this._id = updateVehicle.getId();
        this.carModel = updateVehicle.getCarModel();
        this.seatingCapacity = updateVehicle.getSeatingCapacity();
        this.mileage = updateVehicle.getMileage();
        this.fuelCapacity = updateVehicle.getFuelCapacity();
        this.fuelType = updateVehicle.getFuelType();
        this.insuranceCoverage = updateVehicle.getInsuranceCoverage();
        this.cancellationPolicy = updateVehicle.getCancellationPolicy();
        this.price = updateVehicle.getPrice();
        this.latitude = updateVehicle.getLatitude();
        this.longitude = updateVehicle.getLongitude();
        this.images.addAll(updateVehicle.getImages());
    }
}
