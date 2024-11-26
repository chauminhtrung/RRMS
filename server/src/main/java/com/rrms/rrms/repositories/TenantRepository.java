package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, UUID> {
    List<Tenant> findByRoomId(UUID roomId); // Lọc dựa trên roomId
}
