package com.example.vehiclerentalplatform.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;

public class PermissionUpdateTestIT {
    @Autowired
    protected TestRestTemplate testRestTemplate;

    private static final String endpoint = "/permissions";

//    @Test
//    public void UpdateRoleTest() {
//        var responseEntity = testRestTemplate.postForEntity(endpoint, )
//    }
}
