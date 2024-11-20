package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;
import com.rrms.rrms.models.RoomDevice;

@Mapper(componentModel = "spring")
public interface RoomDeviceMapper {
    RoomDeviceResponse roomDeviceToRoomDeviceResponse(RoomDevice roomDevice);

    RoomDevice roomDeviceRequestToRoomDevice(RoomDeviceRequest roomDeviceRequest);
}
