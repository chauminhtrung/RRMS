package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.models.Room;

public interface RoomRepository extends JpaRepository<Room, UUID> {

    @Query("SELECT r FROM Room r WHERE r.nameRoom LIKE %:name%")
    List<Room> findAllByNameRoom(@Param("name") String name);
    //    List<Room> findAllByNameRoom( String name);

    Optional<List<Room>> findAllByPriceBetween(Double startPrice, Double endPrice);
}
