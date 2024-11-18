package com.rrms.rrms.controllers;


import com.rrms.rrms.services.IContractDeviceService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.ContractDeviceRequest;
import com.rrms.rrms.dto.response.ContractDeviceResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "contract-device Controller", description = "Controller for contract-device")
@RestController
@Slf4j
@RequestMapping("/contract-device")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class ContractDeviceController {
    private final IContractDeviceService contractDeviceService;

    @PostMapping
    public ResponseEntity<ContractDeviceResponse> createContractDevice(@RequestBody ContractDeviceRequest request) {
        ContractDeviceResponse response = contractDeviceService.createContractDevice(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractDeviceResponse> updateContractDevice(
            @PathVariable("id") UUID contractDeviceId,
            @RequestBody ContractDeviceRequest request) {
        ContractDeviceResponse response = contractDeviceService.updateContractDevice(contractDeviceId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContractDevice(@PathVariable("id") UUID contractDeviceId) {
        contractDeviceService.deleteContractDevice(contractDeviceId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractDeviceResponse> getContractDeviceById(@PathVariable("id") UUID contractDeviceId) {
        ContractDeviceResponse response = contractDeviceService.getContractDeviceById(contractDeviceId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ContractDeviceResponse>> getAllContractDevices() {
        List<ContractDeviceResponse> responses = contractDeviceService.getAllContractDevices();
        return ResponseEntity.ok(responses);
    }
}
