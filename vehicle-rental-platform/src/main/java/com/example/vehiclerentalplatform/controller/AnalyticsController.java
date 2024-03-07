package com.example.vehiclerentalplatform.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerentalplatform.dto.MonthlyIncome;
import com.example.vehiclerentalplatform.dto.TopRatings;
import com.example.vehiclerentalplatform.service.AnalyticsService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/analytics")
@CrossOrigin()
public class AnalyticsController {
    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("yearly")
    public ResponseEntity<List<MonthlyIncome>> getMonthlyIncome(@RequestParam("carModelName")  String carModelName) {
        return new ResponseEntity<>(analyticsService.calculateMonthlyIncome(carModelName),HttpStatus.OK);
    }

    @GetMapping("/rating/{val}")
    public ResponseEntity<List<TopRatings>> getTopRratings(@PathVariable String val) {
        return new ResponseEntity<>(analyticsService.topRating(val), HttpStatus.OK);
    }
}
