package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.MotelServiceRequest;
import com.rrms.rrms.dto.request.MotelServiceUpdateRequest;
import com.rrms.rrms.dto.response.MotelServiceResponse;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.services.IMotelServiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    @PostMapping("/create")
    public ResponseEntity<MotelServiceResponse> createMotelService(@RequestBody MotelServiceRequest request) {
        MotelServiceResponse response = motelServiceService.createMotelService(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-by-motel/{motelId}")
    public ResponseEntity<MotelServiceResponse> updateMotelServiceByIdMotel(
            @PathVariable UUID motelId, @RequestBody MotelServiceUpdateRequest request) {
        MotelServiceResponse updatedService = motelServiceService.updateMotelServiceById(motelId, request);
        return ResponseEntity.ok(updatedService);
    }

    // Cập nhật một MotelService
    @PutMapping("/update/{id}")
    public ResponseEntity<MotelServiceResponse> updateMotelService(
            @PathVariable UUID id, @RequestBody MotelServiceUpdateRequest request) {
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
    @Operation(summary = "Delete an existing motelservice")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteMotelService(@PathVariable UUID id) {
        Map<String, Object> response = new HashMap<>();
        try {
            motelServiceService.deleteMotelService(id);
            response.put("status", true);
            response.put("message", "MotelService deleted successfully");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (AppException ex) {
            response.put("status", false);
            response.put("message", "Error deleting MotelService: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "MotelService deletion failed: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
