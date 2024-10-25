package com.rrms.rrms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.enums.ErrorCode;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException e) {
        ApiResponse apiResponse = ApiResponse.builder()
            .code(ErrorCode.UNAUTHORIZED.getCode())
            .message(ErrorCode.UNAUTHORIZED.getMessage())
            .build();

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(apiResponse);
    }

}
