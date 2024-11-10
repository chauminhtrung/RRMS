package com.rrms.rrms.repositories;

import com.rrms.rrms.models.MotelDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MotelDeviceRepository extends JpaRepository<MotelDevice, UUID> {
}