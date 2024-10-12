package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.services.IRoom;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/room")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomController {

    IRoom roomService;

    @GetMapping("/{roomId}")
    public ApiResponse<RoomDetailResponse> getRoom(@PathVariable("roomId") UUID roomId) {
        RoomDetailResponse room = roomService.getRoomById(roomId);
        log.info("Get room: {}", room);
        return ApiResponse.<RoomDetailResponse>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(room)
                .build();
    }

    @PostMapping
    public ApiResponse<RoomDetailResponse> createRoom(@RequestBody RoomRequest roomRequest) {
        RoomDetailResponse createdRoom = roomService.createRoom(roomRequest);
        return ApiResponse.<RoomDetailResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("success")
                .result(createdRoom)
                .build();
    }

    @GetMapping("/post-room-table")
    public ApiResponse<List<PostRoomTableResponse>> getPostRoomTable(@RequestParam("username") String username) {
        List<PostRoomTableResponse> rooms = roomService.getPostRoomTable(username);
        return ApiResponse.<List<PostRoomTableResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(rooms)
                .build();
    }
}
