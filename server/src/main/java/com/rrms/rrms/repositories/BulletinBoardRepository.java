package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BulletinBoardRepository extends JpaRepository<BulletinBoard, UUID> {
    List<BulletinBoard> findByAccount(Account account);
    @Query("SELECT r FROM BulletinBoard r JOIN r.account m WHERE r.address like %:address%")
    List<BulletinBoard> findByAddress(String address);

    List<BulletinBoard> findAllByIsActive(Boolean isActive);
}
