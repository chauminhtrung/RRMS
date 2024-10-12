package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.RoomImageRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomImageResponse;
import com.rrms.rrms.services.IRoomImage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/rooms-images")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomImageController {

    IRoomImage roomImageService;

    @PostMapping
    public ApiResponse<RoomImageResponse> postRoomImage(@RequestBody RoomImageRequest roomImageRequest) {
        RoomImageResponse response = roomImageService.postRoomImage(roomImageRequest);
        return ApiResponse.<RoomImageResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("success")
                .result(response)
                .build();
    }
}
