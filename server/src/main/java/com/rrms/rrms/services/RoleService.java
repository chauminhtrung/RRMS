package com.rrms.rrms.services;

import java.util.List;
import java.util.Optional;

import com.rrms.rrms.models.Role;

public interface RoleService {
    List<Role> findAll();

    Optional<Role> findRoleByName(String roleName);
}
