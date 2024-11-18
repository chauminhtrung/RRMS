package com.rrms.rrms.repositories;


import com.rrms.rrms.models.ContractDevice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractDeviceRepository extends JpaRepository<ContractDevice, UUID> {
}
