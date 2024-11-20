package com.rrms.rrms.services;

import java.util.UUID;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;

public interface IRoomDeviceService {
    RoomDeviceResponse insertRoomDevice(RoomDeviceRequest roomDeviceRequest);

    Boolean deleteRoomDevice(UUID roomDeviceId);
}
