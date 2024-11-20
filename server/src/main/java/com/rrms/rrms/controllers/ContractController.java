package com.rrms.rrms.controllers;

import java.util.UUID;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.services.IContractService;
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

import java.util.List;
import java.util.UUID;

@Tag(name = "Contract Controller", description = "Controller for Contract")
@RestController
@Slf4j
@RequestMapping("/contracts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class ContractController {

    @Autowired
    private IContractService contractService;

    // Tạo mới hợp đồng
    @PostMapping
    public ResponseEntity<ContractResponse> createContract(@RequestBody ContractRequest request) {
        ContractResponse response = contractService.createContract(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Lấy hợp đồng theo ID
    @GetMapping("/{contractId}")
    public ResponseEntity<ContractResponse> getContractById(@PathVariable UUID contractId) {
        ContractResponse response = contractService.getContractById(contractId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Cập nhật hợp đồng
    @PutMapping("/{contractId}")
    public ResponseEntity<ContractResponse> updateContract(
            @PathVariable UUID contractId, @RequestBody ContractRequest request) {
        ContractResponse response = contractService.updateContract(contractId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Xóa hợp đồng
    @DeleteMapping("/{contractId}")
    public ResponseEntity<Void> deleteContract(@PathVariable UUID contractId) {
        contractService.deleteContract(contractId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/motel/{motelId}")
    public ResponseEntity<List<ContractResponse>> getAllContractsByMotelId(@PathVariable UUID motelId) {
        List<ContractResponse> responses = contractService.getAllContractsByMotelId(motelId);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // Lấy hợp đồng theo ID
    @GetMapping("room/{roomId}")
    public ResponseEntity<ContractResponse> getContractByRoomId(@PathVariable UUID roomId) {
        ContractResponse response = contractService.getAllContractsByRoomId(roomId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
