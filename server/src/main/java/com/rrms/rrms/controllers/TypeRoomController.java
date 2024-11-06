package com.rrms.rrms.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.services.ITypeRoom;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Type Room Controller")
@RestController
@Slf4j
@RequestMapping("/type-rooms")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class TypeRoomController {
    ITypeRoom typeRoomService;

    @Operation(summary = "Create type room")
    @PostMapping
    public ApiResponse<TypeRoomResponse> createTypeRoom(@RequestBody TypeRoomRequest typeRoomRequest) {
        log.info("Create type room: {}", typeRoomRequest);
        return ApiResponse.<TypeRoomResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Create type room successfully")
                .result(typeRoomService.createTypeRoom(typeRoomRequest))
                .build();
    }

    @Operation(summary = "Get all type rooms")
    @GetMapping
    public ApiResponse<List<TypeRoomResponse>> findAllTypeRooms() {
        log.info("Get all type rooms");
        return ApiResponse.<List<TypeRoomResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Fetch all type rooms successfully")
                .result(typeRoomService.findAllTypeRooms())
                .build();
    }
}
