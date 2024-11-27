package com.rrms.rrms.controllers;


import com.rrms.rrms.dto.request.ReserveAPlaceRequest;
import com.rrms.rrms.dto.response.ReserveAPlaceResponse;
import com.rrms.rrms.services.servicesImp.ReserveAPlaceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "reserve-a-place Controller", description = "Controller for reserve-a-place")
@RestController
@Slf4j
@RequestMapping("/reserve-a-place")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class ReserveAPlaceController {
    @Autowired
    private ReserveAPlaceService reserveAPlaceService;

    // Tạo mới một ReserveAPlace
    @PostMapping
    public ResponseEntity<ReserveAPlaceResponse> createReserveAPlace(@RequestBody ReserveAPlaceRequest request) {
        ReserveAPlaceResponse response = reserveAPlaceService.createReserveAPlace(request);
        return ResponseEntity.ok(response);
    }

    // Lấy thông tin một ReserveAPlace theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ReserveAPlaceResponse> getReserveAPlaceById(@PathVariable UUID id) {
        ReserveAPlaceResponse response = reserveAPlaceService.getReserveAPlaceById(id);
        return ResponseEntity.ok(response);
    }

    // Lấy danh sách tất cả các ReserveAPlace
    @GetMapping
    public ResponseEntity<List<ReserveAPlaceResponse>> getAllReserveAPlaces() {
        List<ReserveAPlaceResponse> responses = reserveAPlaceService.getAllReserveAPlaces();
        return ResponseEntity.ok(responses);
    }

    // Cập nhật thông tin ReserveAPlace theo ID
    @PutMapping("/{id}")
    public ResponseEntity<ReserveAPlaceResponse> updateReserveAPlace(
            @PathVariable UUID id,
            @RequestBody ReserveAPlaceRequest request) {
        ReserveAPlaceResponse response = reserveAPlaceService.updateReserveAPlace(id, request);
        return ResponseEntity.ok(response);
    }

    // Xóa một ReserveAPlace theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserveAPlace(@PathVariable UUID id) {
        reserveAPlaceService.deleteReserveAPlace(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<ReserveAPlaceResponse>> getReserveAPlacesByRoomId(@PathVariable UUID roomId) {
        List<ReserveAPlaceResponse> responses = reserveAPlaceService.getReserveAPlacesByRoomId(roomId);
        return ResponseEntity.ok(responses);
    }
}
