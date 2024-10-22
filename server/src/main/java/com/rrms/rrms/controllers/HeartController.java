package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.HeartResponse;
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
@Tag(name = "Heart Controller", description = "Controller for Heart")
@RestController
@Slf4j
@RequestMapping("/hearts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class HeartController {
    @Autowired
    private HeartService heartService;

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


}
