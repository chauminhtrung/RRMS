package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.RoomDetailResponse;

public interface IRoomService {

    RoomDetailResponse getRoomById(UUID id);

    RoomDetailResponse createRoom(RoomRequest roomRequest);

    List<RoomDetailResponse> getRooms();
}
