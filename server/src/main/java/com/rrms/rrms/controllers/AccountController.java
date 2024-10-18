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


}
