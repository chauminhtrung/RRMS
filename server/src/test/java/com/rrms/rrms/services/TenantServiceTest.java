package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.mapper.TenantMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.Tenant;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.TenantRepository;
import com.rrms.rrms.services.servicesImp.TenantService;

class TenantServiceTest {

    @Mock
    private TenantRepository tenantRepository;

    @Mock
    private TenantMapper tenantMapper;

    @Mock
    private RoomRepository roomRepository;

    @InjectMocks
    private TenantService tenantService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTenants() {
        // Mock data
        Tenant tenant1 = Tenant.builder()
                .tenantId(UUID.randomUUID()) // Sử dụng UUID.randomUUID() thay vì any()
                .fullname("Tenant 1")
                .build();

        Tenant tenant2 = Tenant.builder()
                .tenantId(UUID.randomUUID())
                .fullname("Tenant 2")
                .build();

        List<Tenant> tenants = Arrays.asList(tenant1, tenant2);

        TenantResponse response1 = new TenantResponse();
        response1.setTenantId(tenant1.getTenantId()); // Đảm bảo đồng bộ TenantId
        response1.setAddress("Tenant 1");

        TenantResponse response2 = new TenantResponse();
        response2.setTenantId(tenant2.getTenantId());
        response2.setAddress("Tenant 2");

        // Define behavior for mocks
        when(tenantRepository.findAll()).thenReturn(tenants);
        when(tenantMapper.toTenantResponse(tenant1)).thenReturn(response1);
        when(tenantMapper.toTenantResponse(tenant2)).thenReturn(response2);

        // Call the method under test
        List<TenantResponse> result = tenantService.getAllTenants();

        // Assertions
        assertEquals(2, result.size());
        assertEquals("Tenant 1", result.get(0).getAddress());
        assertEquals("Tenant 2", result.get(1).getAddress());

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findAll();
        verify(tenantMapper, times(1)).toTenantResponse(tenant1);
        verify(tenantMapper, times(1)).toTenantResponse(tenant2);
    }

    @Test
    void testGetAllTenants_EmptyList() {
        // Define behavior for mocks
        when(tenantRepository.findAll()).thenReturn(List.of()); // Danh sách rỗng

        // Call the method under test
        List<TenantResponse> result = tenantService.getAllTenants();

        // Assertions
        assertEquals(0, result.size()); // Đảm bảo kết quả là danh sách rỗng

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findAll();
        verifyNoInteractions(tenantMapper); // Không nên có tương tác với mapper
    }

    @Test
    void testGetAllTenants_MapperReturnsNull() {
        // Mock data
        Tenant tenant1 = Tenant.builder()
                .tenantId(UUID.randomUUID())
                .fullname("Tenant 1")
                .build();

        Tenant tenant2 = Tenant.builder()
                .tenantId(UUID.randomUUID())
                .fullname("Tenant 2")
                .build();

        List<Tenant> tenants = Arrays.asList(tenant1, tenant2);

        // Define behavior for mocks
        when(tenantRepository.findAll()).thenReturn(tenants);
        when(tenantMapper.toTenantResponse(tenant1)).thenReturn(null); // Mapper trả về null
        when(tenantMapper.toTenantResponse(tenant2)).thenReturn(null); // Mapper trả về null

        // Call the method under test
        List<TenantResponse> result = tenantService.getAllTenants();

        // Assertions
        assertEquals(2, result.size()); // Số lượng phần tử khớp với danh sách `tenants`
        assertNull(result.get(0)); // Phần tử đầu tiên là `null`
        assertNull(result.get(1)); // Phần tử thứ hai là `null`

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findAll();
        verify(tenantMapper, times(1)).toTenantResponse(tenant1);
        verify(tenantMapper, times(1)).toTenantResponse(tenant2);
    }

