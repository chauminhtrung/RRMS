package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.request.RegisterRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Account;

import java.util.List;
import java.util.Optional;

public interface IAccountService {
    List<AccountResponse> findAll();

    List<AccountResponse> getAccountsByRole(Roles role);

    List<AccountResponse> searchAccounts(String search, Roles role);

    Optional<Account> findAccountsByUsername(String username);

    Optional<Account> findByPhone(String phone);

    Optional<Account> findByEmail(String email);

    Account register(RegisterRequest request);

    Optional<Account> login(String phone, String password);

    AccountResponse createHostAccount(AccountRequest accountRequest);

    AccountResponse updateHostAccount(String username, AccountRequest accountRequest);

    void deleteAccount(String username);

    Account updateAcc(String username, Account account);

    AccountResponse findByUsername(String username);

    AccountResponse save(AccountRequest accountRequest);

    AccountResponse update(AccountRequest accountRequest);

    String changePassword(ChangePasswordRequest changePasswordRequest);

}
