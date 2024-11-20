package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardReviews;

public interface BulletinBoardReviewsRepository extends JpaRepository<BulletinBoardReviews, UUID> {
    BulletinBoardReviews findByBulletinBoardAndAccount(BulletinBoard bulletinBoard, Account account);

    Optional<BulletinBoardReviews> findByAccountAndBulletinBoard(Account account, BulletinBoard bulletinBoard);

    List<BulletinBoardReviews> findAllByAccount(Account account);

    Integer deleteBulletinBoardReviewsByBulletinBoardReviewsId(UUID BulletinBoardReviewsId);
}
