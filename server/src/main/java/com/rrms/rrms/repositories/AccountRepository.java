package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Account;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);

    @Query("SELECT a FROM Account a WHERE a.username like %:username%")
    List<Account> findListAccountsByUsername(String username);
}
