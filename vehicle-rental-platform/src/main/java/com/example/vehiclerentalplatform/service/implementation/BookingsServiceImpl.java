package com.example.vehiclerentalplatform.service.implementation;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.TimeZone;

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
import com.example.vehiclerentalplatform.service.EmailService;

@Service
public class BookingsServiceImpl implements BookingsService{
    @Autowired
    private UserEntityRepository userEntityRepo;

    @Autowired
    private BookingsRepository bookingsRepo;

    @Autowired
    private VehiclesRepository vehiclesRepo;

    @Autowired EmailService emailService;


    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public String generateRandomString() {
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder(10);

        for (int i = 0; i < 20; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }

        return stringBuilder.toString();
    }
    

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
    public void createPaymentRecord(Bookings newRecord){
        String bookingId = generateRandomString();
        newRecord.setBookingId(bookingId);

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        calendar.setTime(newRecord.getToDate());
        calendar.set(Calendar.HOUR_OF_DAY, 17);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        newRecord.setToDate(calendar.getTime());

        Bookings booking =  bookingsRepo.save(newRecord);
        Vehicles vehicle =  vehiclesRepo.findById(booking.getVehcileDetails()).orElse(null);
        List<String> previousBookingDetails = vehicle.getBooking_details();
        if(previousBookingDetails != null){
            vehicle.getBooking_details().add(booking.getBookingId());
        }
        else{
            List<String> currentBooking = new ArrayList<>();
            currentBooking.add(0, booking.getBookingId());
            vehicle.setBooking_details(currentBooking);
        }
        vehiclesRepo.save(vehicle);
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

            vehicle.get().getRatings().get(0).getBookingId().add(theBooking.getBookingId());

            vehiclesRepo.save(vehicle.get());
        }
        bookingsRepo.save(theBooking);
    }

    @Override
    public void cancelBookingService(Bookings theBookings){
        Bookings booking = bookingsRepo.findByBookingId(theBookings.getBookingId());
        booking.setStatus("cancelled");
        bookingsRepo.save(booking);
    }

}
