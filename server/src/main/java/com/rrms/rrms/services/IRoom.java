package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;

public interface IRoom {

    RoomDetailResponse getRoomById(UUID id);

    RoomDetailResponse createRoom(RoomRequest roomRequest);

//    List<BulletinBoardSearchResponse> getRooms();

    List<PostRoomTableResponse> getPostRoomTable(String username);

    String deleteRoom(UUID id);
}
