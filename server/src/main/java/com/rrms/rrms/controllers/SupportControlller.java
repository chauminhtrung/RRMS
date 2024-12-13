package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.request.SupportRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.ISupportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "Support Controller", description = "Controller for Support")
@RestController
@RequestMapping("/support")
public class SupportControlller {
    ISupportService supportService;

    @Operation(summary = "Add support by id")
    @PostMapping("/create")
    public ApiResponse<Boolean> insertMotel(@RequestBody SupportRequest supportRequest) {
        boolean result = supportService.insert(supportRequest);
        if (result) {
            log.info("Insert support successfully");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.CREATED.value())
                    .message("success")
                    .result(true)
                    .build();
        } else {
            log.info("Insert support failed");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.CREATED.value())
                    .message("error")
                    .result(false)
                    .build();
        }

    }
}
