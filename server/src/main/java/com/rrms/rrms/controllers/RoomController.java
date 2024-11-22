package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.RoomRequest2;
import com.rrms.rrms.dto.response.RoomResponse2;
import com.rrms.rrms.services.IRoom;

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
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class RoomController {

    IRoom roomService;

    // API tạo mới một phòng
    @PostMapping
    public ResponseEntity<RoomResponse2> createRoom2(@RequestBody RoomRequest2 roomRequest) {
        RoomResponse2 createdRoom = roomService.createRoom2(roomRequest);
        return ResponseEntity.ok(createdRoom);
    }

    // API lấy thông tin chi tiết phòng theo roomId
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse2> getRoomById2(@PathVariable UUID roomId) {
        RoomResponse2 roomDetail = roomService.getRoomById2(roomId);
        return ResponseEntity.ok(roomDetail);
    }

    // API lấy danh sách tất cả các phòng
    @GetMapping
    public ResponseEntity<List<RoomResponse2>> getAllRooms2() {
        List<RoomResponse2> rooms = roomService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    // API cập nhật thông tin phòng theo roomId
    @PutMapping("/{roomId}")
    public ResponseEntity<RoomResponse2> updateRoom2(@PathVariable UUID roomId, @RequestBody RoomRequest2 roomRequest) {
        RoomResponse2 updatedRoom = roomService.updateRoom2(roomId, roomRequest);
        return ResponseEntity.ok(updatedRoom);
    }

    // API xóa phòng theo roomId
    @DeleteMapping("/{roomId}")
    public ResponseEntity<String> deleteRoom2(@PathVariable UUID roomId) {
        roomService.deleteRoom2(roomId);
        return ResponseEntity.ok("Room deleted successfully.");
    }

    // API lấy danh sách phòng theo motelId
    @GetMapping("/motel/{motelId}")
    public ResponseEntity<List<RoomResponse2>> getRoomsByMotelId(@PathVariable UUID motelId) {
        List<RoomResponse2> rooms = roomService.getRoomsByMotelId(motelId);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/motel/W-Contract/{motelId}")
    public ResponseEntity<List<RoomResponse2>> getRoomsByMotelIdWContract(@PathVariable UUID motelId) {
        List<RoomResponse2> rooms = roomService.getRoomsByMotelIdNullContract(motelId);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/motel/Y-Contract/{motelId}")
    public ResponseEntity<List<RoomResponse2>> getRoomsByMotelIdContract(@PathVariable UUID motelId) {
        List<RoomResponse2> rooms = roomService.getRoomsByMotelIdContract(motelId);
        return ResponseEntity.ok(rooms);
    }
}
