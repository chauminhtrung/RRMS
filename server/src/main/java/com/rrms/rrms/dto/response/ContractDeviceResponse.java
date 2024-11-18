package com.rrms.rrms.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractDeviceResponse {
    private UUID contractDeviceId;
    private UUID contractId;
    private UUID motelDeviceId;
    private int quantity;
}