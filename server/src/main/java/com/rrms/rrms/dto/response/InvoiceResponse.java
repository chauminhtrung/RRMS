package com.rrms.rrms.dto.response;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
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
public class InvoiceResponse {
    private UUID invoiceId; // ID hóa đơn
    private YearMonth invoiceCreateMonth; // tháng lập hóa đơn
    private LocalDate invoiceCreateDate; // Ngày tạo hóa đơn
    private LocalDate dueDate; // Hạn đóng tiền
    private LocalDate moveinDate; // Ngày vao o
    private LocalDate dueDateofmoveinDate; // Hạn đóng tiền
    private Double deposit; // Tiền đặt cọc
    private List<ServiceDetailResponse> serviceDetails; // Chi tiết dịch vụ
}
