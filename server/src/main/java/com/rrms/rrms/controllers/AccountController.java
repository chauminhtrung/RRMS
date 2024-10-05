package com.rrms.rrms.controllers;

import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IRoleService;
import com.rrms.rrms.services.servicesImp.AccountService;
import com.rrms.rrms.services.servicesImp.AuthorityService;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody Account account, BindingResult bindingResult) {
        Optional<Account> existingAccount = accountService.findAccountsByUsername(account.getUsername());

        // Kiểm tra nếu tài khoản đã tồn tại
        if (existingAccount.isPresent()) {
            return ResponseEntity.badRequest().body("Tên người dùng đã được sử dụng");
        }

        // Kiểm tra lỗi nếu có
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            // Tạo tài khoản mới
            Account newAccount = new Account();
            newAccount.setUsername(account.getUsername());
            newAccount.setPassword(account.getPassword());
            newAccount.setPhone(account.getPhone());
            accountService.save(newAccount);

            // Tìm vai trò từ bảng Roles
            Optional<Role> existingRole = roleService.findRoleByName("CUSTOMER");

            if (!existingRole.isPresent()) {
                return ResponseEntity.badRequest().body("Role does not exist.");
            }

            Auth authority = new Auth();
            authority.setAccount(newAccount);
            authority.setRole(existingRole.get());
            authorityService.save(authority);

            return ResponseEntity.ok().body("Register successful");
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
