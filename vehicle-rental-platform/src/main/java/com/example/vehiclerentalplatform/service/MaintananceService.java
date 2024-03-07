package com.example.vehiclerentalplatform.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.model.Maintanance;

public interface MaintananceService {
    Page<Maintanance> getMaintananceDetails(int page, int pageSize, String type);
    void maintanance (Maintanance details, MultipartFile imageFile);
    void updateMaintanance(Maintanance details);
}
