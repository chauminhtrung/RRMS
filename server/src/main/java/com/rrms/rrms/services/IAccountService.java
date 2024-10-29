package com.rrms.rrms.services;

import com.rrms.rrms.dto.request.RegisterRequest;
import java.util.List;
import java.util.Optional;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.models.Account;

public interface IAccountService {
    List<AccountResponse> findAll();

    Optional<Account> findAccountsByUsername(String username);

    Optional<Account> findByPhone(String phone);

    Optional<Account> findByEmail(String email);

    Account register(RegisterRequest request);

    Optional<Account> login(String phone, String password);

    void save(Account acc);

    void deleteAcc(String username);

    Account updateAcc(String username, Account account);

    AccountResponse findByUsername(String username);

    AccountResponse save(AccountRequest accountRequest);

    AccountResponse update(AccountRequest accountRequest);

    //  void loginOAuth2(OAuth2AuthenticationToken oAuth2Token);

    String changePassword(ChangePasswordRequest changePasswordRequest);
}
