package com.rrms.rrms.controllers;


import com.rrms.rrms.dto.request.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.MotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/motels")
public class MotelController {
    @Autowired
    private MotelService motelService;
    @GetMapping("/{id}")
    public ApiResponse<MotelResponse> getMotel(@PathVariable("id") UUID id) {
        MotelResponse motel = motelService.findById(id);
        return  ApiResponse.<MotelResponse>builder().code(HttpStatus.OK.value()).message("success").result(motel).build();
    }
    @PostMapping()
    public ApiResponse<MotelResponse> insertMotel( ) {
//        MotelResponse motel = motelService.findById(id);
//        return  ApiResponse.<MotelResponse>builder().code(HttpStatus.OK.value()).message("success").result(motel).build();
    return null;
    }
}
