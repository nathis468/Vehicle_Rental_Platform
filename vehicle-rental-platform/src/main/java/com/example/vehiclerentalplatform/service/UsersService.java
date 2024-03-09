package com.example.vehiclerentalplatform.service;

import org.springframework.data.domain.Page;

import com.example.vehiclerentalplatform.model.Users;

public interface UsersService {
    Page<Users> getAllUsers(int page, int pageSize, String searchedValue, String active, String direction);
    Users getUserProfile(String email);
}
