package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rrms.rrms.models.Account;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.services.servicesImp.ContractService;

@ExtendWith(MockitoExtension.class)
public class ContractServiceTest {

    @InjectMocks
    private ContractService contractService;

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private EntityManager entityManager;

    @Mock
    private StoredProcedureQuery storedProcedureQuery;

    private Account landlordAccount;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        landlordAccount = new Account(); // Khởi tạo đối tượng Account nếu cần thiết
    }

    @Test
    public void testGetTotalActiveContractsByLandlord() {
        // Thiết lập giá trị trả về
        Integer expectedCount = 5;

        // Thiết lập hành vi của contractRepository
        when(contractRepository.countActiveContractsByLandlord(landlordAccount)).thenReturn(expectedCount);

        // Gọi phương thức cần test
        Integer actualCount = contractService.getTotalActiveContractsByLandlord(landlordAccount);

        // Kiểm tra kết quả
        assertEquals(expectedCount, actualCount, "Số hợp đồng hoạt động không khớp với giá trị mong đợi.");

        // Xác minh rằng phương thức đã được gọi chính xác
        verify(contractRepository).countActiveContractsByLandlord(landlordAccount);
    }

    @Test
    public void testGetTotalActiveContractsDepositByLandlord() {
        // Thiết lập giá trị trả về
        BigDecimal expectedDeposit = new BigDecimal("1000.00");

        // Thiết lập hành vi của contractRepository
        when(contractRepository.sumActiveContractDepositsByLandlord(landlordAccount))
                .thenReturn(expectedDeposit);

        // Gọi phương thức cần test
        BigDecimal actualDeposit = contractService.getTotalActiveContractsDepositByLandlord(landlordAccount);

        // Kiểm tra kết quả
        assertEquals(expectedDeposit, actualDeposit, "Số tiền đặt cọc không khớp với giá trị mong đợi.");

        // Xác minh rằng phương thức đã được gọi chính xác
        verify(contractRepository).sumActiveContractDepositsByLandlord(landlordAccount);
    }

    @Test
    public void testGetTotalExpiredContracts() {
        // Thiết lập giá trị trả về
        int expectedCount = 3;
        String username = "testUser";

        // Thiết lập hành vi của entityManager và storedProcedureQuery
        when(entityManager.createStoredProcedureQuery("GetTotalExpiredContracts"))
                .thenReturn(storedProcedureQuery);
        when(storedProcedureQuery.registerStoredProcedureParameter(1, String.class, ParameterMode.IN))
                .thenReturn(storedProcedureQuery);
        when(storedProcedureQuery.setParameter(1, username)).thenReturn(storedProcedureQuery);
        when(storedProcedureQuery.getSingleResult()).thenReturn(expectedCount);

        // Gọi phương thức cần test
        int actualCount = contractService.getTotalExpiredContracts(username);

        // Kiểm tra kết quả
        assertEquals(expectedCount, actualCount, "Số hợp đồng đã hết hạn không khớp với giá trị mong đợi.");

        // Xác minh rằng các phương thức đã được gọi chính xác
        verify(entityManager).createStoredProcedureQuery("GetTotalExpiredContracts");
        verify(storedProcedureQuery).registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        verify(storedProcedureQuery).setParameter(1, username);
        verify(storedProcedureQuery).getSingleResult();
    }

    @Test
    public void testGetTotalExpiringContracts() {
        // Thiết lập giá trị trả về
        int expectedCount = 2;
        String username = "testUser";

        // Thiết lập hành vi của entityManager và storedProcedureQuery
        when(entityManager.createStoredProcedureQuery("GetTotalExpiringContractsProcedure"))
                .thenReturn(storedProcedureQuery);
        when(storedProcedureQuery.registerStoredProcedureParameter(
                        1, String.class, jakarta.persistence.ParameterMode.IN))
                .thenReturn(storedProcedureQuery);
        when(storedProcedureQuery.setParameter(1, username)).thenReturn(storedProcedureQuery);
        when(storedProcedureQuery.getSingleResult()).thenReturn(expectedCount);

        // Gọi phương thức cần test
        int actualCount = contractService.getTotalExpiringContracts(username);

        // Kiểm tra kết quả
        assertEquals(expectedCount, actualCount, "Số hợp đồng sắp hết hạn không khớp với giá trị mong đợi.");

        // Xác minh rằng các phương thức đã được gọi chính xác
        verify(entityManager).createStoredProcedureQuery("GetTotalExpiringContractsProcedure");
        verify(storedProcedureQuery)
                .registerStoredProcedureParameter(1, String.class, jakarta.persistence.ParameterMode.IN);
        verify(storedProcedureQuery).setParameter(1, username);
        verify(storedProcedureQuery).getSingleResult();
    }
}
