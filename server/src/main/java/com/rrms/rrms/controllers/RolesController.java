package com.rrms.rrms.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.models.Auth;
import com.rrms.rrms.services.IAccountService;
import com.rrms.rrms.services.IAuthorityService;
import com.rrms.rrms.services.IRoleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Role Controller", description = "Controller for Role")
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api-roles")
public class RolesController {

    @Autowired
    IAccountService accountService;

    @Autowired
    IAuthorityService authorityService;

    @Autowired
    IRoleService roleService;

    @Operation(summary = "Get all authorities")
    @GetMapping("/rest/authorities")
    public Map<String, Object> getAllAuthoritries(Model model) {
        Map<String, Object> data = new HashMap<>();
        //    data.put("authorities", authorityService.findAll());
        data.put("roles", roleService.findAll());
        data.put("accounts", accountService.findAll());
        log.info("Get all authorities successfully");
        return data;
    }

    @Operation(summary = "Get authorities by role")
    @GetMapping("/rest/authoritiesbyR")
    public Map<String, Object> getAllAuthoritriesWRole(@RequestParam("role") String role, Model model) {
        Map<String, Object> data = new HashMap<>();
        //    data.put("authorities", authorityService.findAll());
        data.put("roles", roleService.findAll());
        data.put("accounts", accountService.findAllByRole(role));
        log.info("Get authorities by role successfully: {}", role);
        return data;
    }

    @Operation(summary = "Get authorities by username")
    @GetMapping("/rest/authoritiesbyU")
    public Map<String, Object> getAllAuthoritriesWUs(@RequestParam("username") String username, Model model) {
        Map<String, Object> data = new HashMap<>();
        //    data.put("authorities", authorityService.findAll());
        data.put("roles", roleService.findAll());
        data.put("accounts", accountService.findListAccountsByUsername(username));
        log.info("Get authorities by username successfully: {}", username);
        return data;
    }

    @Operation(summary = "Get authorities by id")
    @PostMapping("/rest/authorities")
    public Auth createAuthoritrie(@RequestBody Auth authortie) {
        return null;
    }

    @Operation(summary = "Get authorities by id")
    @DeleteMapping("/rest/authorities/{id}")
    public void deleteAuthoritrie(@PathVariable int id) {
        //    authorityService.deleteById(id);
    }
}
