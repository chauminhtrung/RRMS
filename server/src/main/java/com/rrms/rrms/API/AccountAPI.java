package com.rrms.rrms.API;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.ApiResponse;
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
public class AccountAPI {

    IAccountService accountService;

    @Operation(summary = "Get all account")
    @GetMapping("/get-all-account")
    public ResponseEntity<?> getAllAccount() {
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
            ex.printStackTrace();
            log.error("Get all account failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @Operation(summary = "Get account by username")
    @GetMapping("/get-account/{username}")
    public ResponseEntity<?> getAccount(@PathVariable String username) {
        Optional<Account> ac = accountService.findAccountsByUsername(username);
        if (ac.isPresent()) {
            log.info("Get account successfully: {}", username);
            return ResponseEntity.ok(ac);
        }
        log.error("Get account failed");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
    }

    @Operation(summary = "Get account by username")
    @GetMapping("/get-account")
    public ResponseEntity<?> getProductByIdManager(@RequestParam("username") String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findAccountsByUsername(username));
            log.info("Get account successfully: {}", username);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            ex.printStackTrace();
            log.error("Get account failed", ex);
        }
        return ResponseEntity.ok(rs);
    }

    @Operation(summary = "Delete account by username")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@RequestParam("username") String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            accountService.deleteAcc(username); // Gọi phương thức xóa sản phẩm
            rs.put("status", true);
            rs.put("message", "Account deleted successfully");
            rs.put("data", null); // Không có dữ liệu trả về
            log.info("Account deleted successfully: {}", username);
        } catch (EntityNotFoundException ex) {
            rs.put("status", false);
            rs.put("message", "Account not found");
            rs.put("data", null);
            log.error("Account not found", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã 404 nếu không tìm thấy
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed: " + ex.getMessage());
            rs.put("data", null);
            log.error("Delete account failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs); // Trả về mã 500 nếu có lỗi
        }
        return ResponseEntity.ok(rs);
    }

    @Operation(summary = "Update account by username")
    @PutMapping("/update-acc")
    public ResponseEntity<?> updateProduct(@RequestParam("username") String username, @RequestBody Account account) {
        Map<String, Object> rs = new HashMap<>();
        try {
            Account updateAcc = accountService.updateAcc(username, account);
            rs.put("status", true);
            rs.put("message", "Update product successful");
            rs.put("data", updateAcc);
            log.info("Update product successfully: {}", username);
            return ResponseEntity.ok(rs); // Trả về mã trạng thái 200 OK
        } catch (EntityNotFoundException ex) {
            rs.put("status", false);
            rs.put("message", "Account not found: " + ex.getMessage());
            rs.put("data", null);
            log.error("Account not found", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã trạng thái 404 Not Found
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Update Account failed: " + ex.getMessage());
            rs.put("data", null);
            log.error("Update Account failed", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs);
        }
    }

    @Operation(summary = "Get list account by username")
    @GetMapping("/get-ListaccountByUsername")
    public ResponseEntity<?> getListaccountByUsername(@RequestParam("username") String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findListAccountsByUsername(username));
            log.info("Get list account successfully: {}", username);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            ex.printStackTrace();
            log.error("Get list account failed", ex);
        }
        return ResponseEntity.ok(rs);
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
}
