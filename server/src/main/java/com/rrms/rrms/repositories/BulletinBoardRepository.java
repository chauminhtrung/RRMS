package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;

import io.lettuce.core.dynamic.annotation.Param;

public interface BulletinBoardRepository extends JpaRepository<BulletinBoard, UUID> {
    List<BulletinBoard> findByAccount(Account account);

    @Query("SELECT r FROM BulletinBoard r JOIN r.account m WHERE r.address like %:address%")
    List<BulletinBoard> findByAddress(String address);

    //    List<BulletinBoard> findAllByIsActive(Boolean isActive);

    BulletinBoard findByBulletinBoardId(UUID id);

    @Query("SELECT r FROM BulletinBoard r WHERE r.isActive = :isActive")
    List<BulletinBoard> findAllByIsActive(@Param("isActive") Boolean isActive);

    @Query("SELECT b FROM BulletinBoard b WHERE b.isActive = true ORDER BY b.rentPrice ASC")
    List<BulletinBoard> findAllActiveOrderByPriceAsc();
}
