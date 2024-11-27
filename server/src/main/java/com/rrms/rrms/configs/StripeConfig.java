package com.rrms.rrms.configs;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.stripe.Stripe;

@Configuration
public class StripeConfig {

    @Value("${stripe.api.secretKey}")
    private String stripeSecretKey;

    @PostConstruct
    public void initSecretKey() {
        Stripe.apiKey = stripeSecretKey;
    }
}
