package com.rrms.rrms.API;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.AccountSer;

@RestController
@RequestMapping("/api-accounts")
public class AccountAPI {
    @Autowired
    AccountSer accountService;

    //    @Autowired
    //    private PasswordEncoder passwordEncoder;

    @GetMapping("/get-all-account")
    public ResponseEntity<?> getAllAccount() {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findAll());
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
            ex.printStackTrace();
        }
        return ResponseEntity.ok(rs);
    }

    @GetMapping("/get-account/{username}")
    public ResponseEntity<?> getAccount(@PathVariable String username) {
        Optional<Account> ac = accountService.findAccountsByUsername(username);
        // Lấy danh sách giỏ hàng theo tên người dùng
        if (ac.isPresent()) {
            return ResponseEntity.ok(ac);
        }
        // Trả về mã trạng thái HTTP 404 (Not Found) và thông báo lỗi tương ứng
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
    }

    @GetMapping("/get-account")
    public ResponseEntity<?> getProductByIdManager(@RequestParam("username") String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findAccountsByUsername(username));
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
        }
        return ResponseEntity.ok(rs);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@RequestParam("username") String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            accountService.deleteAcc(username); // Gọi phương thức xóa sản phẩm
            rs.put("status", true);
            rs.put("message", "Account deleted successfully");
            rs.put("data", null); // Không có dữ liệu trả về
        } catch (EntityNotFoundException ex) {
            rs.put("status", false);
            rs.put("message", "Account not found");
            rs.put("data", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã 404 nếu không tìm thấy
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed: " + ex.getMessage());
            rs.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs); // Trả về mã 500 nếu có lỗi
        }
        return ResponseEntity.ok(rs); // Trả về mã 200 cho thành công
    }

    @PutMapping("/update-acc")
    public ResponseEntity<?> updateProduct(@RequestParam("username") String username, @RequestBody Account account) {
        Map<String, Object> rs = new HashMap<>();
        //    var bCrypt = new BCryptPasswordEncoder();
        //    account.setPassword(bCrypt.encode(account.getPassword()));
        try {
            Account updateAcc = accountService.updateAcc(username, account);
            rs.put("status", true);
            rs.put("message", "Update product successful");
            rs.put("data", updateAcc);
            return ResponseEntity.ok(rs); // Trả về mã trạng thái 200 OK
        } catch (EntityNotFoundException ex) {
            rs.put("status", false);
            rs.put("message", "Account not found: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã trạng thái 404 Not Found
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Update Account failed: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(rs); // Trả về mã trạng thái 500 Internal Server Error
        }
    }

    @GetMapping("/get-ListaccountByUsername")
    public ResponseEntity<?> getListaccountByUsername(@RequestParam("username") String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            rs.put("status", true);
            rs.put("message", "Call api success");
            rs.put("data", accountService.findListAccountsByUsername(username));
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call api failed");
            rs.put("data", null);
        }
        return ResponseEntity.ok(rs);
    }

    //    @PostMapping("/login")
    //    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
    //        Map<String, Object> response = new HashMap<>();
    //        String username = loginRequest.get("username");
    //        String password = loginRequest.get("password");
    //
    //        // Kiểm tra đầu vào
    //        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
    //            response.put("status", false);
    //            response.put("message", "Username và password không được để trống");
    //            return ResponseEntity.badRequest().body(response);
    //        }
    //
    //        try {
    //            // Tìm tài khoản theo username
    //            Optional<Account> accountOptional = accountService.findAccountsByUsername(username);
    //
    //            if (accountOptional.isPresent()) {
    //                Account account = accountOptional.get();
    //                // Kiểm tra mật khẩu
    //                if (passwordEncoder.matches(password, account.getPassword())) {
    //                    // Tạo token JWT
    //                    //                    String token = jwtTokenProvider.generateToken(account); // Giả sử bạn đã
    // có
    //                    // một JwtTokenProvider
    //
    //                    response.put("status", true);
    //                    response.put("message", "Đăng nhập thành công");
    //                    response.put("data", account);
    //                    //                    response.put("token", token);
    //
    //                    return ResponseEntity.ok(response);
    //                } else {
    //                    response.put("status", false);
    //                    response.put("message", "Tài khoản hoặc mật khẩu không đúng");
    //                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    //                }
    //            } else {
    //                response.put("status", false);
    //                response.put("message", "Tài khoản không tồn tại");
    //                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    //            }
    //        } catch (Exception e) {
    //            response.put("status", false);
    //            response.put("message", "Lỗi hệ thống: " + e.getMessage());
    //            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    //        }
    //    }
}
