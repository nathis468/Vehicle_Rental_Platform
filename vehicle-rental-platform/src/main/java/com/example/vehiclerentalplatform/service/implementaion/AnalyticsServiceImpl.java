package com.example.vehiclerentalplatform.service.implementaion;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import com.example.vehiclerentalplatform.dto.MonthlyIncome;
import com.example.vehiclerentalplatform.dto.Ratings;
import com.example.vehiclerentalplatform.dto.TopRatings;
import com.example.vehiclerentalplatform.model.Bookings;
import com.example.vehiclerentalplatform.model.Maintanance;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.repository.BookingsRepository;
import com.example.vehiclerentalplatform.repository.MaintananceRepository;
import com.example.vehiclerentalplatform.repository.VehiclesRepository;
import com.example.vehiclerentalplatform.service.AnalyticsService;

@Service
public class AnalyticsServiceImpl implements AnalyticsService{
    @Autowired
    private VehiclesRepository vehiclesRepo;

    @Autowired
    private BookingsRepository bookingsRepo;

    @Autowired
    private MaintananceRepository maintananceRepo;

    @Override
    public List<MonthlyIncome> calculateMonthlyIncome(String carModelName) {
        Vehicles vehicle = vehiclesRepo.findByCarModel(carModelName);
    
        Map<Month, Double> monthlyIncomeMap = new HashMap<>();
    
        List<String> bookingDetails = vehicle.getBooking_details();
        if (bookingDetails != null) {
            for (String bookingId : bookingDetails) {
                Optional<Bookings> booking = bookingsRepo.findById(bookingId);
                if (!booking.isEmpty()) {
                    LocalDate fromDate = booking.get().getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    
                    if (fromDate.getYear() == Year.now().getValue()) {
                        Month month = fromDate.getMonth();
                        double price = Double.parseDouble(booking.get().getPrice());
    
                        monthlyIncomeMap.put(month, monthlyIncomeMap.getOrDefault(month, 0.0) + price);
                    }
                }
            }
        }
    
        List<String> maintananceDetails = vehicle.getMaintanance();
        if (maintananceDetails != null) {
            for (String maintananceId : maintananceDetails) {
                Optional<Maintanance> maintanance = maintananceRepo.findById(maintananceId);
                if (!maintanance.isEmpty()) {
                    LocalDate fromDate = maintanance.get().getServiceDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                    
                    if (fromDate.getYear() == Year.now().getValue()) {
                        Month month = fromDate.getMonth();
                        double price = maintanance.get().getPrice();
    
                        if (monthlyIncomeMap.containsKey(month)) {
                            monthlyIncomeMap.put(month, monthlyIncomeMap.get(month) - price);
                        } else {
                            monthlyIncomeMap.put(month, monthlyIncomeMap.getOrDefault(month, 0.0) - price);
                        }
                    }
                }
            }
        }
    
        for (Month month : Month.values()) {
            monthlyIncomeMap.putIfAbsent(month, 0.0);
        }
    
        return convertToMonthlyIncomeList(monthlyIncomeMap);
    }
    

    private List<MonthlyIncome> convertToMonthlyIncomeList(Map<Month, Double> monthlyIncomeMap) {
        Map<Month, Double> sortedMap = new TreeMap<>(monthlyIncomeMap);

        List<MonthlyIncome> monthlyIncomeList = new ArrayList<>();
        for (Map.Entry<Month, Double> entry : sortedMap.entrySet()) {
            MonthlyIncome monthlyIncome = new MonthlyIncome(entry.getKey().toString(), entry.getValue());
            monthlyIncomeList.add(monthlyIncome);
        }
        return monthlyIncomeList;
    }

    @Override
    public List<TopRatings> topRating(String val){
        List<TopRatings> al = new ArrayList<>();
        
        List<Vehicles> vehicles = new ArrayList<>(vehiclesRepo.findAll());

        for(int i=0;i<vehicles.size();i++){
            TopRatings rating = new TopRatings();
            rating.setRating(vehicles.get(i).getRatings().get(0).getRating());
            rating.setCarModelName(vehicles.get(i).getCarModel());
            al.add(rating);
        }


        List<TopRatings> topTenVehicles;
        if(val.equalsIgnoreCase("top")){
            // topTenVehicles = al.subList( Math.min(al.size()-10, 0),al.size());
            // topTenVehicles = al.subList( al.size()-1, Math.min(al.size()-11, 0));
            Collections.sort(al, Comparator.comparing(TopRatings::getRating, Comparator.reverseOrder()));
            topTenVehicles = al.subList(0, Math.min(al.size(), 10));
        }
        else{
            Collections.sort(al, Comparator.comparing(  TopRatings :: getRating));
            topTenVehicles = al.subList(0, Math.min(al.size(), 10));
        }

        return topTenVehicles;
    }

}
