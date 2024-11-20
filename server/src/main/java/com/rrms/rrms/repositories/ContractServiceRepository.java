package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.ContractService;

public interface ContractServiceRepository extends JpaRepository<ContractService, UUID> {}
