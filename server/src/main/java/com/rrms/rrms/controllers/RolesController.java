package com.rrms.rrms.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.RoleRequest;
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
public class RolesController {

    @Autowired
    IRoleService roleService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/getAllRole")
    public ResponseEntity<?> getAllRole() {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", roleService.GetAllRoles());
            log.info("Get all role successfully");
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            log.error("Get all role failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @PostMapping("/createRole")
    public ResponseEntity<?> addRole(@RequestBody RoleRequest request) {
        Map<String, Object> rs = new HashMap<>();
        try {
            RoleResponse roleResponse = roleService.createRole(request);
            rs.put("status", true);
            rs.put("message", "Role added successfully");
            rs.put("data", roleResponse);
            log.info("Add role successfully: {}", roleResponse);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Failed to add role");
            rs.put("data", null);
            log.error("Add role failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @PutMapping("/updateRole")
    public ResponseEntity<?> updateRole(@RequestBody RoleRequest roleRequest) {
        Map<String, Object> rs = new HashMap<>();
        try {
            RoleResponse roleResponse = roleService.updateRole(roleRequest);

            rs.put("status", true);
            rs.put("message", "Role updated successfully");
            rs.put("data", roleResponse);
            log.info("Update role successfully: {}", roleResponse);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Failed to update role");
            rs.put("data", null);
            log.error("Update role failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @DeleteMapping("/deleteRole/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable UUID id) {
        Map<String, Object> rs = new HashMap<>();
        try {
            roleService.deleteRole(id);
            rs.put("status", true);
            rs.put("message", "Role deleted successfully");
            log.info("Delete role successfully for id: {}", id);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Failed to delete role");
            log.error("Delete role failed for id: {}", id, ex);
        }
        return ResponseEntity.ok(rs);
    }
}
