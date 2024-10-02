package com.rrms.rrms.repositories;

import java.util.UUID;

import com.rrms.rrms.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {}
