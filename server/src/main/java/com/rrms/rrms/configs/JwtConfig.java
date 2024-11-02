package com.rrms.rrms.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${jwt.signer-key}") // Gán giá trị từ file cấu hình ứng dụng vào biến signerKey
    private String signerKey; // Biến để lưu giữ khóa ký JWT

    @Bean
    public String jwtSignerKey() {
        return signerKey; // Trả về giá trị của signerKey để có thể sử dụng ở các nơi khác trong ứng dụng
    }
}
