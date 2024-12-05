package com.rrms.rrms.dto.request;

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
public class UpdateInvoiceRequest {
    private UUID invoiceId; // ID hóa đơn cần cập nhật
    private String invoiceReason; // Lý do cập nhật
    private YearMonth invoiceUpdateMonth; // Tháng cập nhật hóa đơn
    private LocalDate invoiceUpdateDate; // Ngày cập nhật hóa đơn
    private List<InvoiceDetailServiceRequest> serviceDetails; // Danh sách chi tiết dịch vụ
    private List<InvoiceDetailDeviceRequest> deviceDetails; // Danh sách chi tiết thiết bị
    private List<InvoiceAdditionItemRequest> additionItems;
}
