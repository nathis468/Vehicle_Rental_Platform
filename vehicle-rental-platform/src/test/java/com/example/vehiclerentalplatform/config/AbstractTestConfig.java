package com.example.vehiclerentalplatform.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

//@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = {TestContainersConfig.class})
@Import(TestContainersConfig.class)
public abstract class AbstractTestConfig {

    private static ObjectMapper objectMapper;

    private static HttpHeaders httpHeaders;

    public static ObjectMapper getObjectMapper() {
        return Objects.nonNull(objectMapper) ? objectMapper : getNewObjectMapper();
    }

    private static ObjectMapper getNewObjectMapper() {
        objectMapper = new ObjectMapper();
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
        return objectMapper;
    }

    private static HttpHeaders convertJsonFileToHttpHeaders(File jsonFile) throws IOException {
        httpHeaders = new HttpHeaders();
        Map<String, String> jsonMap = getObjectMapper().readValue(jsonFile, new TypeReference<HashMap<String, String>>() {
        });
        jsonMap.forEach((key, value) -> httpHeaders.add(key, value));
        return httpHeaders;
    }
}