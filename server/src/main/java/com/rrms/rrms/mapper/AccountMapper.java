package com.rrms.rrms.mapper;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.models.Account;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toAccount(AccountRequest request);

    @Mapping(target = "role", source = "account", qualifiedByName = "mapRole")
    @Mapping(target = "permissions", source = "account", qualifiedByName = "mapPermissions") // New mapping for permissions
    AccountResponse toAccountResponse(Account account);

    @Mapping(target = "password", ignore = true)
    void updateAccount(@MappingTarget Account user, AccountRequest request);

    @Named("mapRole")
    default List<String> mapRole(Account account) {
        if (account.getAuthorities() != null && !account.getAuthorities().isEmpty()) {
            return account.getAuthorities().stream()
                .map(auth -> auth.getRole().getRoleName().name())
                .collect(Collectors.toList());
        }
        return null;
    }

    // New method to map permissions from roles
    @Named("mapPermissions")
    default List<String> mapPermissions(Account account) {
        if (account.getAuthorities() != null && !account.getAuthorities().isEmpty()) {
            return account.getAuthorities().stream()
                .flatMap(auth -> auth.getRole().getPermissions().stream())
                .map(permission -> permission.getName())
                .distinct()
                .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}

