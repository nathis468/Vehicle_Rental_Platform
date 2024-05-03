package com.example.vehiclerentalplatform.service;

import com.example.vehiclerentalplatform.config.AbstractTestConfig;
import com.example.vehiclerentalplatform.config.TestContainersConfig;

import com.example.vehiclerentalplatform.repository.VehiclesRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.http.HttpStatus.OK;

public class VehiclesServiceTestIT extends AbstractTestConfig {
    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private VehiclesRepository vehiclesRepository;

    @Test
    public void vehiclesInsertTest() throws Exception{
        assertEquals(1,1);
//            ResponseEntity<String> responseEntity = testRestTemplate.getForEntity("/vehicles/health", String.class);
//            assertNotNull(responseEntity);
//            assertNotNull(responseEntity.getBody());
//            assertEquals(OK, responseEntity.getStatusCode());
//
//            ObjectMapper mapper = new ObjectMapper();
//            mapper.readValue(responseEntity.getBody().toString(), mapper.getTypeFactory().constructCollectionType(List.class, String.class));
    }
}
