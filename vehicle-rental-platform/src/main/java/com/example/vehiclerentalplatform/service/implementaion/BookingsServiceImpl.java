package com.example.vehiclerentalplatform.service.implementaion;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.vehiclerentalplatform.model.Bookings;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.repository.BookingsRepository;
import com.example.vehiclerentalplatform.repository.VehiclesRepository;
import com.example.vehiclerentalplatform.security.model.Role;
import com.example.vehiclerentalplatform.security.model.UserEntity;
import com.example.vehiclerentalplatform.security.repository.UserEntityRepository;
import com.example.vehiclerentalplatform.service.BookingsService;

@Service
public class BookingsServiceImpl implements BookingsService{
    @Autowired
    private UserEntityRepository userEntityRepo;

    @Autowired
    private BookingsRepository bookingsRepo;

    @Autowired
    private VehiclesRepository vehiclesRepo;

    @Override
    public Page<Bookings> getBookingDetails(String email, int page, int pageSize, String searchedValue, String active, String direction) {

        PageRequest pageable;

        if(!active.equalsIgnoreCase("") && !direction.equalsIgnoreCase("")){
            if(direction.equalsIgnoreCase("asc")){
                pageable = PageRequest.of(page-1, pageSize, Sort.by(Sort.Order.asc(active)));
            }
            else{
                pageable = PageRequest.of(page-1, pageSize, Sort.by(Sort.Order.desc(active)));
            }
        }

        else{
            pageable = PageRequest.of(page-1, pageSize, Sort.by(Sort.Order.desc("bookingDate")));
        }


        Optional<UserEntity> user  = userEntityRepo.findByEmail(email);
        if(user.get().getRole().equals(Role.USER)){ 
            Page<Bookings> result = bookingsRepo.findByEmailAndCarModelNameAndEmail(email,searchedValue,pageable);
            return result;
        }
        Page<Bookings> result2 = bookingsRepo.findByCarModelNameAndEmail(searchedValue, pageable);
        return result2;
    }
    
    @Override
    public Bookings createPaymentRecord(Bookings newRecord){
        Bookings booking =  bookingsRepo.save(newRecord);
        Vehicles vehicle =  vehiclesRepo.findById(booking.getVehcileDetails()).orElse(null);
        List<String> previousBookingDetails = vehicle.getBooking_details();
        if(previousBookingDetails != null){
            vehicle.getBooking_details().add(booking.get_id());
        }
        else{
            List<String> currentBooking = new ArrayList<>();
            currentBooking.add(0, booking.get_id());
            vehicle.setBooking_details(currentBooking);
        }
        vehiclesRepo.save(vehicle);
        return booking;
    }

    @Override
    public void setRatingService(Bookings theBooking, Integer rating) {
        Optional<Vehicles> vehicle = vehiclesRepo.findById(theBooking.getVehcileDetails());
        if(!vehicle.isEmpty()){
            vehicle.get().getRatings();
            Double previousRating = vehicle.get().getRatings().get(0).getRating();
            int count = vehicle.get().getRatings().get(0).getCount()+1;
            if(previousRating != 0){
                Double currentRating = (previousRating+rating) / (double)count;
                vehicle.get().getRatings().get(0).setRating(currentRating);
                vehicle.get().getRatings().get(0).setCount(count);
            }
            else{
                vehicle.get().getRatings().get(0).setRating((double) rating);
                vehicle.get().getRatings().get(0).setCount(count);
            }

            vehicle.get().getRatings().get(0).getBookingId().add(theBooking.get_id());

            vehiclesRepo.save(vehicle.get());
        }
    }
}
