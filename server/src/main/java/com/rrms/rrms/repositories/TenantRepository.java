package com.rrms.rrms.repositories;

import com.rrms.rrms.models.BulletinBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Tenant;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TenantRepository extends JpaRepository<Tenant, UUID> {

}
