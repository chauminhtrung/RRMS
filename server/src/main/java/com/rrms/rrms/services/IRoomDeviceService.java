package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;

import java.util.UUID;

public interface IRoomDeviceService {
    RoomDeviceResponse insertRoomDevice(RoomDeviceRequest roomDeviceRequest);
    Boolean deleteRoomDevice(UUID roomDeviceId);
}
