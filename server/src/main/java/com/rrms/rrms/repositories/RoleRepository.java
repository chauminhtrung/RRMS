package com.rrms.rrms.repositories;

import com.rrms.rrms.enums.Roles;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Role;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByRoleName(Roles roleName);
}
