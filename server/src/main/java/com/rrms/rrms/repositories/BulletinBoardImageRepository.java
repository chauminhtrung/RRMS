package com.rrms.rrms.repositories;

import com.rrms.rrms.models.BulletinBoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BulletinBoardImageRepository extends JpaRepository<BulletinBoardImage, UUID> {
}