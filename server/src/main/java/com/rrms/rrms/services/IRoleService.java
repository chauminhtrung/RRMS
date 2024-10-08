package com.rrms.rrms.services;

import java.util.List;
import java.util.Optional;

import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Role;

public interface IRoleService {

    List<Role> findAll();

    Optional<Role> findRoleByName(Roles roleName);
}
