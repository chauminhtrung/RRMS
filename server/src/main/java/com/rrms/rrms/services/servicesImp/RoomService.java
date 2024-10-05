package com.rrms.rrms.services.servicesImp;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.IRoomService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomService implements IRoomService {

    RoomRepository roomRepository;
    RoomMapper roomMapper;

    @Override
    public RoomDetailResponse getRoomById(UUID id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_DETAIL_NOT_FOUND));
        return roomMapper.toRoomDetailResponse(room);
    }
}
