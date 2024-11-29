// package com.rrms.rrms.services;
//
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;
//
// import jakarta.persistence.EntityManager;
// import jakarta.persistence.ParameterMode;
// import jakarta.persistence.StoredProcedureQuery;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.mockito.junit.jupiter.MockitoExtension;
//
// import com.rrms.rrms.services.servicesImp.InvoiceService;
//
// @ExtendWith(MockitoExtension.class)
// public class InvoiceServiceTest {
//    @InjectMocks
//    private InvoiceService invoiceService;
//
//    @Mock
//    private EntityManager entityManager;
//
//    @Mock
//    private StoredProcedureQuery storedProcedureQuery;
//
//    private String username = "testUser";
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testGetTotalRoomPrice() {
//        // Thiết lập giá trị trả về
//        Double expectedPrice = 100.0;
//
//        // Thiết lập hành vi của entityManager và storedProcedureQuery
//        when(entityManager.createStoredProcedureQuery("GetTotalRoomPriceProcedure"))
//                .thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.registerStoredProcedureParameter(1, String.class, ParameterMode.IN))
//                .thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.setParameter(1, username)).thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.getSingleResult()).thenReturn(expectedPrice);
//
//        // Gọi phương thức cần test
//        Double actualPrice = invoiceService.getTotalRoomPrice(username);
//
//        // Kiểm tra kết quả
//        assertEquals(expectedPrice, actualPrice);
//
//        // Xác minh rằng các phương thức đã được gọi chính xác
//        verify(entityManager).createStoredProcedureQuery("GetTotalRoomPriceProcedure");
//        verify(storedProcedureQuery).registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
//        verify(storedProcedureQuery).setParameter(1, username);
//        verify(storedProcedureQuery).getSingleResult();
//    }
//
//    @Test
//    public void testGetTotalServicePrice() {
//        // Thiết lập giá trị trả về
//        Double expectedPrice = 50.0;
//
//        // Thiết lập hành vi của entityManager và storedProcedureQuery
//        when(entityManager.createStoredProcedureQuery("GetTotalServicePriceProcedure"))
//                .thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.registerStoredProcedureParameter(1, String.class, ParameterMode.IN))
//                .thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.setParameter(1, username)).thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.getSingleResult()).thenReturn(expectedPrice);
//
//        // Gọi phương thức cần test
//        Double actualPrice = invoiceService.getTotalServicePrice(username);
//
//        // Kiểm tra kết quả
//        assertEquals(expectedPrice, actualPrice);
//
//        // Xác minh rằng các phương thức đã được gọi chính xác
//        verify(entityManager).createStoredProcedureQuery("GetTotalServicePriceProcedure");
//        verify(storedProcedureQuery).registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
//        verify(storedProcedureQuery).setParameter(1, username);
//        verify(storedProcedureQuery).getSingleResult();
//    }
//
//    @Test
//    public void testGetTotalInvoice() {
//        // Thiết lập giá trị trả về
//        Double expectedTotal = 150.0;
//
//        // Thiết lập hành vi của entityManager và storedProcedureQuery
//        when(entityManager.createStoredProcedureQuery("GetTotalInvoiceProcedure"))
//                .thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.registerStoredProcedureParameter(1, String.class, ParameterMode.IN))
//                .thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.setParameter(1, username)).thenReturn(storedProcedureQuery);
//        when(storedProcedureQuery.getSingleResult()).thenReturn(expectedTotal);
//
//        // Gọi phương thức cần test
//        Double actualTotal = invoiceService.getTotalInvoice(username);
//
//        // Kiểm tra kết quả
//        assertEquals(expectedTotal, actualTotal);
//
//        // Xác minh rằng các phương thức đã được gọi chính xác
//        verify(entityManager).createStoredProcedureQuery("GetTotalInvoiceProcedure");
//        verify(storedProcedureQuery).registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
//        verify(storedProcedureQuery).setParameter(1, username);
//        verify(storedProcedureQuery).getSingleResult();
//    }
// }
