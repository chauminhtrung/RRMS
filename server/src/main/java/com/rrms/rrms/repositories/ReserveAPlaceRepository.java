package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.models.Reserve_a_place;

public interface ReserveAPlaceRepository extends JpaRepository<Reserve_a_place, UUID> {
    List<Reserve_a_place> findByRoom_RoomId(UUID roomId); // Tìm theo roomId

    @Modifying
    @Transactional
    @Query("DELETE FROM Reserve_a_place r WHERE HEX(r.ReserveaplaceId) = :hexId")
    void deleteByIdInHex(@Param("hexId") String hexId);

    // tính tổng tiền giữ chân
    @Query("SELECT SUM(rp.deposit) FROM Reserve_a_place rp JOIN rp.room r WHERE r.motel.motelId = :motelId")
    Double findTotalReserveDepositByMotelId(@Param("motelId") UUID motelId);
}
