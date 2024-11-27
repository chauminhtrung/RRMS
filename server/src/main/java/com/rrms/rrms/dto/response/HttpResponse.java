package com.rrms.rrms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import okhttp3.Headers;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class HttpResponse {

    int status;
    String data;
    Headers headers;
}