package com.example.vehiclerentalplatform.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filters {
    private String latitude;
    private String longitude;
    private Date startDate;
    private Date endDate;
}
