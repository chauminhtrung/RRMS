package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.services.ITenantService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/tenant")
public class TenantController {

    ITenantService tenantService;

    @RequestMapping("")
    public ApiResponse<List<TenantResponse>> getAllTenants() {
        List<TenantResponse> tenantResponses = tenantService.getAllTenants();
        log.info("Get all tenants successfully");
        return ApiResponse.<List<TenantResponse>>builder()
                .message("Get all tenants successfully")
                .code(HttpStatus.OK.value())
                .result(tenantResponses)
                .build();
    }

    @Operation(summary = "Get motel by id")
    @GetMapping("/tenant-id")
    public ApiResponse<TenantResponse> getMotelbyid(@RequestParam UUID id) {
        TenantResponse tennantResponse = tenantService.findById(id);
        return ApiResponse.<TenantResponse>builder()
                .code(HttpStatus.OK.value())
                .message("success")
                .result(tennantResponse)
                .build();
    }

    @Operation(summary = "Add tenant by id")
    @PostMapping("/insert")
    public ApiResponse<TenantResponse> insertTenant(@RequestBody TenantRequest tenantRequest) {
        TenantResponse tenantResponse = tenantService.insert(tenantRequest);
        log.info("Insert tenant successfully");
        return ApiResponse.<TenantResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("success")
                .result(tenantResponse)
                .build();
    }

    @Operation(summary = "Update tenant by id")
    @PutMapping("/{id}")
    public ApiResponse<TenantResponse> updateTenant(@PathVariable("id") UUID id, @RequestBody TenantRequest tenantRequest) {
        if (id != null && tenantRequest != null) {
            TenantResponse tenantResponse = tenantService.update(id, tenantRequest);
            log.info("Update tenant successfully");
            return ApiResponse.<TenantResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(tenantResponse)
                    .build();
        }
        log.error("Update tenant failed due to null id or tenantRequest");
        return ApiResponse.<TenantResponse>builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message("error")
                .result(null)
                .build();
    }


    @Operation(summary = "Delete tenant by id")
    @DeleteMapping("/{id}")
    public ApiResponse<Boolean> deleteTenant(@PathVariable("id") UUID id) {
        try {
            tenantService.delete(id);
            log.info("Delete tenant successfully");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("success")
                    .result(true)
                    .build();
        } catch (Exception e) {
            log.error("Delete tenant failed", e);
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }

}
