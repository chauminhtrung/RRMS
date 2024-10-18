package com.rrms.rrms.controllers;

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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

<<<<<<<<< Temporary merge branch 1
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "Motel Controller", description = "Controller for Motel")
=========
import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.MotelRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.IMotelService;

>>>>>>>>> Temporary merge branch 2
@RestController
@RequestMapping("/motels")
public class MotelController {
    @Autowired
    private IMotelService motelService;

    @GetMapping("/{name}")
    public ApiResponse<List<MotelResponse>> getMotel(@PathVariable String name) {
        List<MotelResponse> motelResponses = motelService.findAllByMotelName(name);
        return ApiResponse.<List<MotelResponse>>builder().code(HttpStatus.OK.value()).message("success").result(motelResponses).build();
    }

<<<<<<<<< Temporary merge branch 1
    @Operation(summary = "Get all motels")
=========
    @GetMapping("/get-motel-account")
    public ApiResponse<List<MotelResponse>> getMotelbyaccount(@RequestParam String username) {
        List<MotelResponse> motelResponses = motelService.findMotelByAccount_Username(username);
        return ApiResponse.<List<MotelResponse>>builder().code(HttpStatus.OK.value()).message("success").result(motelResponses).build();
    }

>>>>>>>>> Temporary merge branch 2
    @GetMapping()
    public ApiResponse<List<MotelResponse>> getMotels() {
        List<MotelResponse> motelResponses = motelService.findAll();
        return ApiResponse.<List<MotelResponse>>builder().code(HttpStatus.OK.value()).message("success").result(motelResponses).build();
    }

    @PostMapping()
    public ApiResponse<MotelResponse> insertMotel(@RequestBody MotelRequest motelRequest) {
        MotelResponse motelResponse = motelService.insert(motelRequest);
        return ApiResponse.<MotelResponse>builder().code(HttpStatus.CREATED.value()).message("success").result(motelResponse).build();
    }

    @PutMapping("/{id}")
    public ApiResponse<MotelResponse> updateMotel(@PathVariable("id") UUID id, @RequestBody MotelRequest motelRequest) {
        if (!id.equals(null) && !motelRequest.equals(null)) {
            MotelResponse motelResponse = motelService.update(id, motelRequest);
            return ApiResponse.<MotelResponse>builder().code(HttpStatus.OK.value()).message("success").result(motelResponse).build();
        }
        return ApiResponse.<MotelResponse>builder().code(HttpStatus.BAD_REQUEST.value()).message("error").result(null).build();
    }

    @DeleteMapping()
    public ApiResponse<Boolean> deleteMotel(@PathVariable("id") UUID id) {
        try {
            motelService.delete(id);
            return ApiResponse.<Boolean>builder().code(HttpStatus.BAD_REQUEST.value()).message("success").result(true).build();
        } catch (Exception e) {
            return ApiResponse.<Boolean>builder().code(HttpStatus.BAD_REQUEST.value()).message("error").result(false).build();
        }
    }
}
