package com.rrms.rrms.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.PermissionRequest;
import com.rrms.rrms.dto.response.PermissionResponse;
import com.rrms.rrms.services.IPermissionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Permission Controller", description = "Controller for Permission")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/permissions")
public class PermissionController {

    IPermissionService permissionService;

    @GetMapping("/getAllPermission")
    public ResponseEntity<?> getAllPermission() {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", permissionService.getAllPermissions());
            log.info("Get all permission successfully");
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            log.error("Get all permission failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @PostMapping("/createPermission")
    public ResponseEntity<?> addPermission(@RequestBody PermissionRequest request) {
        Map<String, Object> rs = new HashMap<>();
        try {
            PermissionResponse permissionResponse = permissionService.createPermission(request);
            rs.put("status", true);
            rs.put("message", "Permission added successfully");
            rs.put("data", permissionResponse);
            log.info("Add permission successfully: {}", permissionResponse);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Failed to add permission");
            rs.put("data", null);
            log.error("Add permission failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @PutMapping("/updatePermission")
    public ResponseEntity<?> updatePermission(@RequestBody PermissionRequest permissionRequest) {
        Map<String, Object> rs = new HashMap<>();
        try {
            PermissionResponse updatedPermission = permissionService.updatePermission(permissionRequest);

            rs.put("status", true);
            rs.put("message", "Permission updated successfully");
            rs.put("data", updatedPermission);
            log.info("Update permission successfully: {}", updatedPermission);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Failed to update permission");
            rs.put("data", null);
            log.error("Update permission failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    // DELETE delete permission
    @DeleteMapping("/deletePermission/{id}")
    public ResponseEntity<?> deletePermission(@PathVariable UUID id) {
        Map<String, Object> rs = new HashMap<>();
        try {
            permissionService.deletePermission(id);
            rs.put("status", true);
            rs.put("message", "Permission deleted successfully");
            log.info("Delete permission successfully for id: {}", id);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Failed to delete permission");
            log.error("Delete permission failed for id: {}", id, ex);
        }
        return ResponseEntity.ok(rs);
    }
}
