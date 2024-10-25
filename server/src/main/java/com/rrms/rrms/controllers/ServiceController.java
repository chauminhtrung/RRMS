package com.rrms.rrms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.ServiceRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.ServiceResponse;
import com.rrms.rrms.services.IService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Service Controller")
@RestController
@Slf4j
@RequestMapping("/service")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ServiceController {

    IService service;

    @Operation(summary = "Create service")
    @PostMapping
    public ApiResponse<ServiceResponse> createService(@RequestBody ServiceRequest serviceRequest) {
        return ApiResponse.<ServiceResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create service successfully")
                .result(service.createService(serviceRequest))
                .build();
    }
}
