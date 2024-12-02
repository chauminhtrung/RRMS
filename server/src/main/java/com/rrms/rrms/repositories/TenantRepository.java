package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Tenant;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TenantRepository extends JpaRepository<Tenant, UUID> {
    List<Tenant> findByRoomRoomId(UUID roomId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Tenant t WHERE t.room.roomId = :roomId")
    void deleteByRoomId(@Param("roomId") UUID roomId);

}
