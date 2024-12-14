package com.rrms.rrms.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.IAccountService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Account Controller", description = "Controller for Account")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api-accounts")
public class AccountController {
    IAccountService accountService;

    @Operation(summary = "Get all account")
    @GetMapping("/get-all-account")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<?> getAllAccount() {
        var authen = SecurityContextHolder.getContext().getAuthentication();

        log.info("Get all account {}", authen.getName());
        authen.getAuthorities()
                .forEach(grantedAuthority -> log.info("GrantedAuthority: {}", grantedAuthority.getAuthority()));
        log.info("In method get Admin");

        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findAll());
            log.info("Get all account successfully");
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            log.error("Get all account failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @GetMapping("/by-host-role")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<?> getAccountsByHostRole() {
        Map<String, Object> rs = new HashMap<>();
        try {
            List<AccountResponse> accountResponses = accountService.getAccountsByRole(Roles.HOST);
            if (!accountResponses.isEmpty()) { // Check if the list is not empty
                rs.put("status", true);
                rs.put("message", "Call api success");
                rs.put("data", accountResponses); // Directly send the list
            } else {
                rs.put("status", false);
                rs.put("message", "No accounts found for HOST role");
                rs.put("data", null);
            }
            log.info("Get accounts by HOST role successfully");
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            log.error("Get accounts by HOST role failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @Operation(summary = "Get account by username")
    @GetMapping("/{username}")
    @PostAuthorize("returnObject.body.phone == authentication.name")
    public ResponseEntity<?> getAccountByUsername(@PathVariable String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            AccountResponse account = accountService.findByUsername(username);
            rs.put("status", true);
            rs.put("message", "Call API success");
            rs.put("data", account);
            log.info("Get account by Username successfully");
            return ResponseEntity.ok(account);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call API failed");
            rs.put("data", null);
            log.error("Get account by Username failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs);
        }
    }

    @PostMapping("/createAccount")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<?> createAccount(@RequestBody AccountRequest accountRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            AccountResponse accountResponse = accountService.createAccount(accountRequest);
            response.put("status", true);
            response.put("message", "Account created successfully");
            response.put("data", accountResponse);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (AppException ex) {
            response.put("status", false);
            response.put("message", "Error creating account: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Account creation failed: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Update an existing host account")
    @PutMapping("/updateAccount/{username}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<Map<String, Object>> updateAccount(
            @PathVariable String username, @RequestBody AccountRequest accountRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            AccountResponse accountResponse = accountService.updateAccount(username, accountRequest);
            response.put("status", true);
            response.put("message", "Account updated successfully");
            response.put("data", accountResponse);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (AppException ex) {
            response.put("status", false);
            response.put("message", "Error updating account: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Account update failed: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Delete an existing account")
    @DeleteMapping("/deleteAccount/{username}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<Map<String, Object>> deleteAccount(@PathVariable String username) {
        Map<String, Object> response = new HashMap<>();
        try {
            accountService.deleteAccount(username);
            response.put("status", true);
            response.put("message", "Account deleted successfully");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (AppException ex) {
            response.put("status", false);
            response.put("message", "Error deleting account: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Account deletion failed: " + ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Update account by username")
    @PutMapping("/update-acc")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<?> updateAccount(@RequestParam("username") String username, @RequestBody Account account) {
        Map<String, Object> rs = new HashMap<>();
        try {
            Account updateAcc = accountService.updateAcc(username, account);
            rs.put("status", true);
            rs.put("message", "Update product successful");
            rs.put("data", updateAcc);
            log.info("Update product successfully: {}", username);
            return ResponseEntity.ok(rs);
        } catch (EntityNotFoundException ex) {
            rs.put("status", false);
            rs.put("message", "Account not found: " + ex.getMessage());
            rs.put("data", null);
            log.error("Account not found", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Update Account failed: " + ex.getMessage());
            rs.put("data", null);
            log.error("Update Account failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs);
        }
    }

    @Operation(summary = "Get profile by username")
    @GetMapping("/profile")
    public ApiResponse<AccountResponse> getProfile(@RequestParam("username") String username) {
        AccountResponse accountResponse = accountService.findByUsername(username);
        log.info("Get profile successfully");
        return ApiResponse.<AccountResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Get profile successfully")
                .result(accountResponse)
                .build();
    }

    @Operation(summary = "Update profile by username")
    @PutMapping("/profile")
    public ApiResponse<AccountResponse> updateProfile(@RequestBody AccountRequest accountRequest) {
        AccountResponse accountResponse = accountService.update(accountRequest);
        log.info("Update profile successfully");
        return ApiResponse.<AccountResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Update profile successfully")
                .result(accountResponse)
                .build();
    }

    @Operation(summary = "Change password by username")
    @PutMapping("/profile/change-password")
    public ApiResponse<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        String changePassword = accountService.changePassword(changePasswordRequest);
        log.info("Change password successfully");
        return ApiResponse.<String>builder()
                .code(HttpStatus.OK.value())
                .message("Change password successfully")
                .result(changePassword)
                .build();
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
    public ResponseEntity<?> searchAccounts(@RequestParam(required = false) String search) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<AccountResponse> accounts;
            if (search == null || search.trim().isEmpty()) {
                accounts = accountService.findAll();
            } else {
                accounts = accountService.searchAccounts(search.toLowerCase());
            }

            if (!accounts.isEmpty()) {
                response.put("status", true);
                response.put("message", "Search results found");
                response.put("data", accounts);
            } else {
                response.put("status", false);
                response.put("message", "No accounts found matching the criteria");
                response.put("data", null);
            }
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Search operation failed");
            response.put("data", null);
            ex.printStackTrace();
        }
        return ResponseEntity.ok(response);
    }
}
