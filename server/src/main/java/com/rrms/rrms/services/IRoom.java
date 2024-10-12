package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;

import java.util.List;
import java.util.UUID;

public interface IRoom {

    RoomDetailResponse getRoomById(UUID id);

    RoomDetailResponse createRoom(RoomRequest roomRequest);

    List<RoomDetailResponse> getRooms();

    List<PostRoomTableResponse> getPostRoomTable(String username);
}