    @Test
    void testInsert_ValidRoom() {
        // Mock data
        UUID roomId = UUID.randomUUID();
        Room room = Room.builder().roomId(roomId).name("Room 1").build();

        TenantRequest tenantRequest =
                TenantRequest.builder().fullname("John Doe").phone("123456789").build();

        Tenant tenant = Tenant.builder()
                .fullname("John Doe")
                .phone("123456789")
                .room(room)
                .build();

        TenantResponse tenantResponse = TenantResponse.builder()
                .tenantId(UUID.randomUUID())
                .fullname("John Doe")
                .build();

        // Mock behaviors
        when(roomRepository.findById(roomId)).thenReturn(Optional.of(room));
        when(tenantMapper.tenantRequestToTenant(tenantRequest)).thenReturn(tenant);
        when(tenantRepository.save(any(Tenant.class))).thenReturn(tenant);
        when(tenantMapper.toTenantResponse(tenant)).thenReturn(tenantResponse);

        // Call the method under test
        TenantResponse result = tenantService.insert(roomId, tenantRequest);

        // Assertions
        assertNotNull(result);
        assertEquals("John Doe", result.getFullname());
        verify(roomRepository, times(1)).findById(roomId);
        verify(tenantMapper, times(1)).tenantRequestToTenant(tenantRequest);
        verify(tenantRepository, times(1)).save(tenant);
        verify(tenantMapper, times(1)).toTenantResponse(tenant);
    }

    @Test
    void testInsert_InvalidRoom() {
        // Mock data
        UUID roomId = UUID.randomUUID();
        TenantRequest tenantRequest =
                TenantRequest.builder().fullname("Jane Doe").phone("987654321").build();

        // Mock behaviors
        when(roomRepository.findById(roomId)).thenReturn(Optional.empty());

        // Call the method under test
        TenantResponse result = tenantService.insert(roomId, tenantRequest);

        // Assertions
        assertNull(result);
        verify(roomRepository, times(1)).findById(roomId);
        verify(tenantMapper, never()).tenantRequestToTenant(any());
        verify(tenantRepository, never()).save(any());
        verify(tenantMapper, never()).toTenantResponse(any());
    }

    @Test
    void testFindById_ValidTenant() {
        // Mock data
        UUID tenantId = UUID.randomUUID();

        Tenant tenant = Tenant.builder().tenantId(tenantId).fullname("John Doe").build();

        TenantResponse tenantResponse =
                TenantResponse.builder().tenantId(tenantId).fullname("John Doe").build();

        // Mock behaviors
        when(tenantRepository.findById(tenantId)).thenReturn(Optional.of(tenant));
        when(tenantMapper.toTenantResponse(tenant)).thenReturn(tenantResponse);

        // Call the method under test
        TenantResponse result = tenantService.findById(tenantId);

        // Assertions
        assertNotNull(result);
        assertEquals(tenantId, result.getTenantId());
        assertEquals("John Doe", result.getFullname());

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findById(tenantId);
        verify(tenantMapper, times(1)).toTenantResponse(tenant);
    }

