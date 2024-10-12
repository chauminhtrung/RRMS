package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;

import java.util.List;


public interface MotelRepository extends JpaRepository<Motel, UUID> {
    List<Motel> findAllByMotelName(String motelName);

    Motel findMotelByAccount(Account account);
}
