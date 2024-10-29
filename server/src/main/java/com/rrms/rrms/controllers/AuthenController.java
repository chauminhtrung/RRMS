package com.rrms.rrms.controllers;

import com.nimbusds.jose.JOSEException;
import com.rrms.rrms.dto.request.IntrospecTokenRequest;
import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.dto.request.LogoutRequest;
import com.rrms.rrms.dto.request.RegisterRequest;
import com.rrms.rrms.dto.response.LoginResponse;
import com.rrms.rrms.dto.response.MessageTokenResponse;
import com.rrms.rrms.dto.response.RegisterResponse;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.Heart;
import com.rrms.rrms.models.Role;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IRoleService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    Map<String, Object> response = new HashMap<>();
    try {
      var authen = SecurityContextHolder.getContext().getAuthentication();

      log.info("Get all account {}", authen.getName());
      authen.getAuthorities().forEach(grantedAuthority -> log.info("GrantedAuthority: {}", grantedAuthority.getAuthority()));
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

      // Gọi hàm logout của authorityService, nơi bạn xử lý việc đưa token vào blacklist
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
}
