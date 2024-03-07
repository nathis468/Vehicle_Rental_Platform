package com.example.vehiclerentalplatform.dto;

import org.springframework.data.annotation.Id;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Payments {
    @Id
    private String _id;
    private String orderId;
    private String currency;
    private Integer amount;
    private String key;
}
