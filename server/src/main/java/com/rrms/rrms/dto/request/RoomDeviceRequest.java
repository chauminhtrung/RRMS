package com.rrms.rrms.dto.request;

import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.dto.response.RoomResponse2;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomDeviceRequest {

    RoomResponse2 room;
    MotelDeviceResponse motelDevice;
    int quantity;
}
