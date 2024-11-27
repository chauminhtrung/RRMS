package com.rrms.rrms.dto.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class StripeRequest {

    private Long amount;

    private String email;

    private String productName;
}