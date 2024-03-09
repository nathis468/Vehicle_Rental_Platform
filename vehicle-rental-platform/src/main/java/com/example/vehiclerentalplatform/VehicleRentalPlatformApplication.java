package com.example.vehiclerentalplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VehicleRentalPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleRentalPlatformApplication.class, args);
	}	

}
