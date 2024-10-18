package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.MotelRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.IMotelService;

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

    @GetMapping("/get-motel-account")
    public ApiResponse<List<MotelResponse>> getMotelbyaccount(@RequestParam String username) {
        List<MotelResponse> motelResponses = motelService.findMotelByAccount_Username(username);
        return ApiResponse.<List<MotelResponse>>builder().code(HttpStatus.OK.value()).message("success").result(motelResponses).build();
    }

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
