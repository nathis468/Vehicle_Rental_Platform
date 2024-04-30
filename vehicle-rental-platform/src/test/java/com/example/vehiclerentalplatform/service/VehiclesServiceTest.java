package com.example.vehiclerentalplatform.service;

import com.example.vehiclerentalplatform.dto.NearestVehicles;
import com.example.vehiclerentalplatform.model.Vehicles;
import com.example.vehiclerentalplatform.repository.VehiclesRepository;
import com.example.vehiclerentalplatform.service.implementation.VehiclesServiceImpl;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static com.example.vehiclerentalplatform.constant.VehiclesConstant.VEHICLESJSONENDPOINT;
import static com.example.vehiclerentalplatform.util.VehiclesDataUtil.getDatas;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class VehiclesServiceTest {

    private static Vehicles vehicle;
    private static List<Vehicles> vehicles;

    @Mock
    private VehiclesRepository vehiclesRepository;

    @InjectMocks
    private VehiclesServiceImpl vehiclesService;

    @BeforeAll
    public static void setUpVehicleDetails() throws IOException {
        vehicles = getDatas(VEHICLESJSONENDPOINT, Vehicles.class);
    }

    public static Stream<Vehicles> inputdata() {
        return vehicles.stream();
    }

    @ParameterizedTest
    @MethodSource("inputdata")
    public void getDatasByIdTest(Vehicles vehicle) {
        String vehicleId = "cd";
        when(vehiclesRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));
        NearestVehicles result = vehiclesService.getVehicleById(vehicleId);
        assertEquals(result.getVehicles(), vehicle);
        verify(vehiclesRepository,atMostOnce()).findById(vehicleId);
        reset(vehiclesRepository);
    }

//    @ParameterizedTest
//    @CsvFileSource(resources = "/data/VehiclesInsertData.csv")
//    public void getByIdCSVTest(@ConvertWith(VehiclesDataCSVUtil.class) List<Vehicles> vehicle) {
//        String vehicleId = "cd";
//        when(vehiclesRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));
//        NearestVehicles result = vehiclesService.getVehicleById(vehicleId);
//        assertEquals(result.getVehicles(), vehicle);
//        verify(vehiclesRepository,atMostOnce()).findById(vehicleId);
//    }
}
