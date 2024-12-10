package com.rrms.rrms.dto.request;

import java.util.UUID;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateInvoiceAdditionItemRequest {
    private UUID additionalChargeId;
    private String reason;
    private Double amount;
    private Boolean isAddition;
}
