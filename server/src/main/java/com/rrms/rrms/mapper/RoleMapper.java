package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.RoleResponse;
import com.rrms.rrms.models.Role;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "description", source = "roleDescription")
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    @Mapping(target = "roleDescription", source = "description")
    @Mapping(target = "roleId", source = "roleId")
    RoleResponse toRoleResponse(Role role);
}

