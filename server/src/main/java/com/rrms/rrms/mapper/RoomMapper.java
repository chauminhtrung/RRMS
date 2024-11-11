package com.rrms.rrms.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.rrms.rrms.dto.request.RoomImageRequest;
import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.*;
import com.rrms.rrms.models.*;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomMapper INSTANCE = Mappers.getMapper(RoomMapper.class);

    RoomDetailResponse toRoomDetailResponse(Room room);

    Room toRoom(RoomRequest roomRequest);

    RoomImageResponse toRoomImageResponse(RoomImage roomImage);

    RoomReviewResponse toRoomReviewResponse(RoomReview roomReview);

    RoomImageResponse toRoomImageResponse(RoomImageRequest roomImageRequest);

    RoomImage toRoomImage(RoomImageRequest roomImageRequest);



    default List<RoomImage> mapRoomImages(List<String> roomImages) {
        return roomImages.stream()
                .map(imageUrl -> {
                    RoomImage roomImage = new RoomImage();
                    roomImage.setImage(imageUrl);
                    return roomImage;
                })
                .toList();
    }

    PostRoomTableResponse toPostRoomTableResponse(Room room);

    RoomSearchResponse toRoomSearchResponse(Room room);
}
