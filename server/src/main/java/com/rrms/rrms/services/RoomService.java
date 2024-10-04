package com.rrms.rrms.services;

import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomService {
    
    RoomRepository roomRepository;
    RoomMapper roomMapper;
    
    
    public RoomDetailResponse getRoomById(UUID id) {
        Room room = roomRepository.findById(id).get();
        return roomMapper.toRoomDetailResponse(room);
    }
}
