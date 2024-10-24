package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomSearchResponse;
import com.rrms.rrms.services.IRoom;
import com.rrms.rrms.services.ISearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Search Controller")
@RestController
@Slf4j
@RequestMapping("/searchs")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SearchController {

    ISearchService searchService;

    IRoom roomService;

    @Operation(summary = "Get all rooms")
    @GetMapping
    public ApiResponse<List<RoomDetailResponse>> getRoom() {
        ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
        List<RoomDetailResponse> rooms = roomService.getRooms();
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(rooms);
        return apiResponse;
    }

    @Operation(summary = "Search room by name")
    @GetMapping("/name")
    public ApiResponse<List<RoomDetailResponse>> searchName(@RequestParam("name") String name) {
        ApiResponse<List<RoomDetailResponse>> apiResponse = new ApiResponse<>();
        List<RoomDetailResponse> rooms = searchService.listRoomByName(name);
        apiResponse.setCode(HttpStatus.OK.value());
        apiResponse.setMessage("Tìm kiếm thành công");
        apiResponse.setResult(rooms);
        return apiResponse;
    }

    //    @GetMapping("/price")
    //    public ApiResponse<List<Room>> searchPrice(
    //            @RequestParam("startPrice") Double startPrice, @RequestParam("endPrice") Double endPrice) {
    //        ApiResponse<List<Room>> apiResponse = new ApiResponse<>();
    //        List<Room> list = searchService.listRoomPrice(startPrice, endPrice);
    //        apiResponse.setCode(HttpStatus.OK.value());
    //        apiResponse.setMessage("Tìm kiếm thành công");
    //        apiResponse.setResult(list);
    //
    //        return apiResponse;
    //    }

    @Operation(summary = "Search room by address")
    @GetMapping("/addressNoElastic")
    public ApiResponse<List<RoomSearchResponse>> findByAddressNoElastic(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddressNoElastic(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }

    @Operation(summary = "Search room by address use elastic search without cache")
    @GetMapping("/nocache/address")
    public ApiResponse<List<RoomSearchResponse>> findByAddressNoCache(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddress(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }

    @Operation(summary = "Search room by address use elastic search")
    @Cacheable(value = "room", key = "#address")
    @GetMapping("/address")
    public ApiResponse<List<RoomSearchResponse>> findByAddress(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddress(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }

    @Operation(summary = "Search room by address fuzzy use elastic search")
    @GetMapping("/addressFuzzy")
    public ApiResponse<List<RoomSearchResponse>> findByAddressFuzzy(@RequestParam("address") String address) {
        List<RoomSearchResponse> roomSearchResponseList = searchService.findByAddressFuzzy(address);
        return ApiResponse.<List<RoomSearchResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("success " + roomSearchResponseList.size())
                .result(roomSearchResponseList)
                .build();
    }
}
