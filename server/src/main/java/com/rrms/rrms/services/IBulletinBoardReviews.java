package com.rrms.rrms.services;

import java.util.UUID;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;

public interface IBulletinBoardReviews {
    BulletinBoardReviewsResponse createOrUpdateBulletinBoardReviews(BulletinBoardReviewsRequest request);

    BulletinBoardReviewsResponse getBulletinBoardReviewsByBulletinBoardIdAndUsername(
            UUID bulletinBoardId, String username);
}
