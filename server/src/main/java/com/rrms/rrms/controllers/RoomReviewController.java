package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.RoomReviewRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomReviewResponse;
import com.rrms.rrms.services.IRoomReview;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@Slf4j
@RequestMapping("/room-reviews")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomReviewController {
    IRoomReview roomReviewService;
    @PostMapping
    public ApiResponse<RoomReviewResponse> createRoomReview(@RequestBody RoomReviewRequest roomReviewRequest) {
        RoomReviewResponse response = roomReviewService.createRoomReview(roomReviewRequest);
        return ApiResponse.<RoomReviewResponse>builder()
                .message("Create Room Review successfully")
                .code(HttpStatus.OK.value())
                .result(response)
                .build();
    }
}

