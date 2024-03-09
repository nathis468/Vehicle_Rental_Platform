package com.example.vehiclerentalplatform.service.implementaion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.vehiclerentalplatform.model.Users;
import com.example.vehiclerentalplatform.repository.UsersRepository;
import com.example.vehiclerentalplatform.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService{
    @Autowired
    private UsersRepository usersRepo;

    @Override
    public Page<Users> getAllUsers(int page, int pageSize, String searchedValue, String active, String direction) {
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
        
        return usersRepo.findByEmailAndUserName (searchedValue, pageable);

    }

    @Override
    public Users getUserProfile(String email) {
        return usersRepo.findByEmail(email);
    }

}
