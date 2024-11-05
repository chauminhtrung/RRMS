package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.MotelService;
import org.springframework.data.jpa.repository.Query;

public interface MotelServiceRepository extends JpaRepository<MotelService, UUID> {
    Optional<MotelService> findFirstByMotel_MotelId(UUID motelId);
}
