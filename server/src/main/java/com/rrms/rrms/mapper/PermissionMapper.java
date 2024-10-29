package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.PermissionRequest;
import com.rrms.rrms.dto.response.PermissionResponse;
import com.rrms.rrms.models.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
