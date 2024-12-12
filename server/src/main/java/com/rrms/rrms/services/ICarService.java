package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.CarRequest;
import com.rrms.rrms.dto.response.CarResponse;

import java.util.List;
import java.util.UUID;

public interface ICarService {
    CarResponse createCar(CarRequest carRequest);

    CarResponse getCarById(UUID carId);

    List<CarResponse> getAllCars();

    CarResponse updateCar(UUID carId, CarRequest carRequest);

    void deleteCar(UUID carId);

    List<CarResponse> getCarsByRoomId(UUID roomId);
}
