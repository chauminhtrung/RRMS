package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.models.Motel;

public interface MotelRepository extends JpaRepository<Motel, UUID> {

    // tong nha tro
    @Query("SELECT m FROM Motel m WHERE m.motelId = :motelId AND m.account.username = :username")
    Optional<Motel> findByMotelNameAndUsername(@Param("motelId") UUID motelId, @Param("username") String username);

    List<Motel> findAllByMotelName(String motelName);

    @Query("SELECT m FROM Motel m WHERE m.account.username  like %:username%")
    List<Motel> findMotelByAccount_Username(String username);

    @Query(value = "CALL GetTotalPaidInvoicesByMotelId(:motelId)", nativeQuery = true)
    List<Object[]> getTotalPaidInvoicesByMotelId(@Param("motelId") UUID motelId);

    @Query(value = "CALL GetTotalPaidRoomPriceByMotelId(:motelId)", nativeQuery = true)
    List<Object[]> getTotalPaidRoomPriceByMotelId(@Param("motelId") UUID motelId);
}
