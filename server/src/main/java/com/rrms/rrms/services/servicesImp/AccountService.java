package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.AccountMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.services.IAccountService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountService implements IAccountService {

    AccountRepository accountRepository;
    AuthRepository authRepository;
    AccountMapper accountMapper;

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

    //    @Cacheable(value = "account", key = "#username")
    @Override
    public AccountResponse findByUsername(String username) {
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public AccountResponse save(AccountRequest accountRequest) {
        Account account = accountMapper.toAccount(accountRequest);
        account = accountRepository.save(account);
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public AccountResponse update(AccountRequest accountRequest) {
        Account account = accountRepository
                .findByUsername(accountRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        accountMapper.updateAccount(account, accountRequest);
        account = accountRepository.save(account);
        return accountMapper.toAccountResponse(account);
    }
}
