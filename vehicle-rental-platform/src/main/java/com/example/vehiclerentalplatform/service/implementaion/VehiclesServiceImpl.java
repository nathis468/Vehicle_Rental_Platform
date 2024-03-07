package com.example.vehiclerentalplatform.service.implementaion;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.dao.VehiclesDAO;
import com.example.vehiclerentalplatform.dto.Filters;
import com.example.vehiclerentalplatform.dto.NearestVehicles;
import com.example.vehiclerentalplatform.dto.Ratings;
import com.example.vehiclerentalplatform.model.Bookings;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.repository.BookingsRepository;
import com.example.vehiclerentalplatform.repository.VehiclesRepository;
import com.example.vehiclerentalplatform.service.VehiclesService;

@Service
public class VehiclesServiceImpl implements VehiclesService{

    private static final double EARTH_RADIUS_KM = 6371;

    @Autowired
    private VehiclesRepository vehiclesRepo;

    @Autowired
    private VehiclesDAO vehiclesDTO;

    @Autowired
    private BookingsRepository bookingsRepo;


    @Override
    public NearestVehicles getVehicleById(String vehicleId){
        Vehicles vehicle = vehiclesRepo.findById(vehicleId).orElse(null);
        NearestVehicles result = new NearestVehicles();
        result.setVehicles(vehicle);
        return result;
    }

    @Override
    public List<NearestVehicles> getFilteredVehicleService(Filters newFilter) {
        List<Bookings> list1;
        try {
            list1 = new ArrayList<>(vehiclesDTO.filteredData1(newFilter.getStartDate(),newFilter.getEndDate()));
            return availableVehicle(newFilter,list1);
        } 
        catch (ParseException e) {
            e.printStackTrace();
        }
        return new ArrayList<NearestVehicles>();
    }

    public List<NearestVehicles> availableVehicle(Filters newFilter,List<Bookings> previouslyBooked){
        List<String> list1 = new ArrayList<>();
        for(int i=0;i<previouslyBooked.size();i++){
            list1.add(previouslyBooked.get(i).getVehcileDetails());
        }
        List<Vehicles> list2 = vehiclesRepo.findAll();
        List<Vehicles> filteredList2 = list2.stream().filter(vehicle -> !list1.contains(vehicle.get_id())).collect(Collectors.toList());
        if(newFilter.getLatitude().equals("default") || newFilter.getLongitude().equals("default")){
            List<NearestVehicles> result = new ArrayList<>();
            for(int i=0;i<filteredList2.size();i++){
                NearestVehicles result1 = new NearestVehicles();
                result1.setVehicles(filteredList2.get(i));
                result.add(result1);
            }
            return result;
        }
        return haversine(newFilter,filteredList2);
    }

    @Override
    public List<NearestVehicles> haversine(Filters newFilter,List<Vehicles> filteredVehicles) {
        double lat1 = Math.toRadians(Double.parseDouble(newFilter.getLatitude()));
        double lon1 = Double.parseDouble(newFilter.getLongitude());
        List<NearestVehicles> newList = new ArrayList<>();
        for(int i=0;i<filteredVehicles.size();i++){
            double lat2 = Math.toRadians(filteredVehicles.get(i).getLatitude());
            double lon2 = filteredVehicles.get(i).getLongitude();
            double dLat = lat2 - lat1;
            double dLon = Math.toRadians(lon2 - lon1);
            double a = Math.sin(dLat / 2.0) * Math.sin(dLat / 2.0) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2.0) * Math.sin(dLon / 2.0); 
            double c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
            double distance = EARTH_RADIUS_KM * c;
            NearestVehicles result1 = new NearestVehicles();
            result1.setDistance(distance);
            result1.setVehicles(filteredVehicles.get(i));
            newList.add(result1);
        } 
        Collections.sort(newList, Comparator.comparing(NearestVehicles::getDistance));

        return newList;
    }

    @Override
    public Vehicles insertNewVehicleService(Vehicles newVehicle) {
        Ratings initialRating = new Ratings();
        newVehicle.setRatings(new ArrayList<>(Collections.singletonList(initialRating)));
        System.out.println(newVehicle);
        return vehiclesRepo.save(newVehicle);
    }

    @Override
    public Vehicles updateVehicleService(Vehicles updateVehicle) {
        return vehiclesRepo.save(updateVehicle);
    }

    @Override
    public String imageConvet(MultipartFile file) {
        String url = "";
        String contentType = file.getContentType();

        if (contentType != null && contentType.startsWith("image")) {
            url = "http://localhost:8080/static/images/" + file.getOriginalFilename();
            try {
                file.transferTo(new File("C:/Trustrace/Vehicle Rental Platform/vehicle-rental-platform/src/main/resources/static/images/" + file.getOriginalFilename()));
            } 
            catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        } 
        else {
            throw new RuntimeException("Invalid file type");
        }
        return url;
    }

    @Override
    public void deleteVehicleService(Vehicles deleteVehicle) {
        vehiclesRepo.deleteById(deleteVehicle.get_id());
    }


    public List<String> getCarsName(){
        List<String> vehicleModels = vehiclesRepo.findAll().stream().map(Vehicles::getCarModel).sorted().collect(Collectors.toList());
        return vehicleModels;
    }

}