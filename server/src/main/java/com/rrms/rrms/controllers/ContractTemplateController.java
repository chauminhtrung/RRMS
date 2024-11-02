package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.ContractTemplateRequest;
import com.rrms.rrms.dto.response.ContractTemplateRespone;
import com.rrms.rrms.services.IContractTemplateService;
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

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "ContractTemplate Controller", description = "Controller for ContractTemplate")
@RestController
@RequestMapping("/contract-templates")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class ContractTemplateController {

    @Autowired
    private IContractTemplateService contractTemplateService;

    // Tạo mới một Contract Template
    @PostMapping
    public ResponseEntity<ContractTemplateRespone> createContractTemplate(@RequestBody ContractTemplateRequest request) {
        ContractTemplateRespone response = contractTemplateService.createContractTemplate(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Lấy thông tin của một Contract Template theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ContractTemplateRespone> getContractTemplateById(@PathVariable UUID id) {
        ContractTemplateRespone response = contractTemplateService.getContractTemplateById(id);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    // Lấy danh sách tất cả Contract Templates
    @GetMapping
    public ResponseEntity<List<ContractTemplateRespone>> getAllContractTemplates() {
        List<ContractTemplateRespone> responses = contractTemplateService.getAllContractTemplates();
        return ResponseEntity.ok(responses);
    }

    // Lấy danh sách Contract Templates theo Motel ID
    @GetMapping("/motel/{motelId}")
    public ResponseEntity<List<ContractTemplateRespone>> getContractTemplatesByMotelId(@PathVariable UUID motelId) {
        List<ContractTemplateRespone> responses = contractTemplateService.getContractTemplatesByMotelId(motelId);
        return ResponseEntity.ok(responses);
    }

    // Cập nhật thông tin của một Contract Template
    @PutMapping("/{id}")
    public ResponseEntity<ContractTemplateRespone> updateContractTemplate(
            @PathVariable UUID id,
            @RequestBody ContractTemplateRequest request) {
        ContractTemplateRespone response = contractTemplateService.updateContractTemplate(id, request);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    // Xóa một Contract Template theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContractTemplate(@PathVariable UUID id) {
        contractTemplateService.deleteContractTemplate(id);
        return ResponseEntity.noContent().build();
    }
}
