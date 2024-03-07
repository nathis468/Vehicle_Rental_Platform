package com.example.vehiclerentalplatform.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Ratings {
    private List<String> bookingId;
    private Double rating;
    private Integer count;

    public Ratings(){
        this.bookingId = new ArrayList<>();
        this.rating = 0.0;
        this.count = 0;
    }
}
