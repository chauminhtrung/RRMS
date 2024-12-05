package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceResponse;
import com.rrms.rrms.services.IInvoices;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Invoice Controller", description = "Controller for Invoice")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    @Autowired
    private IInvoices invoices;

    @PostMapping("/create")
    public ResponseEntity<InvoiceResponse> createInvoice(@RequestBody InvoiceRequest request) {
        InvoiceResponse response = invoices.createInvoice(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/motel/{motelId}")
    public ResponseEntity<List<InvoiceResponse>> getInvoicesByMotelId(@PathVariable UUID motelId) {
        List<InvoiceResponse> responses = invoices.getInvoicesByMotelId(motelId);
        return ResponseEntity.ok(responses);
    }
}
