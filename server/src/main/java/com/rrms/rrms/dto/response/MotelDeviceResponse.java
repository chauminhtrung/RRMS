package com.rrms.rrms.dto.response;

import com.rrms.rrms.enums.Unit;

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
public class MotelDeviceResponse {
    UUID motel_device_id;
    MotelResponse motel;
    String deviceName;
    String icon;
    Double value;
    Double valueInput;
    int totalQuantity;
    int totalUsing;
    int totalNull;
    String supplier;
    String unit;
}
