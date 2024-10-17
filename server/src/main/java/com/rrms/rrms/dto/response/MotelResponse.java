package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MotelResponse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    String motelName;
    Double area;
    Long averagePrice;
    String address;
    AccountResponse account;
}
