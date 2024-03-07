package com.example.vehiclerentalplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vehiclerentalplatform.model.Maintanance;
import com.example.vehiclerentalplatform.service.MaintananceService;

@RestController
@RequestMapping("/maintanance")
@CrossOrigin()
public class MaintananceController {

    @Autowired
    private MaintananceService maintananceService;

    @GetMapping("")
    public ResponseEntity<Page<Maintanance>> getDetails(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize , @RequestParam("type") String type) {
        Page<Maintanance> maintanance = maintananceService.getMaintananceDetails(page, pageSize, type);
        System.out.println(maintanance);
        return new ResponseEntity<>(maintanance,HttpStatus.OK);
    }
    

    @PostMapping("")
    public ResponseEntity<Void> sendMaintanance(@ModelAttribute Maintanance details, @RequestParam("file") MultipartFile imageFile){
        maintananceService.maintanance(details,imageFile);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<Void> updateMatinance(@RequestBody Maintanance details){
        maintananceService.updateMaintanance(details);
        return new ResponseEntity<>(HttpStatus.OK);
    }    
}
