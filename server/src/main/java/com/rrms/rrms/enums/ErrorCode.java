package com.rrms.rrms.enums;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    MOTEL_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Motel not found", HttpStatus.NOT_FOUND),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Account not found", HttpStatus.NOT_FOUND),
    ROOM_DETAIL_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Room detail not found", HttpStatus.NOT_FOUND),
    SEARCH_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Search not found", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Room not found", HttpStatus.NOT_FOUND),
    SERVICE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Service not found", HttpStatus.NOT_FOUND),
    TYPE_ROOM_EXIST(HttpStatus.BAD_REQUEST.value(), "Type room exist", HttpStatus.BAD_REQUEST),
    TYPE_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Type room not found", HttpStatus.NOT_FOUND),
    SERVICE_ID_REQUIRED(HttpStatus.BAD_REQUEST.value(), "Service id required", HttpStatus.BAD_REQUEST),
    INVALID_SEARCH_PARAMETER(HttpStatus.BAD_REQUEST.value(), "INVALID_SEARCH_PARAMETER", HttpStatus.BAD_REQUEST),
    BULLETIN_BOARD_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Bulletin board not found", HttpStatus.NOT_FOUND),
    BULLETIN_BOARD_REVIEW_NOT_FOUND(
            HttpStatus.NOT_FOUND.value(), "Bulletin board review not found", HttpStatus.NOT_FOUND),
    BULLETIN_BOARD_IMAGE_NOT_FOUND(
            HttpStatus.NOT_FOUND.value(), "Bulletin board image not found", HttpStatus.NOT_FOUND),

    // error for authen
    PHONE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Phone not found", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED.value(), "AUTHENTICATED", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(HttpStatus.FORBIDDEN.value(), "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST.value(), "INVALID_PASSWORD", HttpStatus.BAD_REQUEST),
    INVALID_PHONE(HttpStatus.BAD_REQUEST.value(), "Số điện thoại đã tồn tại!", HttpStatus.BAD_REQUEST),
    INVALID_PHONE2(
            HttpStatus.BAD_REQUEST.value(), "Số điện thoại không hợp lệ (phải đủ 10 số)!", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(HttpStatus.BAD_REQUEST.value(), "Email đã tồn tại!", HttpStatus.BAD_REQUEST),
    INVALID_USERNAME(HttpStatus.BAD_REQUEST.value(), "Tên đăng nhập đã tồn tại!", HttpStatus.BAD_REQUEST),
    ACCOUNT_ALREADY_EXISTS(HttpStatus.BAD_REQUEST.value(), "Tài khoản đã tồn tại", HttpStatus.BAD_REQUEST),
    ROLE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Role not found", HttpStatus.NOT_FOUND),
    ROLE_NOT_PROVIDED(HttpStatus.NOT_FOUND.value(), "ROLE NOT PROVIDED", HttpStatus.NOT_FOUND),
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST.value(), "Invalid refresh token", HttpStatus.BAD_REQUEST),

    INVOICE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Hợp đồng không tồn tại", HttpStatus.NOT_FOUND),
    INVOICE_ALREADY_CANCELED(
            HttpStatus.NOT_FOUND.value(), "Hóa đơn đã thanh toán, không thể hủy.", HttpStatus.NOT_FOUND),
    INVOICE_ALREADY_PAID(HttpStatus.NOT_FOUND.value(), "Hóa đơn này đã bị hủy trước đó.", HttpStatus.NOT_FOUND),
    INVOICE_CANNOT_BE_DELETED(
            HttpStatus.NOT_FOUND.value(), "Không thể xóa hóa đơn đã được thanh toán.", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
