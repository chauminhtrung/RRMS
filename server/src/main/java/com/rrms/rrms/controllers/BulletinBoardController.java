package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.services.IBulletinBoard;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/bulletin-board")
public class BulletinBoardController {

    IBulletinBoard bulletinBoardService;

    @RequestMapping("")
    public ApiResponse<List<BulletinBoardResponse>> getAllBulletinBoards() {
        List<BulletinBoardResponse> bulletinBoardResponse = bulletinBoardService.getAllBulletinBoards();
        log.info("Get all bulletin board successfully");
        return ApiResponse.<List<BulletinBoardResponse>>builder()
                .message("Get all bulletin board successfully")
                .code(HttpStatus.OK.value())
                .result(bulletinBoardResponse)
                .build();
    }

    @Operation(summary = "Get bulletin board by id")
    @GetMapping("/{id}")
    public ApiResponse<BulletinBoardResponse> getBulletinBoardById(@PathVariable UUID id) {
        BulletinBoardResponse bulletinBoardResponse = bulletinBoardService.getBulletinBoardById(id);
        log.info("Get bulletin board by id successfully");
        return ApiResponse.<BulletinBoardResponse>builder()
                .message("Get bulletin board by id successfully")
                .code(HttpStatus.OK.value())
                .result(bulletinBoardResponse)
                .build();
    }

    @Operation(summary = "Create bulletin board")
    @PostMapping("")
    public ApiResponse<BulletinBoardResponse> createBulletinBoard(@RequestBody BulletinBoardRequest bulletinBoardRequest) {
        BulletinBoardResponse bulletinBoardResponse = bulletinBoardService.createBulletinBoard(bulletinBoardRequest);
        log.info("Create bulletin board successfully");
        return ApiResponse.<BulletinBoardResponse>builder()
                .message("Create bulletin board successfully")
                .code(HttpStatus.OK.value())
                .result(bulletinBoardResponse)
                .build();
    }
}
