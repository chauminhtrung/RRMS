package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.ContractDevice;

public interface ContractDeviceRepository extends JpaRepository<ContractDevice, UUID> {}
