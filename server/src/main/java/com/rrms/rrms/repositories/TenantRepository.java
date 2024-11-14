package com.rrms.rrms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Tenant;

import java.util.UUID;

public interface TenantRepository extends JpaRepository<Tenant, UUID> {}
