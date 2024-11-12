package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.response.RoomServiceRespone2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

import java.util.List;
import java.util.UUID;

@Tag(name = "Room Service Controller")
@RestController
@Slf4j
@RequestMapping("/room-service")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
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

    @Operation(summary = "Create room service")
    @PostMapping("/create")
    public ResponseEntity<RoomServiceResponse> createRoomService2(@RequestBody RoomServiceRequest roomServiceRequest) {
        System.out.println("roomId: " + roomServiceRequest.getRoomId());
        System.out.println("serviceId: " + roomServiceRequest.getServiceId());
        System.out.println("quantity: " + roomServiceRequest.getQuantity());
        RoomServiceResponse roomServiceResponse = roomServiceService.createRoomService2(roomServiceRequest);
        return new ResponseEntity<>(roomServiceResponse, HttpStatus.CREATED);
    }

    // Endpoint để cập nhật RoomService
    @PutMapping("/{roomServiceId}")
    public ResponseEntity<RoomServiceResponse> updateRoomService(
            @PathVariable UUID roomServiceId,
            @RequestBody RoomServiceRequest request) {
        RoomServiceResponse response = roomServiceService.updateRoomService(roomServiceId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Endpoint để lấy RoomService theo ID
    @GetMapping("/{roomServiceId}")
    public ResponseEntity<RoomServiceResponse> getRoomServiceById(@PathVariable UUID roomServiceId) {
        RoomServiceResponse response = roomServiceService.getRoomServiceById(roomServiceId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Endpoint để xóa RoomService
    @DeleteMapping("/{roomServiceId}")
    public ResponseEntity<Void> deleteRoomService(@PathVariable UUID roomServiceId) {
        roomServiceService.deleteRoomService(roomServiceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint để lấy tất cả RoomService
    @GetMapping
    public ResponseEntity<List<RoomServiceResponse>> findAll() {
        List<RoomServiceResponse> response = roomServiceService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Endpoint để lấy RoomService theo Room ID
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<RoomServiceRespone2>> findByRoomId(@PathVariable UUID roomId) {
        List<RoomServiceRespone2> response = roomServiceService.findByRoomId(roomId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
