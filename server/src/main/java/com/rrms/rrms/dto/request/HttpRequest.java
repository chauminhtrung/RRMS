package com.rrms.rrms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HttpRequest {
    private String method;
    private String endpoint;
    private String payload;
    private String contentType;
}
