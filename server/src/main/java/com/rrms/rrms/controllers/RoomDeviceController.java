package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomDeviceResponse;
import com.rrms.rrms.services.IRoomDeviceService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "RoomDevice Controller", description = "Controller for RoomDevice")
@RestController
@RequestMapping("/roomdevices")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class RoomDeviceController {

    IRoomDeviceService roomDeviceService;

    @Operation(summary = "insert roomDevice")
    @PostMapping()
    public ApiResponse<RoomDeviceResponse> insertRoomDevice(@RequestBody RoomDeviceRequest roomDeviceRequest) {
        RoomDeviceResponse roomDeviceResponse = roomDeviceService.insertRoomDevice(roomDeviceRequest);
        if (roomDeviceResponse != null) {
            log.info("Insert roomDevice successfully");
            return ApiResponse.<RoomDeviceResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(roomDeviceResponse)
                    .build();
        } else {
            log.info("Insert roomDevice failed");
            return ApiResponse.<RoomDeviceResponse>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(null)
                    .build();
        }
    }

    @Operation(summary = "delete roomDevice")
    @DeleteMapping("/{roomId}/{motel_device_id}")
    public ApiResponse<Boolean> deleteRoomDevice(
            @PathVariable("roomId") UUID roomId, @PathVariable("motel_device_id") UUID motel_device_id) {
        Boolean result = roomDeviceService.deleteByRoomAndAndMotelDevice(roomId, motel_device_id);
        if (result) {
            log.info("delete roomDevice successfully");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        } else {
            log.info("delete roomDevice failed");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }

    @Operation(summary = "getDeviceByRomId")
    @GetMapping("/{roomId}")
    public ApiResponse<List<RoomDeviceResponse>> getDeviceByRomId(@PathVariable("roomId") UUID roomId) {
        List<RoomDeviceResponse> getDeviceByRomId = roomDeviceService.getAllDeviceByRoomId(roomId);
        return ApiResponse.<List<RoomDeviceResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(getDeviceByRomId)
                .build();
    }

    @Operation(summary = "update quantity roomDevice")
    @PostMapping("/{roomId}/{motel_device_id}/{quantity}")
    public ApiResponse<Boolean> updateQuantityRoomDevice(
            @PathVariable("roomId") UUID roomId,
            @PathVariable("motel_device_id") UUID motel_device_id,
            @PathVariable("quantity") Integer quantity) {
        Boolean result = roomDeviceService.updateQuantity(roomId, motel_device_id, quantity);
        if (result) {
            log.info("update quantity roomDevice successfully");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        } else {
            log.info("update quantity roomDevice failed");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }
}
