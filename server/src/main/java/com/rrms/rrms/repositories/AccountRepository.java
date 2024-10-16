package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);

    Optional<Account> findByPhoneAndPassword(String Phone, String password);

    @Query("SELECT a FROM Account a WHERE a.username like %:username%")
    List<Account> findAccountsByUsername(String username);
}
