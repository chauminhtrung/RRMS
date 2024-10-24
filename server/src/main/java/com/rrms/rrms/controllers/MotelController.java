package com.rrms.rrms.controllers;


import java.util.List;
import java.util.UUID;

import com.rrms.rrms.configs.RedisRateLimiter;
import com.rrms.rrms.dto.request.AccountRequest;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.IMotelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "Motel Controller", description = "Controller for Motel")
@RestController
@RequestMapping("/motels")
public class MotelController {
    IMotelService motelService;
    @Autowired
    private RedisRateLimiter rateLimiter;
    @Operation(summary = "Get motel by name")
    @GetMapping("/{name}")
    public ApiResponse<List<MotelResponse>> getMotel(@PathVariable String name) {
        List<MotelResponse> motelResponses = motelService.findAllByMotelName(name);
        log.info("Get motel successfully: {}", name);
        return ApiResponse.<List<MotelResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(motelResponses)
                .build();
    }
    @Operation(summary = "Get motel by id")
    @GetMapping("/get-motel-id")
    public ApiResponse<List<MotelResponse>> getMotelbyid(@RequestParam UUID id) {
        List<MotelResponse> motelResponses = motelService.findById(id);
        return ApiResponse.<List<MotelResponse>>builder().code(HttpStatus.OK.value()).message("success").result(motelResponses).build();
    }
    @GetMapping("/get-motel-account")
    public ApiResponse<List<MotelResponse>> getMotelbyaccount(@RequestParam String username) {
        List<MotelResponse> motelResponses = motelService.findMotelByAccount_Username(username);
        return ApiResponse.<List<MotelResponse>>builder().code(HttpStatus.OK.value()).message("success").result(motelResponses).build();
    }
    @Operation(summary = "Get all motels")
    @GetMapping()
    public ApiResponse<List<MotelResponse>> getMotels(@RequestParam String username) {
        // test valid request
        boolean allowed = rateLimiter.isAllowed(username);
        if (allowed) {
            List<MotelResponse> motelResponses = motelService.findAll();
            log.info("Get all motels successfully");
            return ApiResponse.<List<MotelResponse>>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(motelResponses)
                    .build();
        } else {
            log.info("Get all motels fail");
            return ApiResponse.<List<MotelResponse>>builder()
                    .code(HttpStatus.TOO_MANY_REQUESTS.value())
                    .message("Request to many:::" + username)
                    .result(null)
                    .build();
        }
    }
    @Operation(summary = "Add motel by id")
    @PostMapping()
    public ApiResponse<MotelResponse> insertMotel(@RequestBody MotelRequest motelRequest) {
        MotelResponse motelResponse = motelService.insert(motelRequest);
        log.info("Insert motel successfully");
        return ApiResponse.<MotelResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("success")
                .result(motelResponse)
                .build();
    }
    @Operation(summary = "Update motel by id")
    @PutMapping("/{id}")
    public ApiResponse<MotelResponse> updateMotel(@PathVariable("id") UUID id, @RequestBody MotelRequest motelRequest) {
        if (!id.equals(null) && !motelRequest.equals(null)) {
            MotelResponse motelResponse = motelService.update(id, motelRequest);
            log.info("Update motel successfully");
            return ApiResponse.<MotelResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(motelResponse)
                    .build();
        }
        log.error("Update motel failed");
        return ApiResponse.<MotelResponse>builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message("error")
                .result(null)
                .build();
    }
    @Operation(summary = "Delete motel by id")
    @DeleteMapping()
    public ApiResponse<Boolean> deleteMotel(@PathVariable("id") UUID id) {
        try {
            motelService.delete(id);
            log.info("Delete motel successfully");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("success")
                    .result(true)
                    .build();
        } catch (Exception e) {
            log.error("Delete motel failed", e);
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }
}