package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.models.BulletinBoardReviews;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BulletinBoardReviewMapper {

    BulletinBoardReviewsResponse toBulletinBoardReviewsResponse(BulletinBoardReviews review);

    BulletinBoardReviews toBulletinBoardReviews(BulletinBoardReviewsRequest review);
}
