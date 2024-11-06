package com.rrms.rrms.dto.response;

import java.io.Serializable;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BrokerResponse implements Serializable {
    String name;
    String phone;
    String status;
    int commissionRate;
}
