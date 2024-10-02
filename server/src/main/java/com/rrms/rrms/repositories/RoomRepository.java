package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Room;

public interface RoomRepository extends JpaRepository<Room, UUID> {

    List<Room> findAllByNameRoom(String name);

    Optional<List<Room>> findAllByPriceBetween(Double startPrice, Double endPrice);
}
