package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardReviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BulletinBoardReviewsRepository extends JpaRepository<BulletinBoardReviews, UUID> {
    BulletinBoardReviews findByBulletinBoardAndAccount(BulletinBoard bulletinBoard, Account account);

    Optional<BulletinBoardReviews> findByAccountAndBulletinBoard(Account account, BulletinBoard bulletinBoard);
}
