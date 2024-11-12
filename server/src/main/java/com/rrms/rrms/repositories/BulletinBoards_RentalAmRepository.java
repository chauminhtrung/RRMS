package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoards_RentalAm;

public interface BulletinBoards_RentalAmRepository extends JpaRepository<BulletinBoards_RentalAm, UUID> {
    void deleteAllByBulletinBoard(BulletinBoard bulletinBoard);
}
