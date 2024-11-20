package com.rrms.rrms.dto.response;

import java.util.UUID;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomDeviceResponse {
    UUID roomDeviceId;

    RoomResponse2 room;

    MotelDeviceResponse motelDevice;

    int quantity;
}
