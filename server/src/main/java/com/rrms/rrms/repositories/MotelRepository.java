package com.rrms.rrms.repositories;

import java.util.UUID;

import com.rrms.rrms.dto.request.AccountRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MotelRepository extends JpaRepository<Motel, UUID> {
    List<Motel> findAllByMotelName(String motelName);

    @Query("SELECT m FROM Motel m WHERE m.account.username  like %:username%")
    List<Motel> findMotelByAccount_Username(String username);
}
