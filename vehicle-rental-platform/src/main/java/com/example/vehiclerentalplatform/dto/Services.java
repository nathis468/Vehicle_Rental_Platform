package com.example.vehiclerentalplatform.dto;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Field;

public class Services {

    @Field("car_model_name")
    private String carModelName;

    @Field("service_date")
    private Date serviceDate;

    @Field("price")
    private Double price;

    @Field("status")
    private String status;

    @Field("description")
    private String description;
}