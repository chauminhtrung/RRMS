package com.rrms.rrms.controllers;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.jose.JOSEException;
import com.rrms.rrms.dto.request.IntrospecTokenRequest;
import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.dto.response.LoginResponse;
import com.rrms.rrms.dto.response.MessageTokenResponse;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.Heart;
import com.rrms.rrms.models.Role;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IRoleService;

@RestController
@RequestMapping("/authen")
public class AuthenController {
    @Autowired
    private IAccountService accountService;

    @Autowired
    private IAuthorityService authorityService;

    @Autowired
    private IRoleService roleService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

            LoginResponse loginResponse = authorityService.loginResponse(loginRequest);
            response.put("status", true);
            response.put("message", "Đăng nhập thành công.");
            response.put("data", loginResponse);
            return ResponseEntity.ok(response);

        } catch (AppException ex) {
            response.put("status", false);
            response.put("message", "Sai mật khẩu");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi khi thực hiện đăng nhập.");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/introspect")
    public ResponseEntity<?> introspect(@RequestBody IntrospecTokenRequest request) {
        try {
            var result = authorityService.introspect(request);
            return ResponseEntity.ok(result);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(new MessageTokenResponse("Invalid token format"));
        } catch (JOSEException e) {
            return ResponseEntity.badRequest().body(new MessageTokenResponse("Error verifying token"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new MessageTokenResponse("Internal server error"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            request.getSession().invalidate(); // Xóa phiên làm việc

            // sử dụng JWT, bạn không cần làm gì ở đây, chỉ cần client không gửi token đó nữa.
            response.put("status", true);
            response.put("message", "Đăng xuất thành công.");
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi khi thực hiện đăng xuất.");
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Account account) {
        Optional<Account> existingAccount = accountService.findAccountsByUsername(account.getUsername());
        if (existingAccount.isPresent()) {
            return ResponseEntity.badRequest().body("Tên người dùng đã được sử dụng");
        }

        try {
            Account newAccount = new Account();
            Heart heart = new Heart();
            newAccount.setUsername(account.getUsername());
            String encodedPassword = passwordEncoder.encode(account.getPassword());
            newAccount.setPassword(encodedPassword);
            newAccount.setPhone(account.getPhone());
            newAccount.setFullname(account.getFullname());
            newAccount.setEmail(account.getEmail());
            newAccount.setBirthday(account.getBirthday());
            newAccount.setGender(account.getGender());
            newAccount.setCccd(account.getCccd());
            newAccount.setHeart(heart);
            heart.setAccount(newAccount);
            accountService.save(newAccount);

            Roles roleEnum = Roles.valueOf("CUSTOMER");

            Optional<Role> existingRole = roleService.findRoleByName(roleEnum);
            if (!existingRole.isPresent()) {
                return ResponseEntity.badRequest().body("Role does not exist.");
            }

            Auth authority = new Auth();
            authority.setAccount(newAccount);
            authority.setRole(existingRole.get());
            // authorityService.save(authority);

            return ResponseEntity.ok().body("Register successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid role name provided: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    //  @RequestMapping("/oauth2/login/success")
    //  public String success(OAuth2AuthenticationToken oAuth2Token) {
    //    accountService.loginOAuth2(oAuth2Token);
    //    return "/home";
    //  }
}
