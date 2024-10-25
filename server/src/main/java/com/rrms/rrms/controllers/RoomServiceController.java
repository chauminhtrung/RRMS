package com.rrms.rrms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.RoomServiceRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomServiceResponse;
import com.rrms.rrms.services.IRoomService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Room Service Controller")
@RestController
@Slf4j
@RequestMapping("/room-service")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomServiceController {
    IRoomService roomServiceService;

    @Operation(summary = "Create room service")
    @PostMapping
    public ApiResponse<RoomServiceResponse> createRoomService(@RequestBody RoomServiceRequest roomServiceRequest) {
        log.info("Create room service");
        return ApiResponse.<RoomServiceResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create room service success")
                .result(roomServiceService.createRoomService(roomServiceRequest))
                .build();
    }
}
