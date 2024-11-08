package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BulletinBoardRepository extends JpaRepository<BulletinBoard, UUID> {
    List<BulletinBoard> findByAccount(Account account);
}
