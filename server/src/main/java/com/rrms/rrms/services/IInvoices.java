package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceResponse;

public interface IInvoices {
    InvoiceResponse createInvoice(InvoiceRequest request);

    List<InvoiceResponse> getInvoicesByMotelId(UUID motelId);
}
