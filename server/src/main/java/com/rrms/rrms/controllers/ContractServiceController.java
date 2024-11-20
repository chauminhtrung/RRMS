package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.ContractServiceRequest;
import com.rrms.rrms.dto.response.ContractServiceResponse;
import com.rrms.rrms.services.IContractServiceService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "contract-service Controller", description = "Controller for contract-service")
@RestController
@Slf4j
@RequestMapping("/contract-service")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class ContractServiceController {
    private final IContractServiceService contractServiceService;

    @PostMapping
    public ResponseEntity<ContractServiceResponse> createContractService(@RequestBody ContractServiceRequest request) {
        ContractServiceResponse response = contractServiceService.createContractService(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContractServiceResponse> updateContractService(
            @PathVariable("id") UUID contractServiceId, @RequestBody ContractServiceRequest request) {
        ContractServiceResponse response = contractServiceService.updateContractService(contractServiceId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContractService(@PathVariable("id") UUID contractServiceId) {
        contractServiceService.deleteContractService(contractServiceId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractServiceResponse> getContractServiceById(@PathVariable("id") UUID contractServiceId) {
        ContractServiceResponse response = contractServiceService.getContractServiceById(contractServiceId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ContractServiceResponse>> getAllContractServices() {
        List<ContractServiceResponse> responses = contractServiceService.getAllContractServices();
        return ResponseEntity.ok(responses);
    }
}
