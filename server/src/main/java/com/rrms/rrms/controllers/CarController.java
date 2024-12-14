package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.CarRequest;
import com.rrms.rrms.dto.response.CarResponse;
import com.rrms.rrms.services.ICarService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Car Controller", description = "Car for Contract")
@RestController
@Slf4j
@RequestMapping("/cars")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class CarController {
    @Autowired
    private ICarService carService;

    @PostMapping
    public ResponseEntity<CarResponse> createCar(@RequestBody CarRequest carRequest) {
        CarResponse carResponse = carService.createCar(carRequest);
        return ResponseEntity.ok(carResponse);
    }

    @GetMapping("/{carId}")
    public ResponseEntity<CarResponse> getCarById(@PathVariable UUID carId) {
        CarResponse carResponse = carService.getCarById(carId);
        return ResponseEntity.ok(carResponse);
    }

    @GetMapping
    public ResponseEntity<List<CarResponse>> getAllCars() {
        List<CarResponse> carResponses = carService.getAllCars();
        return ResponseEntity.ok(carResponses);
    }

    @PutMapping("/{carId}")
    public ResponseEntity<CarResponse> updateCar(@PathVariable UUID carId, @RequestBody CarRequest carRequest) {
        CarResponse carResponse = carService.updateCar(carId, carRequest);
        return ResponseEntity.ok(carResponse);
    }

    @DeleteMapping("/{carId}")
    public ResponseEntity<Void> deleteCar(@PathVariable UUID carId) {
        carService.deleteCar(carId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<CarResponse>> getCarsByRoomId(@PathVariable UUID roomId) {
        List<CarResponse> carResponses = carService.getCarsByRoomId(roomId);
        return ResponseEntity.ok(carResponses);
    }
}
