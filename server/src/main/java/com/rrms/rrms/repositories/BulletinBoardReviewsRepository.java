package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.BulletinBoardReviews;

public interface BulletinBoardReviewsRepository extends JpaRepository<BulletinBoardReviews, UUID> {}
