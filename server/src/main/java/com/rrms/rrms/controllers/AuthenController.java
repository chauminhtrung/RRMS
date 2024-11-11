package com.rrms.rrms.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.nimbusds.jose.JOSEException;
import com.rrms.rrms.dto.request.*;
import com.rrms.rrms.dto.response.*;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IMailService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/authen")
@Slf4j
public class AuthenController {
    @Autowired
    private IAccountService accountService;

    @Autowired
    private IAuthorityService authorityService;

    private IMailService mailService;

    @GetMapping("/login/error")
    public ResponseEntity<String> loginFailure() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập thất bại!");
    }

    @GetMapping("/login/success")
    public void loginSuccess(HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal OAuth2User oauthUser)
        throws IOException, ParseException {
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        log.info("Google login success: email={}, name={}", email, name);

        // Kiểm tra nếu tài khoản đã tồn tại trong cơ sở dữ liệu, nếu không thì tạo tài khoản mới.
        Optional<Account> accountOptional = accountService.findByEmail(email);
        Account account;
        if (accountOptional.isPresent()) {
            account = accountOptional.get();
        } else {
            RegisterRequest registerRequest = RegisterRequest.builder()
                .username(name)
                .phone("")
                .email(email)
                .password(UUID.randomUUID().toString())
                .userType("CUSTOMER")
                .build();
            account = accountService.register(registerRequest);
            log.info("New account created: {}", account);
        }

        // Tạo JWT token
        String token = authorityService.generateToken(account);
        log.info("Generated JWT token: {}", token);

        // Chuyển hướng người dùng đến frontend với token trong URL
        String redirectUrl = "http://localhost:5173/oauth2/redirect?token=" + token;
        response.sendRedirect(redirectUrl);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            var authen = SecurityContextHolder.getContext().getAuthentication();

            log.info("Get all account {}", authen.getName());
            authen.getAuthorities()
                    .forEach(grantedAuthority -> log.info("GrantedAuthority: {}", grantedAuthority.getAuthority()));
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
    public ResponseEntity<?> logout(@RequestBody LogoutRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Log token để kiểm tra xem token có được gửi đúng không
            log.info("Token nhận được để logout: " + request.getToken());

            // Gọi hàm logout của authorityService, nơi bạn xử lý việc đưa token vào
            // blacklist
            authorityService.logout(request);

            // Trả về thông báo đăng xuất thành công
            response.put("status", true);
            response.put("message", "Đăng xuất thành công.");
            return ResponseEntity.ok(response);
        } catch (ParseException | JOSEException e) {
            // Xử lý lỗi liên quan đến token không hợp lệ
            log.error("Lỗi khi phân tích token: " + e.getMessage(), e);
            response.put("status", false);
            response.put("message", "Token không hợp lệ: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception ex) {
            // Xử lý lỗi hệ thống không lường trước
            log.error("Lỗi không mong muốn trong quá trình đăng xuất: " + ex.getMessage(), ex);
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi khi thực hiện đăng xuất.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        try {
            // Đăng ký tài khoản mới
            Account account = accountService.register(registerRequest);

            // Tạo đối tượng phản hồi
            RegisterResponse response = new RegisterResponse();
            response.setStatus(true);
            response.setMessage("Đăng ký thành công");
            response.setUsername(account.getUsername());

            // Trả về phản hồi
            return ResponseEntity.ok(response);

        } catch (AppException ex) {
            // Trường hợp tài khoản đã tồn tại hoặc lỗi khác
            RegisterResponse response = new RegisterResponse();
            response.setStatus(false);
            response.setMessage(ex.getMessage());

            // Trả về phản hồi lỗi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception ex) {
            // Xử lý các lỗi khác không xác định
            RegisterResponse response = new RegisterResponse();
            response.setStatus(false);
            response.setMessage("Đã xảy ra lỗi trong quá trình đăng ký.");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private static int randomNumber = 0;

    @GetMapping("/checkMail")
    public ApiResponse<Boolean> forget(@RequestParam("email") String email) {
        boolean result = accountService.existsByEmail(email);
        if (result) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        } else {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }

    @PostMapping("/forgetpassword")
    public ApiResponse<Boolean> forget(@RequestBody ChangePasswordByEmail changePasswordByEmail) {
        if (changePasswordByEmail == null) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
        randomNumber = (int) (Math.random() * 90000) + 10000;
        try {
            boolean result = mailService.Send_ForgetPassword(
                    changePasswordByEmail.getEmail(), "Yêu cầu thay đổi mật khẩu", String.valueOf(randomNumber));
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(result)
                    .build();
        } catch (Exception e) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }

    @PostMapping("/acceptChangePassword")
    public ApiResponse<Boolean> acceptChangePassword(@RequestBody ChangePasswordByEmail changePasswordByEmail) {
        if (!changePasswordByEmail.getCode().equals(String.valueOf(randomNumber))) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
        if (!accountService.existsByEmail(changePasswordByEmail.getEmail())) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
        boolean result = accountService.changePasswordByEmail(changePasswordByEmail);
        randomNumber = 0;
        if (result) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        } else {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }
}
