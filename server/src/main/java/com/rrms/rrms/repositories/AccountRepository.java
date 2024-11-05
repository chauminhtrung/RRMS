package com.rrms.rrms.repositories;

import com.rrms.rrms.enums.Roles;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);

    @Query("SELECT a FROM Account a JOIN a.authorities auth WHERE auth.role.roleName = :roleName")
    List<Account> findAllByAuthorities_Role_RoleName(@Param("roleName") Roles roleName);

    Optional<Account> findByPhone(String phone);

    Optional<Account> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByPhone(String phone);

    @Query("SELECT a FROM Account a JOIN a.authorities auth WHERE auth.role.roleName = :roleName AND " +
        "(LOWER(a.username) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
        "LOWER(a.fullname) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
        "LOWER(a.phone) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
        "LOWER(a.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
        "LOWER(a.cccd) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Account> searchAccounts(@Param("search") String search, @Param("roleName") Roles roleName);



}
