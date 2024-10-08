package com.rrms.rrms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.RoomImageRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomImageResponse;
import com.rrms.rrms.services.IRoomImage;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/roomImage")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomImageController {

    IRoomImage roomImageService;

    @PostMapping
    public ApiResponse<RoomImageResponse> postRoomImage(@RequestBody RoomImageRequest roomImageRequest) {
        RoomImageResponse response = roomImageService.postRoomImage(roomImageRequest);
        return ApiResponse.<RoomImageResponse>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(response)
                .build();
    }
}
