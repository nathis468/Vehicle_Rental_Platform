package com.example.vehiclerentalplatform.service;


import org.springframework.data.domain.Page;

import com.example.vehiclerentalplatform.model.Bookings;

public interface BookingsService {
    Page<Bookings> getBookingDetails(String email, int page, int pageSize, String searchedValue, String active, String direction);
    void createPaymentRecord(Bookings newRecord);
    void setRatingService(Bookings theBooking,Integer rating);
    void cancelBookingService(Bookings theBookings);
}
