package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MotelRepository extends JpaRepository<Motel, UUID> {
    List<Motel> findAllByMotelName(String motelName);

    Motel findMotelByAccount(Account account);
}
