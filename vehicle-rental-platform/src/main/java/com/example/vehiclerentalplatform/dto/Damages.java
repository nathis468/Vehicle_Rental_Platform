package com.example.vehiclerentalplatform.dto;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Field;

public class Damages{

    @Field("car_model_name")
    private String carModelName;

    @Field("service_date")
    private Date service_date;

    @Field("price")
    private Double price;

    @Field("description")
    private String description;

    @Field("image")
    private String image;
}
