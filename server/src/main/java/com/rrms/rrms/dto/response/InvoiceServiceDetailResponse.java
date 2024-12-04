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
public class InvoiceServiceDetailResponse {
    private String serviceName; // Tên dịch vụ
    private Long servicePrice; // Giá dịch vụ
    private Integer quantity; // Số lượng sử dụng
    private Long totalPrice;
}
