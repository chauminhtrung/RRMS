package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.NameMotelServiceRequest;
import com.rrms.rrms.dto.response.NameMotelServiceResponse;
import com.rrms.rrms.services.INameMotelServiceService;

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


@RestController
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "name Motel service Controller", description = "Controller for name Motel service")
@RequestMapping("/name-motel-services")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class NameMotelServiceController {

    @Autowired
    private INameMotelServiceService nameMotelServiceService;

    // Tạo mới một NameMotelService
    @PostMapping
    public ResponseEntity<NameMotelServiceResponse> createNameMotelService(@RequestBody NameMotelServiceRequest request) {
        NameMotelServiceResponse response = nameMotelServiceService.createNameMotelService(request);
        return ResponseEntity.ok(response);
    }

    // Cập nhật một NameMotelService
    @PutMapping("/{id}")
    public ResponseEntity<NameMotelServiceResponse> updateNameMotelService(
            @PathVariable UUID id,
            @RequestBody NameMotelServiceRequest request) {
        NameMotelServiceResponse response = nameMotelServiceService.updateNameMotelService(id, request);
        return ResponseEntity.ok(response);
    }

    // Lấy tất cả các NameMotelService
    @GetMapping
    public ResponseEntity<List<NameMotelServiceResponse>> getAllNameMotelServices() {
        List<NameMotelServiceResponse> responses = nameMotelServiceService.getAllNameMotelServices();
        return ResponseEntity.ok(responses);
    }

    // Lấy một NameMotelService theo ID
    @GetMapping("/{id}")
    public ResponseEntity<NameMotelServiceResponse> getNameMotelServiceById(@PathVariable UUID id) {
        NameMotelServiceResponse response = nameMotelServiceService.getNameMotelServiceById(id);
        return ResponseEntity.ok(response);
    }

    // Xóa một NameMotelService theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNameMotelService(@PathVariable UUID id) {
        nameMotelServiceService.deleteNameMotelService(id);
        return ResponseEntity.noContent().build();
    }
}
