package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.RatingHistoryResponse;
import com.rrms.rrms.models.BulletinBoardReviews;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BulletinBoardReviewMapper {

    BulletinBoardReviewsResponse toBulletinBoardReviewsResponse(BulletinBoardReviews review);

    BulletinBoardReviews toBulletinBoardReviews(BulletinBoardReviewsRequest review);

    @Mapping(target = "bulletinBoardImages", source = "bulletinBoard.bulletinBoardImages")
    @Mapping(target = "bulletinBoard.account", ignore = true)
    RatingHistoryResponse toRatingHistoryResponse(BulletinBoardReviews review);
}
