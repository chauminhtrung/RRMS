package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.ApiResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.services.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/room")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomController {

    RoomService roomService;

    @GetMapping("/{roomId}")
    public ApiResponse<RoomDetailResponse> getRoom(@PathVariable("roomId") UUID roomId) {
        RoomDetailResponse room = roomService.getRoomById(roomId);
        return ApiResponse.<RoomDetailResponse>builder().code(HttpStatus.OK.value()).message("success").result(room).build();
    }
}
