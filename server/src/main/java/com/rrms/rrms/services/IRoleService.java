package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.RoleResponse;
import java.util.List;
import java.util.Optional;

import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Role;
import java.util.UUID;

public interface IRoleService {

    List<RoleResponse> GetAllRoles();

    RoleResponse createRole(RoleRequest roleRequest);

    RoleResponse updateRole(RoleRequest roleRequest);

    void deleteRole(UUID id);

    Optional<Role> findByRoleName(Roles roleName);
}
