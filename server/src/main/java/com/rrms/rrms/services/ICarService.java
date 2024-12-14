package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.CarRequest;
import com.rrms.rrms.dto.response.CarResponse;

public interface ICarService {
    CarResponse createCar(CarRequest carRequest);

    CarResponse getCarById(UUID carId);

    List<CarResponse> getAllCars();

    CarResponse updateCar(UUID carId, CarRequest carRequest);

    void deleteCar(UUID carId);

    List<CarResponse> getCarsByRoomId(UUID roomId);
}
