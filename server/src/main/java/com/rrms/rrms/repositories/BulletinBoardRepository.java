package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;

public interface BulletinBoardRepository extends JpaRepository<BulletinBoard, UUID> {
    List<BulletinBoard> findByAccount(Account account);

    @Query("SELECT r FROM BulletinBoard r JOIN r.account m WHERE r.address like %:address%")
    List<BulletinBoard> findByAddress(String address);

    List<BulletinBoard> findAllByIsActive(Boolean isActive);

}
