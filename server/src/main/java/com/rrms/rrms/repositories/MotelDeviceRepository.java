package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.MotelDevice;

public interface MotelDeviceRepository extends JpaRepository<MotelDevice, UUID> {
    List<MotelDevice> findAllByMotel(Motel motel);
}
