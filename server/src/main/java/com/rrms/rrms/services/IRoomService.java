package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.RoomServiceRequest;
import com.rrms.rrms.dto.response.RoomServiceRespone2;
import com.rrms.rrms.dto.response.RoomServiceResponse;

public interface IRoomService {
    RoomServiceResponse createRoomService(RoomServiceRequest roomServiceRequest);

    RoomServiceResponse updateRoomService(UUID roomServiceId, RoomServiceRequest request);

    RoomServiceResponse getRoomServiceById(UUID roomServiceId);

    List<RoomServiceResponse> findAll(); // Thêm phương thức findAll

    List<RoomServiceRespone2> findByRoomId(UUID roomId); // Thêm phương thức findByRoomId

    void deleteRoomService(UUID roomServiceId);

    RoomServiceResponse createRoomService2(RoomServiceRequest roomServiceRequest);
}
