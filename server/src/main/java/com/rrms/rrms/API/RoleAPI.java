package com.rrms.rrms.API;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.models.Auth;
import com.rrms.rrms.services.AccountSer;
import com.rrms.rrms.services.AuthorityService;
import com.rrms.rrms.services.RoleService;

@RestController
@RequestMapping("/api-roles")
public class RoleAPI {
    @Autowired
    AccountSer accountService;

    @Autowired
    AuthorityService authorityService;

    @Autowired
    RoleService roleService;

    @GetMapping("/rest/authorities")
    public Map<String, Object> getAllAuthoritries(Model model) {
        Map<String, Object> data = new HashMap<>();
        data.put("authorities", authorityService.findAll());
        data.put("roles", roleService.findAll());
        data.put("accounts", accountService.findAll());
        return data;
    }

    @GetMapping("/rest/authoritiesbyR")
    public Map<String, Object> getAllAuthoritriesWRole(@RequestParam("role") String role, Model model) {
        Map<String, Object> data = new HashMap<>();
        data.put("authorities", authorityService.findAll());
        data.put("roles", roleService.findAll());
        data.put("accounts", accountService.findAllByRole(role));
        return data;
    }

    @GetMapping("/rest/authoritiesbyU")
    public Map<String, Object> getAllAuthoritriesWUs(@RequestParam("username") String username, Model model) {
        Map<String, Object> data = new HashMap<>();
        data.put("authorities", authorityService.findAll());
        data.put("roles", roleService.findAll());
        data.put("accounts", accountService.findListAccountsByUsername(username));
        return data;
    }

    @PostMapping("/rest/authorities")
    public Auth createAuthoritrie(@RequestBody Auth authortie) {
        return authorityService.saveA(authortie);
    }

    @DeleteMapping("/rest/authorities/{id}")
    public void deleteAuthoritrie(@PathVariable int id) {
        authorityService.deleteById(id);
    }
}
