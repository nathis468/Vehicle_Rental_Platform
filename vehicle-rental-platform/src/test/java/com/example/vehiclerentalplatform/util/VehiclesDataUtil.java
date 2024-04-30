package com.example.vehiclerentalplatform.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class VehiclesDataUtil {
//    public static <T> T getData(String pathFile, Class<T> pojo) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
//        return mapper.readValue(new File(pathFile), pojo);
//    }

    public static <T> List<T> getDatas(String pathFile, Class<T> pojo) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(new File(pathFile), mapper.getTypeFactory().constructCollectionType(List.class, pojo));
    }
}
