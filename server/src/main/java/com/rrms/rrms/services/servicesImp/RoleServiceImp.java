package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.RoleRequest;
import com.rrms.rrms.dto.response.RoleResponse;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.mapper.RoleMapper;
import com.rrms.rrms.models.Permission;
import com.rrms.rrms.models.Role;
import com.rrms.rrms.repositories.PermissionRepository;
import com.rrms.rrms.repositories.RoleRepository;
import com.rrms.rrms.services.IRoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleServiceImp implements IRoleService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    RoleMapper roleMapper;

    @Override
    public List<RoleResponse> GetAllRoles() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    @Override
    public RoleResponse createRole(RoleRequest roleRequest) {
        var role = roleMapper.toRole(roleRequest);

        // Tìm các permission bằng tên thay vì UUID
        Set<Permission> permissions = roleRequest.getPermissions().stream()
                .map(permissionName -> permissionRepository
                        .findByName(permissionName)
                        .orElseThrow(() -> new RuntimeException("Permission not found: " + permissionName)))
                .collect(Collectors.toSet());

        role.setPermissions(permissions);
        role.setDescription(roleRequest.getRoleDescription());

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    @Override
    public RoleResponse updateRole(RoleRequest roleRequest) {
        // Tìm Role theo ID
        Role existingRole = roleRepository
                .findById(roleRequest.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Roles roleEnum = Roles.valueOf(roleRequest.getRoleName());

        existingRole.setRoleName(roleEnum);
        existingRole.setDescription(roleRequest.getRoleDescription());

        // Lưu lại role đã cập nhật
        existingRole = roleRepository.save(existingRole);
        return roleMapper.toRoleResponse(existingRole);
    }

    @Override
    public void deleteRole(UUID id) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found");
        }
        roleRepository.deleteById(id);
    }

    @Override
    public Optional<Role> findByRoleName(Roles roleName) {
        return roleRepository.findByRoleName(roleName);
    }

    @Override
    public RoleResponse findById(UUID id) {
        return roleMapper.toRoleResponse(roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Role not found")));
    }
}
