package com.rrms.rrms.controllers;

import com.rrms.rrms.dto.request.BrokerCreateRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.BrokerResponse;
import com.rrms.rrms.services.IBroker;
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
@RequestMapping("/broker")
public class BrokerController {

    IBroker brokerService;

    @PostMapping("")
    public ApiResponse<BrokerResponse> createBroker(@RequestBody BrokerCreateRequest brokerRequest) {
        BrokerResponse brokerResponse = brokerService.createBroker(brokerRequest);
        log.info("Create broker successfully");
        return ApiResponse.<BrokerResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Create broker successfully")
                .result(brokerResponse)
                .build();
    }

    @GetMapping("{motelId}")
    public ApiResponse<List<BrokerResponse>> getAllBroker(@PathVariable String motelId) {
        List<BrokerResponse> brokerResponse = brokerService.getAllBroker(UUID.fromString(motelId));
        return ApiResponse.<List<BrokerResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("get all broker successfully")
                .result(brokerResponse)
                .build();
    }
}
