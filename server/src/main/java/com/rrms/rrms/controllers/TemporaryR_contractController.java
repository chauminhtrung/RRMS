package com.rrms.rrms.controllers;


import com.rrms.rrms.dto.request.TemporaryR_contractRequest;
import com.rrms.rrms.dto.response.ApiResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.TemporaryR_contractRespone;
import com.rrms.rrms.services.ITemporaryR_contract;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Tag(name = "TemporaryR_contract Controller", description = "Controller for TemporaryR_contract")
@RestController
@RequestMapping("/TemRC")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class TemporaryR_contractController {

    @Autowired
    ITemporaryR_contract trcService;

    @GetMapping("/get-all-TemRC")
    public ApiResponse<List<TemporaryR_contractRespone>> getAllTemRC() {
        List<TemporaryR_contractRespone> allContracts = trcService.findAll();
        return ApiResponse.<List<TemporaryR_contractRespone>>builder()
                .code(HttpStatus.OK.value())
                .message("Retrieved all contracts successfully")
                .result(allContracts)
                .build();
    }


    @GetMapping("/get-TemRC-account")
    public ApiResponse<List<TemporaryR_contractRespone>> getTemRCbyaccount(@RequestParam String username) {
        List<TemporaryR_contractRespone> TemRCResponses = trcService.findTRCByAccount_Username(username);
        return ApiResponse.<List<TemporaryR_contractRespone>>builder().code(HttpStatus.OK.value()).message("success").result(TemRCResponses).build();
    }


    @PostMapping("/insert-TemRC")
    public ApiResponse<TemporaryR_contractRespone> insertTemRC(@RequestBody TemporaryR_contractRequest contract) {
        TemporaryR_contractRespone createdContract = trcService.insert(contract);
        return ApiResponse.<TemporaryR_contractRespone>builder()
                .code(HttpStatus.CREATED.value())
                .message("Contract created successfully")
                .result(createdContract)
                .build();
    }


    @PutMapping("/update-TemRC/{id}")
    public ApiResponse<TemporaryR_contractRespone> updateTemRC(@PathVariable UUID id, @RequestBody TemporaryR_contractRequest contract) {
        TemporaryR_contractRespone updatedContract = trcService.update(id, contract);
        return ApiResponse.<TemporaryR_contractRespone>builder()
                .code(HttpStatus.OK.value())
                .message("Contract updated successfully")
                .result(updatedContract)
                .build();
    }


    @DeleteMapping("/delete-TemRC/{id}")
    public ApiResponse<Void> deleteTemRC(@PathVariable UUID id) {
        trcService.delete(id);
        return ApiResponse.<Void>builder()
                .code(HttpStatus.NO_CONTENT.value())
                .message("Contract deleted successfully")
                .build();
    }

}
