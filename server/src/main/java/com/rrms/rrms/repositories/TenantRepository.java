package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, String> {
}