    @Test
    void testFindById_TenantNotFound() {
        // Mock data
        UUID tenantId = UUID.randomUUID();

        // Mock behaviors
        when(tenantRepository.findById(tenantId)).thenReturn(Optional.empty());

        // Assertions
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            tenantService.findById(tenantId);
        });

        assertEquals("Tenant not found", exception.getMessage());

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findById(tenantId);
        verify(tenantMapper, never()).toTenantResponse(any());
    }

    @Test
    void testUpdate_ValidTenant() {
        // Mock data
        UUID tenantId = UUID.randomUUID();

        Tenant existingTenant =
                Tenant.builder().tenantId(tenantId).fullname("John Doe").build();

        TenantRequest tenantRequest =
                TenantRequest.builder().fullname("Updated John Doe").build();

        Tenant updatedTenant =
                Tenant.builder().tenantId(tenantId).fullname("Updated John Doe").build();

        TenantResponse tenantResponse = TenantResponse.builder()
                .tenantId(tenantId)
                .fullname("Updated John Doe")
                .build();

        // Mock behaviors
        when(tenantRepository.findById(tenantId)).thenReturn(Optional.of(existingTenant));
        doAnswer(invocation -> {
                    Tenant tenant = invocation.getArgument(1);
                    tenant.setFullname(tenantRequest.getFullname());
                    return null;
                })
                .when(tenantMapper)
                .updateTenantFromRequest(tenantRequest, existingTenant);
        when(tenantRepository.save(existingTenant)).thenReturn(updatedTenant);
        when(tenantMapper.toTenantResponse(updatedTenant)).thenReturn(tenantResponse);

        // Call the method under test
        TenantResponse result = tenantService.update(tenantId, tenantRequest);

        // Assertions
        assertNotNull(result);
        assertEquals(tenantId, result.getTenantId());
        assertEquals("Updated John Doe", result.getFullname());

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findById(tenantId);
        verify(tenantMapper, times(1)).updateTenantFromRequest(tenantRequest, existingTenant);
        verify(tenantRepository, times(1)).save(existingTenant);
        verify(tenantMapper, times(1)).toTenantResponse(updatedTenant);
    }

    @Test
    void testUpdate_TenantNotFound() {
        // Mock data
        UUID tenantId = UUID.randomUUID();
        TenantRequest tenantRequest =
                TenantRequest.builder().fullname("Updated John Doe").build();

        // Mock behaviors
        when(tenantRepository.findById(tenantId)).thenReturn(Optional.empty());

        // Call the method under test
        TenantResponse result = tenantService.update(tenantId, tenantRequest);

        // Assertions
        assertNull(result);

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findById(tenantId);
        verify(tenantMapper, never()).updateTenantFromRequest(any(), any());
        verify(tenantRepository, never()).save(any());
        verify(tenantMapper, never()).toTenantResponse(any());
    }

    @Test
    void testDelete_TenantFound() {
        // Mock data
        UUID tenantId = UUID.randomUUID();

        Tenant tenant = Tenant.builder().tenantId(tenantId).fullname("John Doe").build();

        // Mock behavior
        when(tenantRepository.findById(tenantId)).thenReturn(Optional.of(tenant));

        // Call the method under test
        tenantService.delete(tenantId);

        // Assertions: Verify deleteById is called
        verify(tenantRepository, times(1)).deleteById(tenantId);

        // Verify no other interactions
        verify(tenantRepository, times(1)).findById(tenantId);
    }

    @Test
    void testDelete_TenantNotFound() {
        // Mock data
        UUID tenantId = UUID.randomUUID();

        // Mock behavior: return Optional.empty() to simulate tenant not found
        when(tenantRepository.findById(tenantId)).thenReturn(Optional.empty());

        // Call the method under test
        tenantService.delete(tenantId);

        // Assertions: Verify deleteById is not called
        verify(tenantRepository, never()).deleteById(tenantId);

        // Verify findById is called
        verify(tenantRepository, times(1)).findById(tenantId);
    }

    @Test
    void testGetAllTenantsRoomId_WithTenants() {
        // Mock data
        UUID roomId = UUID.randomUUID();

        Tenant tenant1 = Tenant.builder()
                .tenantId(UUID.randomUUID())
                .fullname("Tenant 1")
                .build();

        Tenant tenant2 = Tenant.builder()
                .tenantId(UUID.randomUUID())
                .fullname("Tenant 2")
                .build();

        TenantResponse tenantResponse1 = new TenantResponse();
        tenantResponse1.setTenantId(tenant1.getTenantId());
        tenantResponse1.setAddress("Tenant 1");

        TenantResponse tenantResponse2 = new TenantResponse();
        tenantResponse2.setTenantId(tenant2.getTenantId());
        tenantResponse2.setAddress("Tenant 2");

        // Mock behavior: findByRoomRoomId trả về danh sách các Tenant
        when(tenantRepository.findByRoomRoomId(roomId)).thenReturn(Arrays.asList(tenant1, tenant2));
        when(tenantMapper.toTenantResponse(tenant1)).thenReturn(tenantResponse1);
        when(tenantMapper.toTenantResponse(tenant2)).thenReturn(tenantResponse2);

        // Call the method under test
        List<TenantResponse> result = tenantService.getAllTenantsRoomId(roomId);

        // Assertions
        assertEquals(2, result.size());
        assertEquals("Tenant 1", result.get(0).getAddress());
        assertEquals("Tenant 2", result.get(1).getAddress());

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findByRoomRoomId(roomId);
        verify(tenantMapper, times(1)).toTenantResponse(tenant1);
        verify(tenantMapper, times(1)).toTenantResponse(tenant2);
    }

    @Test
    void testGetAllTenantsRoomId_EmptyResult() {
        // Mock data
        UUID roomId = UUID.randomUUID();

        // Mock behavior: findByRoomRoomId trả về danh sách rỗng
        when(tenantRepository.findByRoomRoomId(roomId)).thenReturn(Collections.emptyList());

        // Call the method under test
        List<TenantResponse> result = tenantService.getAllTenantsRoomId(roomId);

        // Assertions: List should be empty
        assertTrue(result.isEmpty());

        // Verify interactions with mocks
        verify(tenantRepository, times(1)).findByRoomRoomId(roomId);
        verify(tenantMapper, never()).toTenantResponse(any());
    }
}
