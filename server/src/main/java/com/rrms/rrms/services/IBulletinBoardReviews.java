package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;

import java.util.UUID;

public interface IBulletinBoardReviews {
    BulletinBoardReviewsResponse createOrUpdateBulletinBoardReviews(BulletinBoardReviewsRequest request);

    BulletinBoardReviewsResponse getBulletinBoardReviewsByBulletinBoardIdAndUsername(UUID bulletinBoardId, String username);
}
