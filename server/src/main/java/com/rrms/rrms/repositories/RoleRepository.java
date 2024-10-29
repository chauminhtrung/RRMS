package com.rrms.rrms.repositories;

import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByRoleName(Roles roleName);
}
