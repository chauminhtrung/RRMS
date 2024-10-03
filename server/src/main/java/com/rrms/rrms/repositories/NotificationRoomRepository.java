package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.NotificationRoom;

public interface NotificationRoomRepository extends JpaRepository<NotificationRoom, UUID> {}
