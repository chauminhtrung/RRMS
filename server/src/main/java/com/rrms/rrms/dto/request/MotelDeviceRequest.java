package com.rrms.rrms.dto.request;

import com.rrms.rrms.dto.response.MotelResponse;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MotelDeviceRequest {
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
