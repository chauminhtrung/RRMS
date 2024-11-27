package com.rrms.rrms.controllers;


import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import com.rrms.rrms.services.IPayment;
import jakarta.annotation.security.PermitAll;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {
    IPayment paymentService;

    // Paypal payment
    // sb-fo7f331992187@personal.example.com
    // r&o}V0Z>
    @PostMapping("/payment-paypal")
    public Map<String, String> payment(@RequestParam("totalPrice") double totalPrice, @RequestParam("userName") String userName) {
        Map<String, String> response = new HashMap<>();
        try {
            String cancelUrl = "http://localhost:8080/payment/paypal/cancel";
            String successUrl = "http://localhost:8080/payment/paypal/success";
            Payment payment = paymentService.createPayment(
                    totalPrice,
                    "USD",
                    "PAYPAL",
                    "sale",
                    userName + " Thanh toán",
                    cancelUrl,
                    successUrl
            );
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    response.put("redirectUrl", links.getHref());
                    return response;
                }
            }
        } catch (PayPalRESTException e) {
            throw new RuntimeException(e);
        }
        response.put("redirectUrl", "payment/paypal/error");
        return response;
    }

    @GetMapping("/paypal/cancel")
    @ResponseBody
    public String cancel() {
        return "cancel";
    }

    @GetMapping("/paypal/error")
    @ResponseBody
    @PermitAll
    public String error() {
        return "error";
    }

    @GetMapping("/paypal/success")
    @ResponseBody
    @PermitAll
    public String success() {
        return "success";
    }

}
