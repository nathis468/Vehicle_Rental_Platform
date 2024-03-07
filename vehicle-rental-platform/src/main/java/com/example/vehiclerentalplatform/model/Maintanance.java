package com.example.vehiclerentalplatform.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "maintanance")
public class Maintanance {
    @Id
    private String _id;

    @Field("car_model_name")
    private String carModelName;

    @Field("maintanance_type")
    private String maintananceType;

    @Field("service_date")
    private Date serviceDate;

    @Field("price")
    private Double price;

    @Field("description")
    private String description;

    @Field("image")
    private String image;

    @Field("status")
    private String status;
}

