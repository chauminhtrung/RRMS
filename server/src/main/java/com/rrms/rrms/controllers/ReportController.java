package com.rrms.rrms.controllers;

import java.math.BigDecimal;
import java.util.*;

import com.rrms.rrms.dto.response.MotelRoomCountResponse;
import com.rrms.rrms.dto.response.TenantSummaryDTO;
import com.rrms.rrms.services.ITenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.IMotelService;
import com.rrms.rrms.services.servicesImp.AccountService;
import com.rrms.rrms.services.servicesImp.ContractService;
import com.rrms.rrms.services.servicesImp.InvoiceServiceService;

@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private IMotelService motelService;

    @Autowired
    private ContractService contractService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private InvoiceServiceService invoiceService;

    @Autowired
    private ITenantService tenantService;

    @GetMapping("/total-rooms")
    public ResponseEntity<?> getTotalRooms(@RequestParam UUID motelId, @RequestParam String username) {
        var totalRooms = motelService.getTotalRooms(motelId, username);

        if (totalRooms.isPresent()) {
            return ResponseEntity.ok(totalRooms.get());
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy nhà trọ");
        }
    }

    @GetMapping("/room-counts")
    public List<MotelRoomCountResponse> getRoomCountsByContractStatus() {
        return motelService.getRoomCountsByContractStatus();
    }

    // Lấy tổng số người thuê theo nhà trọ
    @GetMapping("/{motelId}/tenants/count")
    public ResponseEntity<Integer> getTotalTenants(@PathVariable UUID motelId) {
        Integer totalTenants = contractService.getTotalTenantsByMotelId(motelId);
        return ResponseEntity.ok(totalTenants);
    }

    // Tóm tắt thông tin người thuê
    @GetMapping("/tenant/summary")
    public List<TenantSummaryDTO> getTenantSummary() {
        return tenantService.getTenantSummary();
    }

    // Tổng tiền cọc
    @GetMapping("/{motelId}/deposits")
    public ResponseEntity<Double> getTotalDeposit(@PathVariable UUID motelId) {
        Double totalDeposit = motelService.calculateTotalDeposit(motelId);
        return ResponseEntity.ok(totalDeposit);
    }

    // Tổng tiền giữ chân
    @GetMapping("/{motelId}/reserve-deposits")
    public ResponseEntity<Double> getTotalReserveDeposit(@PathVariable UUID motelId) {
        Double totalReserveDeposit = motelService.calculateTotalReserveDeposit(motelId);
        return ResponseEntity.ok(totalReserveDeposit);
    }
    // tổng tiền hóa đơn đã thanh toán
    @GetMapping("/{motelId}/total-paid-invoices")
    public ResponseEntity<BigDecimal> getTotalPaidInvoices(@PathVariable UUID motelId) {
        BigDecimal totalPaidInvoices = motelService.getTotalPaidInvoices(motelId);
        return ResponseEntity.ok(totalPaidInvoices);
    }
    // tổng tiền phòng đã thanh toán
    @GetMapping("/{motelId}/total-paid-room-price")
    public ResponseEntity<BigDecimal> getTotalPaidRoomPrice(@PathVariable UUID motelId) {
        BigDecimal totalPaidRoomPrice = motelService.getTotalPaidRoomPrice(motelId);
        return ResponseEntity.ok(totalPaidRoomPrice);
    }

}
