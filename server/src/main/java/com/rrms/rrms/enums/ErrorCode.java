package com.rrms.rrms.enums;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Account not found", HttpStatus.NOT_FOUND),
    ROOM_DETAIL_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Room detail not found", HttpStatus.NOT_FOUND),
    SEARCH_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Search not found", HttpStatus.NOT_FOUND);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
