package com.rrms.rrms.dto.response;

import java.io.Serial;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    int code = 1000;
    String message;
    T result;
}
