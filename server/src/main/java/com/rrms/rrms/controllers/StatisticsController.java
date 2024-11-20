package com.rrms.rrms.controllers;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.IStatistics;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private IStatistics statisticsService;

    @GetMapping("/total-accounts")
    public ResponseEntity<Long> getTotalAccounts() {
        Long total = statisticsService.getTotalAccounts();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/total-tenants")
    public ResponseEntity<Long> getTotalTenants() {
        Long total = statisticsService.getTotalTenants();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/total-host-accounts")
    public ResponseEntity<Long> getTotalHostAccounts() {
        Long total = statisticsService.getTotalHostAccounts();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/total-motels")
    public ResponseEntity<Long> getTotalMotels() {
        Long total = statisticsService.getTotalMotels();
        return ResponseEntity.ok(total);
    }

    @GetMapping("/total-account-last-week")
    public ResponseEntity<Map<DayOfWeek, Long>> getAccountsCreatedLastWeek() {
        Map<DayOfWeek, Long> counts = statisticsService.getAccountsCreatedLastWeek();
        return ResponseEntity.ok(counts);
    }

    @GetMapping("/accounts-total-this-year")
    public ResponseEntity<Map<Integer, Long>> getAccountsCreatedThisYear() {
        Map<Integer, Long> counts = statisticsService.getAccountsCreatedThisYear();
        return ResponseEntity.ok(counts);
    }

    @GetMapping("/accounts-total-last-year")
    public ResponseEntity<Map<Integer, Long>> getAccountsCreatedLastYear() {
        Map<Integer, Long> counts = statisticsService.getAccountsCreatedLastYear();
        return ResponseEntity.ok(counts);
    }

    @GetMapping("/total-motel-by-month")
    public ResponseEntity<Map<Integer, Long>> getTotalMotelsByMonth() {
        Map<Integer, Long> totalsByMonth = statisticsService.getTotalMotelsByMonth();
        return ResponseEntity.ok(totalsByMonth);
    }

    @GetMapping("/account-recent-hosts")
    public ResponseEntity<List<Account>> getRecentHosts() {
        List<Account> recentHosts = statisticsService.getRecentHosts();
        return ResponseEntity.ok(recentHosts);
    }
}
