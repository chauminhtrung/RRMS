package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.CarRequest;
import com.rrms.rrms.dto.response.CarResponse;
import com.rrms.rrms.models.Car;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.CarRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.ICarService;

@Service
public class CarService implements ICarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public CarResponse createCar(CarRequest carRequest) {
        Room room = roomRepository
                .findById(carRequest.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room không tồn tại"));

        Car car = new Car();
        car.setName(carRequest.getName());
        car.setNumber(carRequest.getNumber());
        car.setImage(carRequest.getImage());
        car.setRoom(room);

        Car savedCar = carRepository.save(car);

        return mapToResponse(savedCar);
    }

    @Override
    public CarResponse getCarById(UUID carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new IllegalArgumentException("Car không tồn tại"));

        return mapToResponse(car);
    }

    @Override
    public List<CarResponse> getAllCars() {
        return carRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public CarResponse updateCar(UUID carId, CarRequest carRequest) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new IllegalArgumentException("Car không tồn tại"));

        Room room = roomRepository
                .findById(carRequest.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Room không tồn tại"));

        car.setName(carRequest.getName());
        car.setNumber(carRequest.getNumber());
        car.setImage(carRequest.getImage());
        car.setRoom(room);

        Car updatedCar = carRepository.save(car);

        return mapToResponse(updatedCar);
    }

    @Override
    public void deleteCar(UUID carId) {
        if (!carRepository.existsById(carId)) {
            throw new IllegalArgumentException("Car không tồn tại");
        }

        carRepository.deleteById(carId);
    }

    @Override
    public List<CarResponse> getCarsByRoomId(UUID roomId) {
        List<Car> cars = carRepository.findByRoom_RoomId(roomId); // Sử dụng phương thức từ repository
        if (cars.isEmpty()) {
            throw new IllegalArgumentException("Không có xe nào trong phòng này");
        }
        return cars.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private CarResponse mapToResponse(Car car) {
        CarResponse response = new CarResponse();
        response.setCarId(car.getCarId());
        response.setName(car.getName());
        response.setNumber(car.getNumber());
        response.setImage(car.getImage());
        response.setRoomId(car.getRoom().getRoomId());
        return response;
    }
}
