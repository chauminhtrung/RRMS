package com.rrms.rrms.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Value("${jwt.signer-key}")
    private String signerKey;

    @Bean
    public String jwtSignerKey() {
        return signerKey;
    }
}
