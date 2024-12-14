package com.rrms.rrms.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.*;
import com.rrms.rrms.services.IBulletinBoard;
import com.rrms.rrms.services.servicesImp.AccountService;
import com.rrms.rrms.services.servicesImp.HeartService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Heart Controller", description = "Controller for Heart")
@RestController
@Slf4j
@RequestMapping("/hearts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class HeartController {
    @Autowired
    private HeartService heartService;

    @Autowired
    private IBulletinBoard iBulletinBoard;

    @Autowired
    private AccountService accountService;

    @Operation(summary = "Get heart by username")
    @GetMapping("/{username}")
    public ApiResponse<HeartResponse> getHeart(@PathVariable("username") String username) {
        HeartResponse heartResponse = heartService.getHeartByUsername(username);
        if (heartResponse != null) {
            log.info("Get heart successfully: {}", heartResponse);
            return ApiResponse.<HeartResponse>builder()
                    .code(HttpStatus.OK.value())
                    .message("success")
                    .result(heartResponse)
                    .build();
        }
        log.info("Get heart fail: {}", "null");
        return ApiResponse.<HeartResponse>builder()
                .code(HttpStatus.NOT_FOUND.value())
                .message("can't find heart")
                .result(null)
                .build();
    }

    @Operation(summary = "Add heart")
    @PostMapping("/{username}/{bulletinBoard_id}")
    public ApiResponse<Boolean> addHeart(
            @PathVariable("username") String username, @PathVariable("bulletinBoard_id") UUID bulletinBoard_id) {
        HeartResponse statusAdd = heartService.addHeart(username, bulletinBoard_id);
        if (statusAdd != null) {
            log.info("Add heart successfully: {}", statusAdd);
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.CREATED.value())
                    .message("add heart successfully")
                    .result(true)
                    .build();
        } else {
            log.info("Add heart fail: {}", "null");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("failed to add heart")
                    .result(false)
                    .build();
        }
    }


    @Operation(summary = "Remove heart")
    @DeleteMapping("/removeHeart/{username}/{bulletinBoard_id}")
    public ApiResponse<Boolean> removeHeart(
            @PathVariable("username") String username, @PathVariable("bulletinBoard_id") UUID bulletinBoard_id) {
        HeartResponse statusAdd = heartService.removeHeart(username, bulletinBoard_id);
        if (statusAdd != null) {
            log.info("Remove heart successfully: {}", statusAdd);
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.OK.value())
                    .message("remove heart successfully")
                    .result(true)
                    .build();
        } else {
            log.info("Remove heart fail: {}", "null");
            return ApiResponse.<Boolean>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Remove failed")
                    .result(false)
                    .build();
        }
    }
}
