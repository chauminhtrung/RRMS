package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.MotelServiceRequest;
import com.rrms.rrms.dto.response.MotelServiceResponse;
import com.rrms.rrms.services.IMotelServiceService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "Motel service Controller", description = "Controller for Motel service")
@RequestMapping("/motel-services")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class MotelServiceController {

    @Autowired
    private IMotelServiceService motelServiceService;

    // Tạo mới một MotelService
    @PostMapping
    public ResponseEntity<MotelServiceResponse> createMotelService(@RequestBody MotelServiceRequest request) {
        MotelServiceResponse response = motelServiceService.createMotelService(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-by-motel/{motelId}")
    public ResponseEntity<MotelServiceResponse> updateMotelServiceByIdMotel(
            @PathVariable UUID motelId, @RequestBody MotelServiceRequest request) {
        MotelServiceResponse updatedService = motelServiceService.updateMotelServiceById(motelId, request);
        return ResponseEntity.ok(updatedService);
    }

    // Cập nhật một MotelService
    @PutMapping("/{id}")
    public ResponseEntity<MotelServiceResponse> updateMotelService(
            @PathVariable UUID id, @RequestBody MotelServiceRequest request) {
        MotelServiceResponse response = motelServiceService.updateMotelService(id, request);
        return ResponseEntity.ok(response);
    }

    // Lấy tất cả các MotelService
    @GetMapping
    public ResponseEntity<List<MotelServiceResponse>> getAllMotelServices() {
        List<MotelServiceResponse> responses = motelServiceService.getAllMotelServices();
        return ResponseEntity.ok(responses);
    }

    // Lấy một MotelService theo ID
    @GetMapping("/{id}")
    public ResponseEntity<MotelServiceResponse> getMotelServiceById(@PathVariable UUID id) {
        MotelServiceResponse response = motelServiceService.getMotelServiceById(id);
        return ResponseEntity.ok(response);
    }

    // Xóa một MotelService theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMotelService(@PathVariable UUID id) {
        motelServiceService.deleteMotelService(id);
        return ResponseEntity.noContent().build();
    }
}
