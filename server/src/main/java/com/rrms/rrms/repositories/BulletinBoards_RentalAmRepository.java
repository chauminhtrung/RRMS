package com.rrms.rrms.repositories;

import com.rrms.rrms.models.BulletinBoards_RentalAm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BulletinBoards_RentalAmRepository extends JpaRepository<BulletinBoards_RentalAm, UUID> {
}