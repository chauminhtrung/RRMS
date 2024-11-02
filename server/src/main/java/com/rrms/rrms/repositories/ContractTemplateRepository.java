package com.rrms.rrms.repositories;


import com.rrms.rrms.models.ContractTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ContractTemplateRepository extends JpaRepository<ContractTemplate, UUID> {

    List<ContractTemplate> findContractTemplateByMotel_MotelId(UUID motelId);
}
