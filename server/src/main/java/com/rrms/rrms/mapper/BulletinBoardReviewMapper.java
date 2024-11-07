package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.models.BulletinBoardReviews;

@Mapper(componentModel = "spring")
public interface BulletinBoardReviewMapper {

    BulletinBoardReviewsResponse toBulletinBoardReviewsResponse(BulletinBoardReviews review);
}
