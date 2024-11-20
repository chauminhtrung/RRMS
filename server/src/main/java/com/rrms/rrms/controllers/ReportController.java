package com.rrms.rrms.controllers;

import java.math.BigDecimal;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.IMotelService;
import com.rrms.rrms.services.servicesImp.AccountService;
import com.rrms.rrms.services.servicesImp.ContractService;
import com.rrms.rrms.services.servicesImp.InvoiceService;

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
    private InvoiceService invoiceService;

    @GetMapping("/total-rooms/{username}")
    // tổng nhà trọ
    public ResponseEntity<?> getTotalRooms(@PathVariable String username) {
        Map<String, Object> rs = new HashMap<>();
        try {
            Optional<Account> accountOpt = accountService.findAccountsByUsername(username);

            if (accountOpt.isEmpty()) {
                rs.put("status", false);
                rs.put("message", "Account not found");
                return ResponseEntity.status(404).body(rs);
            }

            // Lấy account từ Optional
            Account account = accountOpt.get();

            Integer totalArea = motelService.getTotalAreaByUsername(account);
            rs.put("status", true);
            rs.put("message", "Call API success");
            rs.put("data", totalArea != null ? totalArea : 0);
        } catch (Exception ex) {
            rs.put("status", false);
            rs.put("message", "Call API failed");
            rs.put("data", null);
            ex.printStackTrace();
        }
        return ResponseEntity.ok(rs);
    }

    @GetMapping("/total-active-contracts/{usernameLandlord}")
    // tổng các hợp đồng đã được active
    public ResponseEntity<?> getTotalActiveContracts(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Account> accountOpt = accountService.findAccountsByUsername(usernameLandlord);

            if (accountOpt.isEmpty()) {
                response.put("status", false);
                response.put("message", "Account not found");
                return ResponseEntity.status(404).body(response);
            }

            // Lấy account từ Optional
            Account account = accountOpt.get();
            Integer totalActiveContracts = contractService.getTotalActiveContractsByLandlord(account);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", totalActiveContracts);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/total-active-contracts-deposit/{usernameLandlord}")
    // tổng tiền các hợp đồng đã được active
    public ResponseEntity<?> getTotalActiveContractsDeposit(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Account> accountOpt = accountService.findAccountsByUsername(usernameLandlord);

            if (accountOpt.isEmpty()) {
                response.put("status", false);
                response.put("message", "Account not found");
                return ResponseEntity.status(404).body(response);
            }

            // Lấy account từ Optional
            Account account = accountOpt.get();

            BigDecimal totalDeposit = contractService.getTotalActiveContractsDepositByLandlord(account);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", totalDeposit != null ? totalDeposit : 0.0);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/contracts-expired/{usernameLandlord}")
    // tổng các hợp đồng đã hết hạn
    public ResponseEntity<?> getTotalExpiredContracts(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            int expiredContracts = contractService.getTotalExpiredContracts(usernameLandlord);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", expiredContracts);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/contracts-expiring/{usernameLandlord}")
    // tổng các hợp đồng đã hết hạn
    public ResponseEntity<?> getTotalExpiringContracts(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            int expiredContracts = contractService.getTotalExpiringContracts(usernameLandlord);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", expiredContracts);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/total-room-price/{usernameLandlord}")
    // tổng tiền phong
    public ResponseEntity<?> getTotalRoomPrice(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            Double totalDeposit = invoiceService.getTotalRoomPrice(usernameLandlord);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", totalDeposit != null ? totalDeposit : 0.0);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/total-service-price/{usernameLandlord}")
    // tổng tiền service
    public ResponseEntity<?> getTotalServicePrice(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            Double totalDeposit = invoiceService.getTotalServicePrice(usernameLandlord);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", totalDeposit != null ? totalDeposit : 0.0);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/total-invoice-price/{usernameLandlord}")
    // tổng tiền invoice
    public ResponseEntity<?> getTotalInvoice(@PathVariable String usernameLandlord) {
        Map<String, Object> response = new HashMap<>();
        try {
            Double totalDeposit = invoiceService.getTotalInvoice(usernameLandlord);
            response.put("status", true);
            response.put("message", "Call API success");
            response.put("data", totalDeposit != null ? totalDeposit : 0.0);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Call API failed");
            response.put("data", null);
            ex.printStackTrace();
            return ResponseEntity.status(500).body(response);
        }
    }
}
