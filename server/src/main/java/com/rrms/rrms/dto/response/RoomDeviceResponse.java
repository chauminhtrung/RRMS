package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.MotelDevice;
import com.rrms.rrms.models.Room;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

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
