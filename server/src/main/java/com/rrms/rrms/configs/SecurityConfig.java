package com.rrms.rrms.configs;

import static org.springframework.security.config.Customizer.withDefaults;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Slf4j
public class SecurityConfig {

    private static final String[] PUBLIC_ENDPOINTS = {
            "/oauth2/callback/google/*",
            "/favicon.ico",
            "/",
            "/oauth2/*",
            "/oauth2/**",
            "/authen/*",
            "/authen/**",
            "/swagger-ui/*",
            "/v3/api-docs/*",
            "/searchs/**",
            "/search/**",
            "/search/*",
            "/search",
            "/RRMS",
            "/detail/**",
            "/detail/*",
            "/detail",
            "/bulletin-board/*",
            "/api-accounts/**",
            "/motels/get-motel-id",
    };

    @Value("${jwt.signer-key}")
    private String signerKey;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationEntryPoint authenticationEntryPoint)
            throws Exception {
        http.cors(withDefaults());

        http.authorizeHttpRequests(request -> request.requestMatchers(PUBLIC_ENDPOINTS)
                .permitAll()
                .anyRequest()
                .authenticated());

        // Cấu hình OAuth2 Login
        http.oauth2Login(oauth2 -> oauth2
                .loginPage("/authen/login")
                .successHandler((request, response, authentication) -> {
                    response.sendRedirect("/authen/success");
                })
                .failureHandler((request, response, exception) -> {
                    response.sendRedirect("/authen/error");
                }));

        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())
                .jwtAuthenticationConverter(jwtAuthenticationConverter())));

        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_"); // Đặt tiền tố ROLE_ cho các vai trò
        grantedAuthoritiesConverter.setAuthoritiesClaimName("roles"); // Xác định trường chứa vai trò trong JWT

        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);

        return authenticationConverter;
    }

    @Bean
    public JwtAuthenticationEntryPoint authenticationEntryPoint() {
        return new JwtAuthenticationEntryPoint();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HmacSHA512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
