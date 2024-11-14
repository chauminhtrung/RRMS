package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.RatingHistoryResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.BulletinBoardReviewMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.BulletinBoardReviews;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.BulletinBoardRepository;
import com.rrms.rrms.repositories.BulletinBoardReviewsRepository;
import com.rrms.rrms.services.IBulletinBoardReviews;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BulletinBoardReviewsService implements IBulletinBoardReviews {

    BulletinBoardReviewsRepository bulletinBoardReviewsRepository;
    BulletinBoardReviewMapper bulletinBoardReviewMapper;
    AccountRepository accountRepository;
    BulletinBoardRepository bulletinBoardRepository;

    @Override
    public BulletinBoardReviewsResponse createOrUpdateBulletinBoardReviews(BulletinBoardReviewsRequest request) {

        Account account = accountRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        BulletinBoard bulletinBoard = bulletinBoardRepository
                .findById(request.getBulletinBoardId())
                .orElseThrow(() -> new AppException(ErrorCode.BULLETIN_BOARD_NOT_FOUND));

        // Kiểm tra xem đánh giá đã tồn tại hay chưa
        Optional<BulletinBoardReviews> existingReview =
                bulletinBoardReviewsRepository.findByAccountAndBulletinBoard(account, bulletinBoard);

        BulletinBoardReviews bulletinBoardReviews;

        if (existingReview.isPresent()) {
            // Nếu đã có đánh giá, cập nhật đánh giá hiện tại
            bulletinBoardReviews = existingReview.get();
            bulletinBoardReviews.setRating(request.getRating());
            bulletinBoardReviews.setContent(request.getContent());
        } else {
            // Nếu chưa có đánh giá, tạo mới
            bulletinBoardReviews = bulletinBoardReviewMapper.toBulletinBoardReviews(request);
            bulletinBoardReviews.setAccount(account);
            bulletinBoardReviews.setBulletinBoard(bulletinBoard);
        }

        bulletinBoardReviews = bulletinBoardReviewsRepository.save(bulletinBoardReviews);
        return bulletinBoardReviewMapper.toBulletinBoardReviewsResponse(bulletinBoardReviews);
    }

    @Override
    public BulletinBoardReviewsResponse getBulletinBoardReviewsByBulletinBoardIdAndUsername(
            UUID bulletinBoardId, String username) {

        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        BulletinBoard bulletinBoard = bulletinBoardRepository
                .findById(bulletinBoardId)
                .orElseThrow(() -> new AppException(ErrorCode.BULLETIN_BOARD_NOT_FOUND));

        BulletinBoardReviews bulletinBoardReviews =
                bulletinBoardReviewsRepository.findByBulletinBoardAndAccount(bulletinBoard, account);

        return bulletinBoardReviewMapper.toBulletinBoardReviewsResponse(bulletinBoardReviews);
    }

    @Override
    public List<RatingHistoryResponse> getRatingHistoryByBulletinBoardIdAndUsername(String username) {
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        List<BulletinBoardReviews> bulletinBoardReviews = bulletinBoardReviewsRepository.findAllByAccount(account);
        return bulletinBoardReviews.stream()
                .map(bulletinBoardReviewMapper::toRatingHistoryResponse)
                .toList();
    }
}
