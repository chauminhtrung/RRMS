package com.rrms.rrms.repositories;

import com.rrms.rrms.models.ContractService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContractServiceRepository  extends JpaRepository<ContractService, UUID> {
}
