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
@Document(collection = "bookings")
public class Bookings {
    @Id
    private String _id;

    @Field("car_model_name")
    private String carModelName;

    @Field("email")
    private String email;

    @Field("from_date")
    private Date fromDate;

    @Field("to_date")
    private Date toDate;

    @Field("price")
    private String price;

    @Field("status")
    private String status;

    @Field("vehicle_details")
    private String vehcileDetails;

    @Field("payment_date")
    private Date paymentDate;

    @Field("latitude")
    private String latitude;

    @Field("longitude")
    private String longitude;

    @Field("payment_id")
    private String paymentId;

    @Field("currency")
    private String currency;

    @Field("booking_date")
    private Date bookingDate;

    public Bookings(){
        this.bookingDate = new Date();
    }
}
