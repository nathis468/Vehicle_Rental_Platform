package com.example.vehiclerentalplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerentalplatform.model.Bookings;
import com.example.vehiclerentalplatform.service.BookingsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/bookings")
@CrossOrigin()
public class BookingsController {
    @Autowired
    private BookingsService bookingsService;

    @GetMapping("{email}")
    public ResponseEntity<Page<Bookings>> getMethodName(@PathVariable String email, @RequestParam("page") int page, @RequestParam("pageSize") int pageSize, @RequestParam("searchedValue") String searchedValue, @RequestParam("active") String active, @RequestParam("direction") String direction) {
        return new ResponseEntity<>(bookingsService.getBookingDetails(email, page, pageSize, searchedValue, active, direction),HttpStatus.OK);
    }
    
    @PostMapping("")
    public ResponseEntity<Bookings> postMethodName(@RequestBody Bookings newPayment) {
        return new ResponseEntity<>(bookingsService.createPaymentRecord(newPayment),HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> provideRatingsController(@RequestBody Bookings theBooking,@RequestParam Integer rating) {
        bookingsService.setRatingService(theBooking, rating);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
