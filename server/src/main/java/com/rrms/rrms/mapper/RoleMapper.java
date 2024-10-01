package com.rrms.rrms.mapper;

import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.RoleResponse;
import com.rrms.rrms.models.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}