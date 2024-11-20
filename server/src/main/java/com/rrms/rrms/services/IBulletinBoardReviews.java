package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.RatingHistoryResponse;

import java.util.List;
import java.util.UUID;

public interface IBulletinBoardReviews {
    BulletinBoardReviewsResponse createOrUpdateBulletinBoardReviews(BulletinBoardReviewsRequest request);

    BulletinBoardReviewsResponse getBulletinBoardReviewsByBulletinBoardIdAndUsername(
            UUID bulletinBoardId, String username);

    List<RatingHistoryResponse> getRatingHistoryByBulletinBoardIdAndUsername(String username);

    Integer deleteBulletinBoardReviewsByBulletinBoardReviewsId(UUID bulletinBoardReviewsId);
}
