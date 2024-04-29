package com.example.vehiclerentalplatform.dto;

import java.util.List;

import lombok.Data;

@Data
public class Student {
    private String name;
    private Integer age;
    private String gender;
    private String major;
    private Double gpa;
    private List courses;
}
