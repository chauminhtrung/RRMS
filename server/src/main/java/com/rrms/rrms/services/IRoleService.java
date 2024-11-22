package com.rrms.rrms.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.RoleResponse;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Role;

public interface IRoleService {

    List<RoleResponse> GetAllRoles();

    RoleResponse createRole(RoleRequest roleRequest);

    RoleResponse updateRole(RoleRequest roleRequest);

    void deleteRole(UUID id);

    Optional<Role> findByRoleName(Roles roleName);

    RoleResponse findById(UUID id);
}
