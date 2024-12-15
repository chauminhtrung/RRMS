package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;

public interface IRoomDeviceService {
    RoomDeviceResponse insertRoomDevice(RoomDeviceRequest roomDeviceRequest);

    Boolean deleteByRoomAndAndMotelDevice(UUID roomId, UUID motelDeviceId);

    List<RoomDeviceResponse> getAllDeviceByRoomId(UUID roomId);

    Boolean updateQuantity(UUID roomId, UUID motelDeviceId, Integer quantity);
}
