package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.services.IRoom;
import com.rrms.rrms.services.servicesImp.AccountService;
import com.rrms.rrms.services.servicesImp.HeartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    private IRoom roomService;

    @Autowired
    private AccountService accountService;

    @Operation(summary = "Get heart by username")
    @GetMapping()
    public ApiResponse<HeartResponse> getHeart(@RequestBody AccountRequest accountRequest) {
        HeartResponse heartResponse = heartService.getHeartByAccount(accountRequest);
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
    @PostMapping()
    public ApiResponse<Boolean> addHeart(
            @RequestParam("username") String username, @RequestParam("idRoom") UUID idRoom) {
        AccountResponse accountResponse = accountService.findByUsername(username);
        RoomDetailResponse roomDetailResponse = roomService.getRoomById(idRoom);
        if (accountResponse != null && roomDetailResponse != null) {
            HeartResponse statusAdd = heartService.addHeart(accountResponse, roomDetailResponse);
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
                        .message("room has already been added")
                        .result(false)
                        .build();
            }
        }
        log.info("Valid Error: {}", "null");
        return ApiResponse.<Boolean>builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message("Valid Error")
                .result(false)
                .build();
    }

    @Operation(summary = "Remove heart")
    @PostMapping("/removeHeart")
    public ApiResponse<Boolean> removeHeart(
            @RequestParam("username") String username, @RequestParam("idRoom") UUID idRoom) {
        AccountResponse accountResponse = accountService.findByUsername(username);
        RoomDetailResponse roomDetailResponse = roomService.getRoomById(idRoom);
        if (accountResponse != null && roomDetailResponse != null) {
            HeartResponse statusAdd = heartService.removeHeart(accountResponse, roomDetailResponse);
            if (statusAdd != null) {
                log.info("Remove heart successfully: {}", statusAdd);
                return ApiResponse.<Boolean>builder()
                        .code(HttpStatus.CREATED.value())
                        .message("remove heart successfully")
                        .result(true)
                        .build();
            } else {
                log.info("Remove heart fail: {}", "null");
                return ApiResponse.<Boolean>builder()
                        .code(HttpStatus.BAD_REQUEST.value())
                        .message("room has already been removed")
                        .result(false)
                        .build();
            }
        }
        log.info("Valid Error: {}", "null");
        return ApiResponse.<Boolean>builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message("Valid Error")
                .result(false)
                .build();
    }
}
