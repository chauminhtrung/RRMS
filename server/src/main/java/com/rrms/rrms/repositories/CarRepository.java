package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Car;

public interface CarRepository extends JpaRepository<Car, UUID> {
    List<Car> findByRoom_RoomId(UUID roomId);
}
