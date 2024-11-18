package com.rrms.rrms.dto.request;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractServiceRequest {
    private UUID contractId;
    private UUID serviceId;
}
