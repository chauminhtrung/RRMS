package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.request.RoomRequest2;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomResponse2;

public interface IRoom {

    RoomDetailResponse getRoomById(UUID id);

    RoomDetailResponse createRoom(RoomRequest roomRequest);

    //    List<BulletinBoardSearchResponse> getRooms();

    List<PostRoomTableResponse> getPostRoomTable(String username);

    String deleteRoom(UUID id);

    // phan do xoa duoc ma lam bieng
    RoomResponse2 createRoom2(RoomRequest2 roomRequest);

    RoomResponse2 getRoomById2(UUID roomId);

    List<RoomResponse2> getAllRooms();

    RoomResponse2 updateRoom2(UUID roomId, RoomRequest2 roomRequest);

    void deleteRoom2(UUID roomId);

    List<RoomResponse2> getRoomsByMotelId(UUID motelId); // Thêm phương thức mới

    List<RoomResponse2> getRoomsByMotelIdNullContract(UUID motelId); // Thêm phương thức mới
}
