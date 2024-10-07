package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.LoginRequest;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IRoleService;
import java.util.Optional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.Role;

@Controller
public class AccountController {
    @Autowired
    IAccountService accountService;

    @Autowired
    IAuthorityService authorityService;

    @Autowired
    IRoleService roleService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login request received for phone: " + loginRequest.getPhone());

        Optional<Account> accountOptional = accountService.login(loginRequest.getPhone(), loginRequest.getPassword());

        if (accountOptional.isPresent()) {
            return ResponseEntity.ok("Login successful for user: " + accountOptional.get().getUsername());
        }

        System.out.println("Login failed for phone: " + loginRequest.getPhone());
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @RequestMapping("/security/login/error")
    public String loginerror(Model model) {
        model.addAttribute("loginError", true);
        model.addAttribute("message", "Sai thông tin đăng nhập !!");
        return "form/login";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Account account, BindingResult bindingResult) {
        Optional<Account> existingAccount = accountService.findAccountsByUsername(account.getUsername());

        // Check if the account already exists
        if (existingAccount.isPresent()) {
            return ResponseEntity.badRequest().body("Tên người dùng đã được sử dụng");
        }

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            // Create a new account
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
            Roles roleEnum = Roles.valueOf("CUSTOMER"); // Chuyển đổi "CUSTOMER" thành enum Roles.CUSTOMER

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
