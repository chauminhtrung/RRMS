package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardImage;

public interface BulletinBoardImageRepository extends JpaRepository<BulletinBoardImage, UUID> {
    void deleteAllByBulletinBoard(BulletinBoard bulletinBoard);
}
