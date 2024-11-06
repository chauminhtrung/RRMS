package com.rrms.rrms.dto.request;

import java.io.Serializable;
import java.util.UUID;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BrokerCreateRequest implements Serializable {
    String name;
    String phone;
    UUID motelId;
    int commissionRate;
}
