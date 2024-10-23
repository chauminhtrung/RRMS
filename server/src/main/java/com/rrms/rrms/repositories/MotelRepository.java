package com.rrms.rrms.repositories;

import java.util.UUID;

import com.rrms.rrms.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Motel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MotelRepository extends JpaRepository<Motel, UUID> {
    @Query("SELECT COUNT(m) FROM Motel m WHERE m.account = :username")
    Integer findTotalAreaByUsername(@Param("username") Account username);
}
