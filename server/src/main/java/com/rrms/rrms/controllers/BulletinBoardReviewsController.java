package com.rrms.rrms.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.RatingHistoryResponse;
import com.rrms.rrms.services.IBulletinBoardReviews;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/bulletin-board-reviews")
@PreAuthorize("isAuthenticated()")
@Transactional
public class BulletinBoardReviewsController {

    IBulletinBoardReviews bulletinBoardReviewsService;

    @PostMapping
    public ApiResponse<BulletinBoardReviewsResponse> createBulletinBoardReviews(
            @RequestBody BulletinBoardReviewsRequest request) {
        BulletinBoardReviewsResponse response = bulletinBoardReviewsService.createOrUpdateBulletinBoardReviews(request);
        return ApiResponse.<BulletinBoardReviewsResponse>builder()
                .message("Create Bulletin Board Reviews successfully")
                .code(HttpStatus.CREATED.value())
                .result(response)
                .build();
    }

    @GetMapping("")
    public ApiResponse<BulletinBoardReviewsResponse> getBulletinBoardReviewsByBulletinBoardIdAndUsername(
            @RequestParam("bulletinBoardId") UUID bulletinBoardId, @RequestParam("username") String username) {
        BulletinBoardReviewsResponse response =
                bulletinBoardReviewsService.getBulletinBoardReviewsByBulletinBoardIdAndUsername(
                        bulletinBoardId, username);
        return ApiResponse.<BulletinBoardReviewsResponse>builder()
                .message("Get Bulletin Board Reviews successfully")
                .code(HttpStatus.OK.value())
                .result(response)
                .build();
    }

    @GetMapping("/rating-history")
    public ApiResponse<List<RatingHistoryResponse>> getRatingHistoryByBulletinBoardIdAndUsername(
            @RequestParam("username") String username) {
        List<RatingHistoryResponse> response =
                bulletinBoardReviewsService.getRatingHistoryByBulletinBoardIdAndUsername(username);
        return ApiResponse.<List<RatingHistoryResponse>>builder()
                .message("Get Rating History successfully")
                .code(HttpStatus.OK.value())
                .result(response)
                .build();
    }

    @DeleteMapping("/{bulletinBoardReviewsId}")
    public ApiResponse<Integer> deleteBulletinBoardReviewsByBulletinBoardReviewsId(
            @PathVariable("bulletinBoardReviewsId") UUID bulletinBoardReviewsId) {
        Integer response =
                bulletinBoardReviewsService.deleteBulletinBoardReviewsByBulletinBoardReviewsId(bulletinBoardReviewsId);
        return ApiResponse.<Integer>builder()
                .message("Delete Bulletin Board Reviews successfully")
                .code(HttpStatus.OK.value())
                .result(response)
                .build();
    }
}
