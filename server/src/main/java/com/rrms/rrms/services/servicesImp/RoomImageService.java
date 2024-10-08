package com.rrms.rrms.services.servicesImp;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.RoomImageRequest;
import com.rrms.rrms.dto.response.RoomImageResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomImage;
import com.rrms.rrms.repositories.RoomImageRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.IRoomImage;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomImageService implements IRoomImage {
    RoomImageRepository roomImageRepository;
    RoomRepository roomRepository;
    RoomMapper roomMapper;

    @Override
    public RoomImageResponse postRoomImage(RoomImageRequest roomImageRequest) {

        Room room = roomRepository
                .findById(roomImageRequest.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_DETAIL_NOT_FOUND));

        RoomImage roomImage = roomMapper.toRoomImage(roomImageRequest);
        roomImage.setRoom(room);

        roomImage = roomImageRepository.save(roomImage);

        return roomMapper.toRoomImageResponse(roomImage);
    }
}
