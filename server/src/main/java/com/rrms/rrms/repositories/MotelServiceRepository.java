package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.MotelService;

public interface MotelServiceRepository extends JpaRepository<MotelService, UUID> {}
