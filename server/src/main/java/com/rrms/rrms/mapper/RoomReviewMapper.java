package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.response.RoomReviewResponse;
import com.rrms.rrms.models.RoomReview;

@Mapper(componentModel = "spring")
public interface RoomReviewMapper {
    RoomReviewResponse toRoomReviewResponse(RoomReview roomReview);
}
