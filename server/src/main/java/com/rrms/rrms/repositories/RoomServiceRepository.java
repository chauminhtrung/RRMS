package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.RoomService;

public interface RoomServiceRepository extends JpaRepository<RoomService, UUID> {
    List<RoomService> findByRoom_RoomId(UUID roomId); // Tìm RoomService theo Room ID
}
