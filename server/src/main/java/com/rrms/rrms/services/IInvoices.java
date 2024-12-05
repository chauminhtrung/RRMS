package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.request.UpdateInvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceResponse;

public interface IInvoices {

    List<InvoiceResponse> getInvoicesByMotelId(UUID motelId);

    InvoiceResponse createInvoice(InvoiceRequest request);

    InvoiceResponse updateInvoice(UpdateInvoiceRequest request);
}
