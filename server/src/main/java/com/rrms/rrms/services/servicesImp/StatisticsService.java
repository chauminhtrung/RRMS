package com.rrms.rrms.services.servicesImp;

import java.time.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.IStatistics;

@Service
public class StatisticsService implements IStatistics {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private MotelRepository motelRepository;

    @Override
    public Long getTotalAccounts() {
        return accountRepository.countNonAdminAccounts();
    }

    @Override
    public Long getTotalTenants() {
        return tenantRepository.count();
    }

    @Override
    public Long getTotalHostAccounts() {
        return authRepository.countHostAccounts();
    }

    @Override
    public Long getTotalMotels() {
        return motelRepository.count();
    }

    @Override
    public Map<DayOfWeek, Long> getAccountsCreatedLastWeek() {
        Map<DayOfWeek, Long> counts = new HashMap<>();
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.minusWeeks(1).with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.minusWeeks(1).with(DayOfWeek.SUNDAY).plusDays(1);

        for (DayOfWeek day : DayOfWeek.values()) {
            LocalDate startDate = startOfWeek.with(day);
            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = startDateTime.plusDays(1);
            List<Account> accounts = accountRepository.findAccountsCreatedBetween(startDateTime, endDateTime);
            counts.put(day, (long) accounts.size());
        }

        return counts;
    }

    @Override
    public Map<Integer, Long> getAccountsCreatedThisYear() {
        int currentYear = Year.now().getValue();
        return getAccountsCreatedByMonth(currentYear);
    }

    @Override
    public Map<Integer, Long> getAccountsCreatedLastYear() {
        int lastYear = Year.now().getValue() - 1;
        return getAccountsCreatedByMonth(lastYear);
    }

    private Map<Integer, Long> getAccountsCreatedByMonth(int year) {
        Map<Integer, Long> monthlyCounts = new HashMap<>();

        for (int month = 1; month <= 12; month++) {
            long count = accountRepository.countAccountsCreatedByMonth(year, month);
            monthlyCounts.put(month, count);
        }

        return monthlyCounts;
    }

    @Override
    public Map<Integer, Long> getTotalMotelsByMonth() {
        List<Motel> motels = motelRepository.findAll();
        ZonedDateTime currentYear = ZonedDateTime.now(ZoneId.systemDefault())
                .withDayOfYear(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);

        // Khởi tạo Map để chứa tổng số nhà trọ cho từng tháng
        Map<Integer, Long> totalsByMonth = new HashMap<>();

        // Đặt giá trị mặc định cho từng tháng là 0
        for (int i = 1; i <= 12; i++) {
            totalsByMonth.put(i, 0L);
        }

        // Tính tổng số nhà trọ cho từng tháng
        for (Motel motel : motels) {
            int month = motel.getCreatedDate().getMonthValue();
            totalsByMonth.put(month, totalsByMonth.get(month) + 1);
        }

        return totalsByMonth;
    }

    @Override
    public List<Account> getRecentHosts() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return accountRepository.findRecentHosts(sevenDaysAgo);
    }
}
