package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.configs.RedisRateLimiter;
import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoleResponse;
import com.rrms.rrms.services.IRoleService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Role Controller", description = "Controller for Role")
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RestController
@RequestMapping("/roles")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class RolesController {

    IRoleService roleService;
    RedisRateLimiter redisRateLimiter;

    @Cacheable(value = "role")
    @GetMapping("/getAllRole")
    public ApiResponse<List<RoleResponse>> getAllRole() {
        List<RoleResponse> roleResponse = roleService.GetAllRoles();
        try {
            log.info("Get all role successfully");
            return ApiResponse.<List<RoleResponse>>builder()
                    .message("Get all role successfully")
                    .code(HttpStatus.OK.value())
                    .result(roleResponse)
                    .build();
        } catch (Exception ex) {
            return ApiResponse.<List<RoleResponse>>builder()
                    .message("Get all role failed")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }

    @GetMapping("/getRole/{id}")
    @Cacheable(value = "role", key = "#id")
    public ApiResponse<RoleResponse> getRoleById(@PathVariable("id") UUID id) {
        try {
            RoleResponse roleResponse = roleService.findById(id);
            log.info("Get Role by id successfully");
            return ApiResponse.<RoleResponse>builder()
                    .message("Call api success")
                    .code(HttpStatus.OK.value())
                    .result(roleResponse)
                    .build();
        } catch (Exception ex) {
            log.error("Get role failed", ex);
            return ApiResponse.<RoleResponse>builder()
                    .message("Call api failed")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }

    @GetMapping("/getRole/noCache/{id}")
    public ApiResponse<RoleResponse> getRoleByIdNoCache(@PathVariable("id") UUID id) {
        try {
            RoleResponse roleResponse = roleService.findById(id);
            log.info("Get Role by id successfully");
            return ApiResponse.<RoleResponse>builder()
                    .message("Call api success")
                    .code(HttpStatus.OK.value())
                    .result(roleResponse)
                    .build();
        } catch (Exception ex) {
            log.error("Get role failed", ex);
            return ApiResponse.<RoleResponse>builder()
                    .message("Call api failed")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }

    @CacheEvict(value = "role", allEntries = true)
    @PostMapping("/createRole")
    public ApiResponse<RoleResponse> addRole(@RequestBody RoleRequest request) {
        try {
            RoleResponse roleResponse = roleService.createRole(request);
            log.info("Add role successfully: {}", roleResponse);
            return ApiResponse.<RoleResponse>builder()
                    .message("Role added successfully")
                    .code(HttpStatus.CREATED.value())
                    .result(roleResponse)
                    .build();
        } catch (Exception ex) {
            log.error("Add role failed", ex);
            return ApiResponse.<RoleResponse>builder()
                    .message("Failed to add role")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }

    @CachePut(value = "role", key = "#roleRequest.roleId")
    @PutMapping("/updateRole")
    public ApiResponse<RoleResponse> updateRole(@RequestBody RoleRequest roleRequest) {
        try {
            RoleResponse roleResponse = roleService.updateRole(roleRequest);
            log.info("Update role successfully: {}", roleResponse);
            return ApiResponse.<RoleResponse>builder()
                    .message("Role updated successfully")
                    .code(HttpStatus.OK.value())
                    .result(roleResponse)
                    .build();
        } catch (Exception ex) {
            log.error("Update role failed", ex);
            return ApiResponse.<RoleResponse>builder()
                    .message("Failed to update role")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }

    @CacheEvict(value = "role", key = "#id")
    @DeleteMapping("/deleteRole/{id}")
    public ApiResponse<Void> deleteRole(@PathVariable UUID id) {
        try {
            roleService.deleteRole(id);
            log.info("Delete role successfully for id: {}", id);
            return ApiResponse.<Void>builder()
                    .message("Role deleted successfully")
                    .code(HttpStatus.NO_CONTENT.value())
                    .result(null)
                    .build();
        } catch (Exception ex) {
            log.error("Delete role failed for id: {}", id, ex);
            return ApiResponse.<Void>builder()
                    .message("Failed to delete role")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .result(null)
                    .build();
        }
    }
}
