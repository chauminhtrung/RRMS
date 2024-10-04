package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomImageResponse;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "roomImages")
    RoomDetailResponse toRoomDetailResponse(Room room);

    RoomImageResponse toRoomImageResponse(RoomImage roomImage);
}
