package com.rrms.rrms.services;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.AuthRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.repositories.TenantRepository;
import com.rrms.rrms.services.servicesImp.StatisticsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
public class StatisticsServiceTest {

    @InjectMocks
    private StatisticsService statisticsService; // Lớp dịch vụ cần kiểm tra

    @Mock
    private AccountRepository accountRepository;

    @Mock
    private AuthRepository authRepository;

    @Mock
    private TenantRepository tenantRepository;

    @Mock
    private MotelRepository motelRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTotalAccounts() {
        long expectedCount = 100L;
        when(accountRepository.countNonAdminAccounts()).thenReturn(expectedCount);

        Long actualCount = statisticsService.getTotalAccounts();

        assertEquals(expectedCount, actualCount, "Tổng số tài khoản không khớp với giá trị mong đợi.");
    }

    @Test
    public void testGetTotalTenants() {
        long expectedCount = 50L;
        when(tenantRepository.count()).thenReturn(expectedCount);

        Long actualCount = statisticsService.getTotalTenants();

        assertEquals(expectedCount, actualCount, "Tổng số người thuê không khớp với giá trị mong đợi.");
    }

    @Test
    public void testGetTotalHostAccounts() {
        long expectedCount = 20L;
        when(authRepository.countHostAccounts()).thenReturn(expectedCount);

        Long actualCount = statisticsService.getTotalHostAccounts();

        assertEquals(expectedCount, actualCount, "Tổng số tài khoản chủ nhà không khớp với giá trị mong đợi.");
    }

    @Test
    public void testGetTotalMotels() {
        long expectedCount = 30L;
        when(motelRepository.count()).thenReturn(expectedCount);

        Long actualCount = statisticsService.getTotalMotels();

        assertEquals(expectedCount, actualCount, "Tổng số nhà trọ không khớp với giá trị mong đợi.");
    }

    @Test
    public void testGetAccountsCreatedLastWeek() {
        LocalDate now = LocalDate.now();
        LocalDateTime startOfWeek = now.minusWeeks(1).with(DayOfWeek.MONDAY).atStartOfDay();

        // Giả lập tài khoản được tạo vào các ngày khác nhau
        when(accountRepository.findAccountsCreatedBetween(any(), any())).thenAnswer(invocation -> {
            LocalDateTime start = invocation.getArgument(0);
            LocalDateTime end = invocation.getArgument(1);
            return Collections.nCopies(2, new Account()); // Giả lập 2 tài khoản cho mỗi ngày
        });

        Map<DayOfWeek, Long> result = statisticsService.getAccountsCreatedLastWeek();

        for (DayOfWeek day : DayOfWeek.values()) {
            assertEquals(2L, result.get(day), "Số tài khoản được tạo không khớp với giá trị mong đợi cho " + day);
        }
    }

    @Test
    public void testGetAccountsCreatedThisYear() {
        Map<Integer, Long> expectedCounts = new HashMap<>();
        for (int month = 1; month <= 12; month++) {
            expectedCounts.put(month, 5L); // Giả lập 5 tài khoản cho mỗi tháng
            when(accountRepository.countAccountsCreatedByMonth(anyInt(), anyInt())).thenReturn(5L);
        }

        Map<Integer, Long> actualCounts = statisticsService.getAccountsCreatedThisYear();

        assertEquals(expectedCounts, actualCounts, "Số tài khoản được tạo trong năm không khớp với giá trị mong đợi.");
    }

    @Test
    public void testGetAccountsCreatedLastYear() {
        Map<Integer, Long> expectedCounts = new HashMap<>();
        for (int month = 1; month <= 12; month++) {
            expectedCounts.put(month, 3L); // Giả lập 3 tài khoản cho mỗi tháng
            when(accountRepository.countAccountsCreatedByMonth(anyInt(), anyInt())).thenReturn(3L);
        }

        Map<Integer, Long> actualCounts = statisticsService.getAccountsCreatedLastYear();

        assertEquals(expectedCounts, actualCounts, "Số tài khoản được tạo năm trước không khớp với giá trị mong đợi.");
    }

    @Test
    public void testGetTotalMotelsByMonth() {
        List<Motel> motels = new ArrayList<>();

        for (int i = 1; i <= 12; i++) {
            Motel motel = mock(Motel.class);
            // Giả lập phương thức getCreatedDate để trả về LocalDateTime
            LocalDateTime createdDate = LocalDateTime.of(2023, i, 1, 0, 0);
            when(motel.getCreatedDate()).thenReturn(createdDate);
            motels.add(motel);
        }

        when(motelRepository.findAll()).thenReturn(motels);

        Map<Integer, Long> result = statisticsService.getTotalMotelsByMonth();

        for (int month = 1; month <= 12; month++) {
            assertEquals(1L, result.get(month), "Tổng số nhà trọ cho tháng " + month + " không khớp với giá trị mong đợi.");
        }
    }

    @Test
    public void testGetRecentHosts() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<Account> recentHosts = Arrays.asList(new Account(), new Account());

        // Sử dụng any() để cho phép bất kỳ LocalDateTime nào
        when(accountRepository.findRecentHosts(any(LocalDateTime.class))).thenReturn(recentHosts);

        List<Account> result = statisticsService.getRecentHosts();

        assertEquals(recentHosts.size(), result.size(), "Số tài khoản gần đây không khớp với giá trị mong đợi.");
    }
}
