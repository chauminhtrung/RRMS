package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.models.Account;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toAccount(AccountRequest request);

    AccountResponse toAccountResponse(Account account);

    @Mapping(target = "password", ignore = true)
    void updateAccount(@MappingTarget Account user, AccountRequest request);
}
