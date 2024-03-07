package com.example.vehiclerentalplatform.service.implementaion;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.model.Maintanance;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.repository.MaintananceRepository;
import com.example.vehiclerentalplatform.repository.VehiclesRepository;
import com.example.vehiclerentalplatform.service.MaintananceService;

@Service
public class MaintananceServiceImpl implements MaintananceService{

    @Autowired
    private MaintananceRepository maintananceRepo;

    @Autowired
    private VehiclesRepository vehiclesRepo;

    @Override
    public Page<Maintanance> getMaintananceDetails(int page, int pageSize, String type){

        PageRequest pageable = PageRequest.of(page-1, pageSize, Sort.by(Sort.Order.desc("serviceDate")));

        return maintananceRepo.findByMaintananceType(type, pageable);
    }

    @Override
    public void maintanance (Maintanance details, MultipartFile imageFile) {
        details.setImage(imageConvet(imageFile));
        Maintanance newRecord = maintananceRepo.save(details);  
        System.out.println(vehiclesRepo.findByCarModel(newRecord.getCarModelName()).getMaintanance());
        Vehicles vehicle = vehiclesRepo.findByCarModel(newRecord.getCarModelName());
        vehicle.getMaintanance().add(newRecord.get_id());
        vehiclesRepo.save(vehicle);
        System.out.println(vehicle);
    }      

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
    public void updateMaintanance(Maintanance details) {
        maintananceRepo.save(details);
    }
}
