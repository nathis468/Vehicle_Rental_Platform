package com.example.vehiclerentalplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlyIncome {
    private String month;
    private double income;
}