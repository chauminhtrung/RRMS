package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomImageResponse;
import com.rrms.rrms.dto.response.RoomReviewResponse;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomImage;
import com.rrms.rrms.models.RoomReview;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    
    RoomDetailResponse toRoomDetailResponse(Room room);

    RoomImageResponse toRoomImageResponse(RoomImage roomImage);

    RoomReviewResponse toRoomReviewResponse(RoomReview roomReview);

}
