package com.rrms.rrms.dto.response;

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
public class ServiceDetailResponse {
    private String serviceName;
    private Double servicePrice;
    private Double quantity;
    private Double consumption;
    private Double totalPrice;
}
