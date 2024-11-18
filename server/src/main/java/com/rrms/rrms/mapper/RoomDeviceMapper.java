package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;
import com.rrms.rrms.models.RoomDevice;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoomDeviceMapper {
    RoomDeviceResponse roomDeviceToRoomDeviceResponse(RoomDevice roomDevice);
    RoomDevice roomDeviceRequestToRoomDevice(RoomDeviceRequest roomDeviceRequest);
}
