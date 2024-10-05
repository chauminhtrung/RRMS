package com.rrms.rrms.services;

import com.rrms.rrms.models.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findRoleByName(final String name);
}
