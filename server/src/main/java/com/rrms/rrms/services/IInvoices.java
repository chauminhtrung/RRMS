package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.CollectPaymentRequest;
import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.request.UpdateInvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceResponse;
import com.rrms.rrms.models.Invoice;

public interface IInvoices {

    List<InvoiceResponse> getInvoicesByMotelId(UUID motelId);

    InvoiceResponse createInvoice(InvoiceRequest request);

    void deleteInvoice(UUID invoiceId);

    void cancelInvoice(UUID invoiceId);

    InvoiceResponse updateInvoice(UUID invoiceId, UpdateInvoiceRequest request);

    Invoice findInvoiceById(UUID invoiceId);

    InvoiceResponse mapToResponse(Invoice invoice);

    void collectPayment(UUID invoiceId, CollectPaymentRequest request);
}
