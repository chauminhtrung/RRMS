package com.rrms.rrms.services;

import com.rrms.rrms.models.Role;

import java.util.List;
import java.util.Optional;

public interface IRoleService {

    List<Role> findAll();
    Optional<Role> findRoleByName( String name);
}
