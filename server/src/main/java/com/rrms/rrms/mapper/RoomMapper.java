package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.RoomImageRequest;
import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomImageResponse;
import com.rrms.rrms.dto.response.RoomReviewResponse;
import com.rrms.rrms.models.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    RoomMapper INSTANCE = Mappers.getMapper(RoomMapper.class);

    RoomDetailResponse toRoomDetailResponse(Room room);

    Room toRoom(RoomRequest roomRequest);

    RoomImageResponse toRoomImageResponse(RoomImage roomImage);

    RoomReviewResponse toRoomReviewResponse(RoomReview roomReview);

    RoomImageResponse toRoomImageResponse(RoomImageRequest roomImageRequest);

    RoomImage toRoomImage(RoomImageRequest roomImageRequest);

    default List<RoomService> mapRoomServices(List<String> roomServices) {
        return roomServices.stream()
                .map(serviceName -> {
                    RoomService roomService = new RoomService();
                    roomService.setService(
                            Service.builder().nameService(serviceName).build());
                    return roomService;
                })
                .toList();
    }

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
}
