package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.services.IRoom;
import com.rrms.rrms.utils.CacheChecked;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Room Controller", description = "Controller for Room")
@RestController
@Slf4j
@RequestMapping("/room")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomController {

    IRoom roomService;
    CacheChecked cacheChecked;

    @Operation(summary = "Create room")
    @PostMapping
    public ApiResponse<RoomDetailResponse> createRoom(@RequestBody RoomRequest roomRequest) {
        RoomDetailResponse createdRoom = roomService.createRoom(roomRequest);
        log.info("Created room at roomId: {}", createdRoom.getRoomId());
        return ApiResponse.<RoomDetailResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("success")
                .result(createdRoom)
                .build();
    }

    @Operation(summary = "Get room by roomId")
    //    @Cacheable(value = "room", key = "#roomId")
    @GetMapping("/{roomId}")
    public ApiResponse<RoomDetailResponse> getRoom(@PathVariable("roomId") UUID roomId) {
        RoomDetailResponse room = roomService.getRoomById(roomId);
        if (cacheChecked.cacheHit(room.toString(), "room")) {
            log.warn("Cache miss for Room with {}: ", roomId);
        }
        log.info("Get room at roomId: {}", room.getRoomId());
        return ApiResponse.<RoomDetailResponse>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(room)
                .build();
    }

    //    @Operation(summary = "Get room by roomId without cache")
    //    @GetMapping("/nocache/{roomId}")
    //    public ApiResponse<RoomDetailResponse> getRoomNoCache(@PathVariable("roomId") UUID roomId) {
    //        RoomDetailResponse room = roomService.getRoomById(roomId);
    //        log.info("Get room no cache at roomId: {}", room.getRoomId());
    //        return ApiResponse.<RoomDetailResponse>builder()
    //                .code(HttpStatus.OK.value())
    //                .message("success")
    //                .result(room)
    //                .build();
    //    }

    @Operation(summary = "Get post room table")
    @GetMapping("/post-room-table")
    public ApiResponse<List<PostRoomTableResponse>> getPostRoomTable(@RequestParam("username") String username) {
        List<PostRoomTableResponse> rooms = roomService.getPostRoomTable(username);
        log.info("Get post room table at username: {}", username);
        return ApiResponse.<List<PostRoomTableResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(rooms)
                .build();
    }

    @Operation(summary = "Delete room")
    //    @CacheEvict(value = "room", key = "#roomId")
    @DeleteMapping("/{roomId}")
    public ApiResponse<String> deleteRoom(@PathVariable("roomId") UUID roomId) {
        String result = "";
        try {
            result = roomService.deleteRoom(roomId);
            log.info("Delete room successful at roomId: {}", roomId);
            return ApiResponse.<String>builder()
                    .code(HttpStatus.OK.value())
                    .message("Delete success")
                    .result(result)
                    .build();
        } catch (Exception e) {
            log.error("Delete room fail at roomId: {}", roomId);
            return ApiResponse.<String>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Delete fail")
                    .result(result)
                    .build();
        }
    }
}
