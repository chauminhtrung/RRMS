package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.services.IBulletinBoard;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/bulletin-board")
public class BulletinBoardController {

    IBulletinBoard bulletinBoardService;

    @GetMapping("")
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
    public ApiResponse<BulletinBoardResponse> createBulletinBoard(
            @RequestBody BulletinBoardRequest bulletinBoardRequest) {
        BulletinBoardResponse bulletinBoardResponse = bulletinBoardService.createBulletinBoard(bulletinBoardRequest);
        log.info("Create bulletin board successfully");
        return ApiResponse.<BulletinBoardResponse>builder()
                .message("Create bulletin board successfully")
                .code(HttpStatus.CREATED.value())
                .result(bulletinBoardResponse)
                .build();
    }

    @Operation(summary = "Update bulletin board")
    @PutMapping("/{id}")
    public ApiResponse<BulletinBoardResponse> updateBulletinBoard(
            @RequestBody BulletinBoardRequest bulletinBoardRequest, @PathVariable("id") UUID id) {
        log.info("Update bulletin board with id: {}", id);
        BulletinBoardResponse bulletinBoardResponse =
                bulletinBoardService.updateBulletinBoard(id, bulletinBoardRequest);
        log.info("Update bulletin board successfully");
        return ApiResponse.<BulletinBoardResponse>builder()
                .message("Update bulletin board successfully")
                .code(HttpStatus.OK.value())
                .result(bulletinBoardResponse)
                .build();
    }

    @Operation(summary = "Get bulletin board table")
    @GetMapping("/table/{username}")
    public ApiResponse<List<BulletinBoardTableResponse>> getBulletinBoardTable(@PathVariable String username) {
        List<BulletinBoardTableResponse> bulletinBoardResponse = bulletinBoardService.getBulletinBoardTable(username);
        log.info("Get bulletin board table successfully");
        return ApiResponse.<List<BulletinBoardTableResponse>>builder()
                .message("Get bulletin board table successfully")
                .code(HttpStatus.OK.value())
                .result(bulletinBoardResponse)
                .build();
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<BulletinBoardResponse>> getBulletinBoard() {
        List<BulletinBoardResponse> inactiveBulletinBoards = bulletinBoardService.getBulletinBoard();
        return ResponseEntity.ok(inactiveBulletinBoards);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BulletinBoard> approveBulletinBoard(@PathVariable UUID id) {
        BulletinBoard updatedBoard = bulletinBoardService.approveBulletinBoard(id);
        return ResponseEntity.ok(updatedBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBulletinBoard(@PathVariable UUID id) {
        bulletinBoardService.deleteBulletinBoard(id);
        log.info("Delete bulletin board with id: " + id);
        return ResponseEntity.noContent().build();
    }
}
