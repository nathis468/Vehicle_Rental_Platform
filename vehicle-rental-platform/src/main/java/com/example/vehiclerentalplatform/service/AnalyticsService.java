package com.example.vehiclerentalplatform.service;

import java.util.List;

import com.example.vehiclerentalplatform.dto.MonthlyIncome;
import com.example.vehiclerentalplatform.dto.TopRatings;

public interface AnalyticsService {
    List<MonthlyIncome> calculateMonthlyIncome(String carModelName);
    List<TopRatings> topRating(String val);
}
