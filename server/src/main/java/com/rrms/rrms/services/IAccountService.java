package com.rrms.rrms.services;

import java.util.List;
import java.util.Optional;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.models.Account;

public interface IAccountService {
    List<Account> findAll();

    Optional<Account> findAccountsByUsername(String username);

    Optional<Account> findByPhone(String phone);

    Optional<Account> login(String phone, String password);

    void save(Account acc);

    void deleteAcc(String username);

    Account updateAcc(String username, Account account);

    List<Account> findListAccountsByUsername(String username);

    List<Account> findAllByRole(String role);

    AccountResponse findByUsername(String username);

    AccountResponse save(AccountRequest accountRequest);

    AccountResponse update(AccountRequest accountRequest);

    //  void loginOAuth2(OAuth2AuthenticationToken oAuth2Token);

    String changePassword(ChangePasswordRequest changePasswordRequest);
}
