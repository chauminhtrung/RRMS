package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rrms.rrms.models.Auth;

public interface AuthRepository extends JpaRepository<Auth, UUID> {
    void deleteByAccount_Username(String username);

    @Query(
            value = "SELECT COUNT(DISTINCT a.username) FROM Accounts a " + "JOIN Auths au ON a.username = au.username "
                    + "JOIN Roles r ON au.role_id = r.role_id "
                    + "WHERE r.role_name = 'host'",
            nativeQuery = true)
    Long countHostAccounts();
}
