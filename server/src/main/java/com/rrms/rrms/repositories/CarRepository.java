package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CarRepository extends JpaRepository<Car, UUID> {
    List<Car> findByRoom_RoomId(UUID roomId);
}
