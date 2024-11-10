package com.rrms.rrms.dto.response;

import java.io.Serializable;
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
public class MotelServiceResponse implements Serializable {
    UUID motelServiceId;
    UUID motelId;
    String nameService;
    Long price;
    String chargetype;
}
