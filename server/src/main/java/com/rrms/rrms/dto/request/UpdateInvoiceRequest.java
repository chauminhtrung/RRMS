package com.rrms.rrms.dto.request;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

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
    private String invoiceReason; // Lý do thu tiền (nếu thay đổi)
    private YearMonth invoiceCreateMonth; // Tháng lập hóa đơn (nếu thay đổi)
    private LocalDate invoiceCreateDate; // Ngày lập hóa đơn (nếu thay đổi)
    private LocalDate dueDate; // Hạn đóng tiền (nếu thay đổi)

    private List<InvoiceDetailServiceRequest> serviceDetails; // Danh sách chi tiết dịch vụ
    private List<InvoiceDetailDeviceRequest> deviceDetails; // Danh sách chi tiết thiết bị
    private List<UpdateInvoiceAdditionItemRequest> additionItems; // Danh sách khoản phụ thu
}
