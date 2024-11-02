package com.rrms.rrms.repositories;

import com.rrms.rrms.models.TemporaryR_contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TemporaryR_contractRepository extends JpaRepository<TemporaryR_contract, UUID> {


    @Query("SELECT T FROM TemporaryR_contract T WHERE T.tenant.username  like %:username%")
    List<TemporaryR_contract> findByTenant_Username(String username);
}