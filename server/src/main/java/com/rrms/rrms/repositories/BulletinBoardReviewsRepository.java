package com.rrms.rrms.repositories;

import com.rrms.rrms.models.BulletinBoardReviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BulletinBoardReviewsRepository extends JpaRepository<BulletinBoardReviews, UUID> {
}