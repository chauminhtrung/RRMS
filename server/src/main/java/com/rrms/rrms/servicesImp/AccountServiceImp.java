package com.rrms.rrms.servicesImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.services.AccountSer;

@Service
public class AccountServiceImp implements AccountSer {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AuthRepository authRepository;

    @Override
    public List<Account> findAll() {
        return List.of();
    }

    @Override
    public Optional<Account> findAccountsByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public void save(Account acc) {
        accountRepository.save(acc);
    }

    @Override
    public void deleteAcc(String username) {
        Account acc = findAccountsByUsername(username).orElse(null);
        Auth au = authRepository.findAuthorityByAccount_Username(username);
        if (au.getRole().getRoleId().equals("CUST")) {
            accountRepository.delete(acc);
        }
    }

    @Override
    public Account updateAcc(String username, Account account) {
        return accountRepository.save(account);
    }

    @Override
    public List<Account> findListAccountsByUsername(String username) {
        return List.of();
    }

    @Override
    public List<Account> findAllByRole(String role) {
        return List.of();
    }
}
