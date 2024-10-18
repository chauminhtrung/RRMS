package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.response.LoginResponse;
import jakarta.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.Role;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IRoleService;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AccountController {
    @Autowired
    IAccountService accountService;

    @Autowired
    IAuthorityService authorityService;

    @Autowired
    IRoleService roleService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Account> accountOptional = accountService.findByPhone(loginRequest.getPhone());

            if (accountOptional.isEmpty()) {
                response.put("status", false);
                response.put("message", "Tài khoản không tồn tại.");
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Account account = accountOptional.get();
            Optional<Account> passwordMatchingAccount = accountService.login(loginRequest.getPhone(), loginRequest.getPassword());

            if (passwordMatchingAccount.isPresent()) {
                LoginResponse loginResponse = new LoginResponse(account.getUsername(),account.getFullname(),account.getPhone(),account.getEmail(),account.getAvatar(),account.getBirthday(),account.getGender(),account.getCccd());
                response.put("status", true);
                response.put("message", "Đăng nhập thành công.");
                response.put("data", loginResponse);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", false);
                response.put("message", "Sai mật khẩu.");
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi khi thực hiện đăng nhập.");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Account account, BindingResult bindingResult) {
        Optional<Account> existingAccount = accountService.findAccountsByUsername(account.getUsername());
        if (existingAccount.isPresent()) {
            return ResponseEntity.badRequest().body("Tên người dùng đã được sử dụng");
        }

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            Account newAccount = new Account();
            newAccount.setUsername(account.getUsername());
            newAccount.setPassword(account.getPassword());
            newAccount.setPhone(account.getPhone());
            newAccount.setFullname(account.getFullname());
            newAccount.setEmail(account.getEmail());
            newAccount.setBirthday(account.getBirthday());
            newAccount.setGender(account.getGender());
            newAccount.setCccd(account.getCccd());
            accountService.save(newAccount);

            // Convert string to enum
            Roles roleEnum = Roles.valueOf("CUSTOMER");

            // Find role and create auth
            Optional<Role> existingRole = roleService.findRoleByName(roleEnum);
            if (!existingRole.isPresent()) {
                return ResponseEntity.badRequest().body("Role does not exist.");
            }

            Auth authority = new Auth();
            authority.setAccount(newAccount);
            authority.setRole(existingRole.get());
            //            authorityService.save(authority);

            return ResponseEntity.ok().body("Register successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role name provided: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @GetMapping("/get-all-account")
//    public ResponseEntity<?> getAllAccount() {
//        Map<String, Object> rs = new HashMap<>();
//        try {
//            rs.put("status", true);
//            rs.put("message", "Call api success");
//            rs.put("data", accountService.findAll());
//        } catch (Exception ex) {
//            rs.put("status", false);
//            rs.put("message", "Call api failed");
//            rs.put("data", null);
//            ex.printStackTrace();
//        }
//        return ResponseEntity.ok(rs);
//    }
//
//    @GetMapping("/get-account/{username}")
//    public ResponseEntity<?> getAccount(@PathVariable String username) {
//        Optional<Account> ac = accountService.findAccountsByUsername(username);
//        if (ac.isPresent()) {
//            return ResponseEntity.ok(ac);
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Call api failed");
//    }
//
//    @GetMapping("/get-account")
//    public ResponseEntity<?> getProductByIdManager(@RequestParam("username") String username) {
//        Map<String, Object> rs = new HashMap<>();
//        try {
//            rs.put("status", true);
//            rs.put("message", "Call api success");
//            rs.put("data", accountService.findAccountsByUsername(username));
//        } catch (Exception ex) {
//            rs.put("status", false);
//            rs.put("message", "Call api failed");
//            rs.put("data", null);
//        }
//        return ResponseEntity.ok(rs);
//    }
//
//    @DeleteMapping("/delete")
//    public ResponseEntity<?> deleteAccount(@RequestParam("username") String username) {
//        Map<String, Object> rs = new HashMap<>();
//        try {
//            accountService.deleteAcc(username); // Gọi phương thức xóa sản phẩm
//            rs.put("status", true);
//            rs.put("message", "Account deleted successfully");
//            rs.put("data", null); // Không có dữ liệu trả về
//        } catch (EntityNotFoundException ex) {
//            rs.put("status", false);
//            rs.put("message", "Account not found");
//            rs.put("data", null);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã 404 nếu không tìm thấy
//        } catch (Exception ex) {
//            rs.put("status", false);
//            rs.put("message", "Call api failed: " + ex.getMessage());
//            rs.put("data", null);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs); // Trả về mã 500 nếu có lỗi
//        }
//        return ResponseEntity.ok(rs);
//    }
//
//    @PutMapping("/update-acc")
//    public ResponseEntity<?> updateProduct(@RequestParam("username") String username, @RequestBody Account account) {
//        Map<String, Object> rs = new HashMap<>();
//        try {
//            Account updateAcc = accountService.updateAcc(username, account);
//            rs.put("status", true);
//            rs.put("message", "Update product successful");
//            rs.put("data", updateAcc);
//            return ResponseEntity.ok(rs); // Trả về mã trạng thái 200 OK
//        } catch (EntityNotFoundException ex) {
//            rs.put("status", false);
//            rs.put("message", "Account not found: " + ex.getMessage());
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(rs); // Trả về mã trạng thái 404 Not Found
//        } catch (Exception ex) {
//            rs.put("status", false);
//            rs.put("message", "Update Account failed: " + ex.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rs);
//        }
//    }
//
//    @GetMapping("/get-ListaccountByUsername")
//    public ResponseEntity<?> getListaccountByUsername(@RequestParam("username") String username) {
//        Map<String, Object> rs = new HashMap<>();
//        try {
//            rs.put("status", true);
//            rs.put("message", "Call api success");
//            rs.put("data", accountService.findListAccountsByUsername(username));
//        } catch (Exception ex) {
//            rs.put("status", false);
//            rs.put("message", "Call api failed");
//            rs.put("data", null);
//        }
//        return ResponseEntity.ok(rs);
//    }
    //    @RequestMapping("/error/accedd-denied")
    //    public String loginerrorAs(Model model) {
    //        model.addAttribute("loginError", true);
    //        model.addAttribute("message", "Khong co quyen truy xuat !!");
    //        return "form/login";
    //    }

    //  @RequestMapping("/oauth2/login/success")
    //  public String success(OAuth2AuthenticationToken oAuth2Token) {
    //    accountService.loginOAuth2(oAuth2Token);
    //    return "/home";
    //  }
}
