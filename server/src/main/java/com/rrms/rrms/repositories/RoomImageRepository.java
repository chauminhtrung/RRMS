package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.RoomImage;

public interface RoomImageRepository extends JpaRepository<RoomImage, UUID> {
    RoomImage findByRoomImageId(UUID roomId);
}
