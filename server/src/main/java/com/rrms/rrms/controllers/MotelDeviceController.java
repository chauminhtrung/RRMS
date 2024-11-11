package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.servicesImp.MotelDeviceService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "MotelDevice Controller", description = "Controller for MotelDevice")
@RestController
@RequestMapping("/moteldevices")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class MotelDeviceController {
    MotelDeviceService motelDeviceService;


    @Operation(summary = "get All moteldevice by motelid")
    @GetMapping("/{motelId}")
    public ApiResponse<List<MotelDeviceResponse>> getMotelDevices(@PathVariable("motelId") UUID motelId) {
        List<MotelDeviceResponse> motelResponses = motelDeviceService.getAllMotelDevicesByMotel(motelId);
        log.info("Get all moteldevices successfully");
        return ApiResponse.<List<MotelDeviceResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(motelResponses)
                .build();
    }

    @Operation(summary = "insert moteldevice")
    @PostMapping()
    public ApiResponse<MotelDeviceResponse> insertMotelDevice(@RequestBody MotelDeviceRequest motelDeviceRequest) {
        MotelDeviceResponse motelResponses = motelDeviceService.insertMotelDevice(motelDeviceRequest);
        if (motelResponses != null) {
            log.info("Insert moteldevices successfully");
            return ApiResponse.<MotelDeviceResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(motelResponses)
                    .build();
        } else {
            log.info("Insert moteldevices failed");
            return ApiResponse.<MotelDeviceResponse>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(null)
                    .build();
        }
    }

    @Operation(summary = "Delete moteldevice by id")
    @DeleteMapping("/{motelDeviceId}")
    public ApiResponse<Boolean> deleteMotelDevice(@PathVariable("motelDeviceId") UUID motelDeviceId) {
        try {
            motelDeviceService.deleteMotelDevice(motelDeviceId);
            log.info("Delete moteldevice successfully");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        } catch (Exception e) {
            log.error("Delete moteldevice failed ");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }
}