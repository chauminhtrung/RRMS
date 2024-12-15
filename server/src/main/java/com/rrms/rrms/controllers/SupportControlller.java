package com.rrms.rrms.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.SupportRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.SupportResponse;
import com.rrms.rrms.services.ISupportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

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

    @Operation(summary = "Get All support")
    @GetMapping("/getAll")
    public ApiResponse<List<SupportResponse>> insertMotel() {
        return ApiResponse.<List<SupportResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(supportService.listSupport())
                .build();
    }
}
