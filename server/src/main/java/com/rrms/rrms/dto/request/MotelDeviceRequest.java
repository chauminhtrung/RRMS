package com.rrms.rrms.dto.request;

import com.rrms.rrms.dto.response.MotelResponse;
<<<<<<< HEAD
=======

import com.rrms.rrms.enums.Unit;
>>>>>>> 5335406fe75dde3185682a62d41154e3daded24a
import com.rrms.rrms.models.Motel;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private MotelResponse motel;
    private String deviceName;
    private Double value;
    private Double valueInput;
    private int totalQuantity;
    private int totalUsing;
    private int totalNull;
    private String supplier;
}
