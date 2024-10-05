package com.rrms.rrms.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ApiResponse;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.services.IAccountService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/profile")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProfileController {

    IAccountService accountService;

    @GetMapping()
    public ApiResponse<AccountResponse> getProfile(@RequestParam("username") String username) {
        AccountResponse accountResponse = accountService.findByUsername(username);
        return ApiResponse.<AccountResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get profile successfully")
                .result(accountResponse)
                .build();
    }

    @PutMapping()
    public ApiResponse<AccountResponse> updateProfile(@RequestBody AccountRequest accountRequest) {
        AccountResponse accountResponse = accountService.update(accountRequest);
        return ApiResponse.<AccountResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Update profile successfully")
                .result(accountResponse)
                .build();
    }
}
