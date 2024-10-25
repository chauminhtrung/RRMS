package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RoomServiceRequest;
import com.rrms.rrms.dto.response.RoomServiceResponse;

public interface IRoomService {
    RoomServiceResponse createRoomService(RoomServiceRequest roomServiceRequest);
}
