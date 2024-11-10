package com.rrms.rrms.dto.response;

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
    private UUID motel_device_id;
    private MotelResponse motel;
    private String deviceName;
    private Double value;
    private Double valueInput;
    private int totalQuantity;
    private int totalUsing;
    private int totalNull;
    private String supplier;
}
