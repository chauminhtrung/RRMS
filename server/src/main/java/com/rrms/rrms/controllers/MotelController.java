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
    @PostMapping()
    public ApiResponse<MotelResponse> insertMotel(@RequestBody MotelRequest motelRequest) {
           MotelResponse motelResponse = motelService.insert(motelRequest);
           return ApiResponse.<MotelResponse>builder().code(HttpStatus.CREATED.value()).message("success").result(motelResponse).build();
    }
}
