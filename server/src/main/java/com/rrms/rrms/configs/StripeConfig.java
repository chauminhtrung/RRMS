package com.rrms.rrms.configs;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    @Value("${stripe.api.secretKey}")
    private String stripeSecretKey;

    @PostConstruct
    public void initSecretKey() {
        Stripe.apiKey = stripeSecretKey;
    }
}
