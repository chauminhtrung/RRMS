package com.rrms.rrms.controllers;

import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.nimbusds.jose.JOSEException;
import com.rrms.rrms.dto.request.*;
import com.rrms.rrms.dto.response.*;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.AccountRepository;
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

    @Autowired
    private IMailService mailService;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/error")
    public ResponseEntity<String> loginFailure() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập thất bại!");
    }

    @GetMapping("/success")
    public void loginSuccess(
            HttpServletRequest request, HttpServletResponse response, @AuthenticationPrincipal OAuth2User oauthUser)
            throws IOException, ParseException {

        if (oauthUser == null) {
            log.error("OAuth2 User is null");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Không xác thực được tài khoản Google");
            return;
        }

        log.info("OAuth2 User Info: {}", oauthUser.getAttributes());

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null || name == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Không lấy được thông tin email hoặc tên");
            return;
        }

        Account account = accountService.findByEmail(email).orElseGet(() -> {
            RegisterRequest registerRequest = RegisterRequest.builder()
                    .username(name)
                    .email(email)
                    .password(UUID.randomUUID().toString())
                    .userType("CUSTOMER")
                    .build();
            return accountService.registergg(registerRequest);
        });

        String token = authorityService.generateToken(account);
        log.info("Generated JWT Token: {}", token);

        response.setContentType("application/json");
        response.getWriter().write("{\"token\":\"" + token + "\"}");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Account> accountOptional = accountService.findByPhone(loginRequest.getPhone());
            if (accountOptional.isEmpty()) {
                response.put("status", false);
                response.put("message", "Sai thông tin đăng nhập");
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
            response.put("message", "Sai thông tin đăng nhập");
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
            authorityService.logout(request);
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

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            LoginResponse loginResponse = authorityService.refreshToken(request);
            response.put("status", true);
            response.put("message", "Làm mới token thành công.");
            response.put("data", loginResponse);
            return ResponseEntity.ok(response);
        } catch (AppException ex) {
            response.put("status", false);
            response.put("message", ex.getMessage());
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (ParseException ex) {
            response.put("status", false);
            response.put("message", "Token không hợp lệ.");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (JOSEException ex) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi khi làm mới token.");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi không xác định.");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private static int randomNumber = 0;
    private static int randomNumberRegister = 0;

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

    @PostMapping("/authenticationRegister")
    public ApiResponse<Boolean> authenticationRegister(@RequestBody AuthenticationRegister authenticationRegister) {
        System.out.println(authenticationRegister);
        if (authenticationRegister == null) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        }
        randomNumberRegister = (int) (Math.random() * 90000) + 10000;
        try {
            boolean result = mailService.Send_ForgetPassword(
                    authenticationRegister.getGmail(), "Xác thực tài khoản", String.valueOf(randomNumberRegister));
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

    @PostMapping("/acceptAuthenticationRegister")
    public ApiResponse<Boolean> acceptAuthenticationRegister(
            @RequestBody AuthenticationRegister authenticationRegister) {
        if (!authenticationRegister.getCode().equals(String.valueOf(randomNumberRegister))) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("error")
                    .result(false)
                    .build();
        } else {
            randomNumberRegister = 0;
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        }
    }

    @PostMapping("/checkregister")
    @PermitAll
    public ApiResponse<Boolean> checkRegister(@RequestBody RegisterRequest request) {
        // Kiểm tra tên đăng nhập đã tồn tại chưa
        if (accountRepository.existsByUsername(request.getUsername())) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Tên đăng nhập đã tồn tại!")
                    .result(false)
                    .build();
        }

//        // Kiểm tra số điện thoại đã tồn tại chưa
//        if (accountRepository.existsByPhone(request.getPhone())) {
//            return ApiResponse.<Boolean>builder()
//                    .code(HttpStatus.BAD_REQUEST.value())
//                    .message("Số điện thoại đã tồn tại!")
//                    .result(false)
//                    .build();
//        }

        // Kiểm tra email đã tồn tại chưa
        // if (accountRepository.existsAccountByEmail(request.getEmail())) {
        //     return ApiResponse.<Boolean>builder()
        //             .code(HttpStatus.BAD_REQUEST.value())
        //             .message("Email đã tồn tại!")
        //             .result(false)
        //             .build();
        // }

        return ApiResponse.<Boolean>builder()
                .code(HttpStatus.OK.value())
                .message("Thông tin hợp lệ")
                .result(true)
                .build();
    }

    @PostMapping("/checkregister/{username}")
    public ApiResponse<Boolean> checkRegister(@PathVariable("username") String username) {
        boolean result = accountService.existsByUsername(username);
        if (result) {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(true)
                    .build();
        } else {
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .message("error")
                    .result(false)
                    .build();
        }
    }
}
