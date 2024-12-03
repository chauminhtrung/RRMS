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
public class InvoiceRequest {
    private UUID contractId; // ID hợp đồng
    private YearMonth invoiceCreateMonth; // Tháng lập phiếu
    private LocalDate invoiceCreateDate; // Ngày lập phiếu
    private List<DetailInvoiceRequest> serviceDetails;
}
