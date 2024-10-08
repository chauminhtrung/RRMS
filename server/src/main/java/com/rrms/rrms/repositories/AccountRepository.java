package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rrms.rrms.models.Account;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);

    Optional<Account> findByPhoneAndPassword(String Phone, String password);

    @Query("SELECT a FROM Account a WHERE a.username like %:username%")
    List<Account> findAccountsByUsername(String username);
}
