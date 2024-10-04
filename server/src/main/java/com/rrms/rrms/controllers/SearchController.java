package com.rrms.rrms.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.dto.request.ApiResponse;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.services.SearchService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
@RequestMapping("/searchs")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {

    SearchService searchService;

    @RequestMapping("/name")
    public ApiResponse<List<Room>> searchName(@RequestParam("name") String name) {
        ApiResponse<List<Room>> apiResponse = new ApiResponse<>();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(searchService.listRoomByName(name));
        return apiResponse;
    }

    @RequestMapping("/price")
    public ApiResponse<List<Room>> searchPrice(
            @RequestParam("startPrice") Double startPrice, @RequestParam("endPrice") Double endPrice) {
        ApiResponse<List<Room>> apiResponse = new ApiResponse<>();
        List<Room> list = searchService.listRoomPrice(startPrice, endPrice);
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(list);

        return apiResponse;
    }
}
