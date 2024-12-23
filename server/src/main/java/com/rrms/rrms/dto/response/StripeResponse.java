package com.rrms.rrms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StripeResponse {

    private String intentId;
    private String clientSecret;
}
