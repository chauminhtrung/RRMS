package com.rrms.rrms.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.services.IRoom;
import com.rrms.rrms.services.ISearchService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/searchs")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {

    ISearchService searchService;

    private final IRoom roomService;

    @GetMapping
    public ApiResponse<List<RoomDetailResponse>> getRoom() {
        ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
        List<RoomDetailResponse> rooms = roomService.getRooms();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(rooms);
        return apiResponse;
    }

    @GetMapping("/name")
    public ApiResponse<List<Room>> searchName(@RequestParam("name") String name) {
        ApiResponse<List<Room>> apiResponse = new ApiResponse<>();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(searchService.listRoomByName(name));
        return apiResponse;
    }

    @GetMapping("/price")
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
