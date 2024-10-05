package com.rrms.rrms.services;

import java.util.List;
import java.util.Optional;

import com.rrms.rrms.models.Account;

public interface AccountSer {
    List<Account> findAll();

    Optional<Account> findAccountsByUsername(String username);

    void save(Account acc);

    void deleteAcc(String username);

    Account updateAcc(String username, Account account);

    List<Account> findListAccountsByUsername(String username);

    List<Account> findAllByRole(String role);

    //  void loginOAuth2(OAuth2AuthenticationToken oAuth2Token);
}
