package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.request.PermissionRequest;
import com.rrms.rrms.dto.response.PermissionResponse;

public interface IPermissionService {

    List<PermissionResponse> getAllPermissions();

    PermissionResponse createPermission(PermissionRequest permissionRequest);

    PermissionResponse updatePermission(PermissionRequest permissionRequest);

    void deletePermission(UUID id);

    PermissionResponse getPermissionById(Long Long);
}
