package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;

public interface MotelRepository extends JpaRepository<Motel, UUID> {

    // tong nha tro
    @Query("SELECT COUNT(m) FROM Motel m WHERE m.account = :username")
    Integer findTotalAreaByUsername(@Param("username") Account username);

    List<Motel> findAllByMotelName(String motelName);

    @Query("SELECT m FROM Motel m WHERE m.account.username  like %:username%")
    List<Motel> findMotelByAccount_Username(String username);
}
