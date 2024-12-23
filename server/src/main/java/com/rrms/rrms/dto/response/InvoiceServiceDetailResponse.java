package com.rrms.rrms.dto.response;

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
public class InvoiceServiceDetailResponse {
    private UUID roomServiceId;
    private String serviceName;
    private Long servicePrice;
    private Integer quantity;
    private String chargetype;
    private Long totalPrice;
}
