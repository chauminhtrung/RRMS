package com.rrms.rrms.controllers;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Captcha Controller")
@RestController
@RequestMapping("/api")
@Slf4j
public class CaptchaController {

    @Value("${cloud-flare.captcha.secret}")
    private String SECRET_KEY;

    private final RestTemplate restTemplate;

    public CaptchaController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping("/verify-captcha")
    public ResponseEntity<Map<String, Object>> verifyCaptcha(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");

        String url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", SECRET_KEY);
        params.add("response", token);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            Map<String, Object> responseBody = response.getBody();

            if (responseBody != null && (Boolean) responseBody.get("success")) {
                log.info("Captcha verification success");
                return ResponseEntity.ok(Collections.singletonMap("success", true));
            } else {
                return ResponseEntity.ok(Collections.singletonMap("success", false));
            }
        } catch (Exception e) {
            // Log error if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Captcha verification failed"));
        }
    }
}
