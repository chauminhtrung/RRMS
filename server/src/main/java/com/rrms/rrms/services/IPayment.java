package com.rrms.rrms.services;

import java.util.List;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface IPayment {
    Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl)
            throws PayPalRESTException;

    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

    List<com.rrms.rrms.models.Payment> getAllPayments();
}
