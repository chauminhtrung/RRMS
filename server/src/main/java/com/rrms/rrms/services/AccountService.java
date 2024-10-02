package com.rrms.rrms.services;

import org.springframework.stereotype.Service;

import com.rrms.rrms.repositories.AccountRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountService {

    AccountRepository accountRepository;
}
