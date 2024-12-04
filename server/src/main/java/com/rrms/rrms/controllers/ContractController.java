package com.rrms.rrms.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.rrms.rrms.enums.ContractStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.dto.request.ContractRequest;
import com.rrms.rrms.dto.response.ContractResponse;
import com.rrms.rrms.services.IContractService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Contract Controller", description = "Controller for Contract")
@RestController
@Slf4j
@RequestMapping("/contracts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HOST')")
public class ContractController {

    @Autowired
    private IContractService contractService;

    // Tạo mới hợp đồng
    @PostMapping
    public ResponseEntity<ContractResponse> createContract(@RequestBody ContractRequest request) {
        ContractResponse response = contractService.createContract(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Lấy hợp đồng theo ID
    @GetMapping("/{contractId}")
    public ResponseEntity<ContractResponse> getContractById(@PathVariable UUID contractId) {
        ContractResponse response = contractService.getContractById(contractId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Cập nhật hợp đồng
    @PutMapping("/{contractId}")
    public ResponseEntity<ContractResponse> updateContract(
            @PathVariable UUID contractId, @RequestBody ContractRequest request) {
        ContractResponse response = contractService.updateContract(contractId, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Xóa hợp đồng
    @DeleteMapping("/{contractId}")
    public ResponseEntity<Void> deleteContract(@PathVariable UUID contractId) {
        contractService.deleteContract(contractId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Xóa hợp đồng theo room Id
    @DeleteMapping("/room/{roomId}")
    public ResponseEntity<Void> deleteContractByRoomId(@PathVariable UUID roomId) {
        contractService.deleteContractByRoomId(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/motel/{motelId}")
    public ResponseEntity<List<ContractResponse>> getAllContractsByMotelId(@PathVariable UUID motelId) {
        List<ContractResponse> responses = contractService.getAllContractsByMotelId(motelId);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // Lấy hợp đồng theo ID
    @GetMapping("room/{roomId}")
    public ResponseEntity<ContractResponse> getContractByRoomId(@PathVariable UUID roomId) {
        ContractResponse response = contractService.getAllContractsByRoomId(roomId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update-status")
    public ResponseEntity<String> updateContractStatus(
            @RequestParam UUID roomId,
            @RequestParam ContractStatus newStatus,
            @RequestParam(name = "reportCloseDate", required = false)
            @DateTimeFormat(pattern = "dd-MM-yyyy") Date reportCloseDate) {


        // Thực hiện cập nhật trạng thái hợp đồng
        int updatedRows = contractService.updateContractStatus(roomId, newStatus, reportCloseDate);

        if (updatedRows > 0) {
            return ResponseEntity.ok("Contract status updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("No contracts found for the given roomId.");
        }
    }

    @PutMapping("/update-contract")
    public ResponseEntity<String> updateContractDetailChangeRoom(
            @RequestParam UUID ContractId,
            @RequestParam UUID roomId,
            @RequestParam Double deposit,
            @RequestParam Double price, @RequestParam Double debt)
            {


        // Thực hiện cập nhật trạng thái hợp đồng
   contractService.updateContractDetailsByContractId(ContractId,roomId, deposit, price,debt);
   return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @PutMapping("/update-status-by-days-difference")
    public String updateContractsByDaysDifference(
            @RequestParam ContractStatus newStatus,
            @RequestParam int thresholdDays) {
        try {
            contractService.updateContractsBasedOnDaysDifference(newStatus, thresholdDays);
            return "Contracts updated successfully.";
        } catch (Exception e) {
            return "Failed to update contracts: " + e.getMessage();
        }
    }

    @PutMapping("/update-status-by-days-difference2")
    public String updateContractsByDaysDifference2(
            @RequestParam ContractStatus newStatus,
            @RequestParam int thresholdDays) {
        try {
            contractService.updateContractsBasedOnDaysDifference2(newStatus, thresholdDays);
            return "Contracts updated successfully.";
        } catch (Exception e) {
            return "Failed to update contracts: " + e.getMessage();
        }
    }


    @PutMapping("/update-close-contract")
    public ResponseEntity<String> updateCloseContract(
            @RequestParam UUID contractId,
            @RequestParam(name = "newCloseContract", required = false)
            @DateTimeFormat(pattern = "dd-MM-yyyy") Date newCloseContract) {
        if (newCloseContract == null) {
            return ResponseEntity.badRequest().body("Ngày kết thúc hợp đồng không hợp lệ hoặc không được cung cấp!");
        }

        try {
            contractService.updateCloseContract(contractId, newCloseContract);
            return ResponseEntity.ok("Cập nhật ngày kết thúc hợp đồng thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
