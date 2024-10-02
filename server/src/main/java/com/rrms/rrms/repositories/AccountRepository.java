package com.rrms.rrms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Account;

public interface AccountRepository extends JpaRepository<Account, String> {}
