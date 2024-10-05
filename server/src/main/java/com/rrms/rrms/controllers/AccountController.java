package com.rrms.rrms.controllers;

import java.util.Optional;
import java.util.UUID;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Auth;
import com.rrms.rrms.models.Role;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;

@Controller
public class AccountController {
    @Autowired
    IAccountService accountService;

    @Autowired
    IAuthorityService authorityService;

    @RequestMapping("/login")
    public String loginform() {
        return "form/login";
    }

    @RequestMapping("/security/login/error")
    public String loginerror(Model model) {
        model.addAttribute("loginError", true);
        model.addAttribute("message", "Sai thông tin đăng nhập !!");
        return "form/login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        Account account = new Account();
        model.addAttribute(account);
        model.addAttribute("success", false);
        return "form/register";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Account account, BindingResult bindingResult) {
        Optional<Account> existingAccount = accountService.findAccountsByUsername(account.getUsername());
        if (existingAccount.isPresent()) {
            return ResponseEntity.badRequest().body("Username is already in use");
        }

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            Account newAccount = new Account();
            newAccount.setUsername(account.getUsername());
            newAccount.setPassword(account.getPassword());
            newAccount.setFullname(account.getFullname());
            newAccount.setPhone(account.getPhone());
            newAccount.setEmail(account.getEmail());
            newAccount.setAvatar("user.png");
            newAccount.setBirthday(account.getBirthday());
            newAccount.setGender(account.getGender());
            newAccount.setCccd(account.getCccd());
            accountService.save(newAccount);

            Auth authority = new Auth();
            Role role = new Role();
            role.setRoleId(UUID.randomUUID());
            role.setRoleName(Roles.CUSTOMER);
            authority.setAccount(newAccount);
            authority.setRole(role);
            authorityService.save(authority);

            return ResponseEntity.ok().body("Register successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping("/error/accedd-denied")
    public String loginerrorAs(Model model) {
        model.addAttribute("loginError", true);
        model.addAttribute("message", "Khong co quyen truy xuat !!");
        return "form/login";
    }

    //  @RequestMapping("/oauth2/login/success")
    //  public String success(OAuth2AuthenticationToken oAuth2Token) {
    //    accountService.loginOAuth2(oAuth2Token);
    //    return "/home";
    //  }
}
