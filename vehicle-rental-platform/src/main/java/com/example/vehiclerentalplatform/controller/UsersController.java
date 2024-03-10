package com.example.vehiclerentalplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiclerentalplatform.model.Users;
import com.example.vehiclerentalplatform.service.UsersService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/users")
@CrossOrigin()
public class UsersController {
    @Autowired
    private UsersService usersService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<Page<Users>> getAllUsers(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize, @RequestParam("searchedValue") String searchedValue, @RequestParam("active") String active, @RequestParam("direction") String direction) {
        return new ResponseEntity<>(usersService.getAllUsers(page, pageSize, searchedValue, active, direction),HttpStatus.OK);
    }

    @GetMapping("profile/{email}")
    public ResponseEntity<Users> getUserProfileController(@PathVariable String email) {        
        return new ResponseEntity<>(usersService.getUserProfile(email),HttpStatus.OK);
    }
}
