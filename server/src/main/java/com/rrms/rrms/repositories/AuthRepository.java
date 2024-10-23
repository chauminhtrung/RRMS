package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Auth;

public interface AuthRepository extends JpaRepository<Auth, UUID> {
    Auth findAuthorityByAccount_Username(String username);

}
