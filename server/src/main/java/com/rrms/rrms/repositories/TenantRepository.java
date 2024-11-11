package com.rrms.rrms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, String> {}
