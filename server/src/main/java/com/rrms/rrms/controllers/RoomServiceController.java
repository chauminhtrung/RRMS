package com.rrms.rrms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.RoomServiceRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomServiceResponse;
import com.rrms.rrms.services.IRoomServiceService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/room-service")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomServiceController {
    IRoomServiceService roomServiceService;

    @PostMapping
    public ApiResponse<RoomServiceResponse> createRoomService(@RequestBody RoomServiceRequest roomServiceRequest) {
        return ApiResponse.<RoomServiceResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Create room service success")
                .result(roomServiceService.createRoomService(roomServiceRequest))
                .build();
    }
}
