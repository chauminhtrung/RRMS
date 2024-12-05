package com.rrms.rrms.controllers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.services.ITenantService;

public class TenantControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ITenantService tenantService;

    @InjectMocks
    private TenantController tenantController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(tenantController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetAllTenants_Success() throws Exception {
        // Mock data
        TenantResponse tenantResponse1 = new TenantResponse();
        tenantResponse1.setTenantId(UUID.randomUUID());
        tenantResponse1.setAddress("Tenant 1"); // Sử dụng `setName()` thay vì `setAddress()`

        TenantResponse tenantResponse2 = new TenantResponse();
        tenantResponse2.setTenantId(UUID.randomUUID());
        tenantResponse2.setAddress("Tenant 2"); // Sử dụng `setName()` thay vì `setAddress()`

        List<TenantResponse> tenantResponses = Arrays.asList(tenantResponse1, tenantResponse2);

        // Mock service call
        when(tenantService.getAllTenants()).thenReturn(tenantResponses);

        // Perform the GET request
        mockMvc.perform(get("/tenant"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Get all tenants successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.length()").value(2))
                .andExpect(jsonPath("$.result[0].address").value("Tenant 1")) // Kiểm tra trường `name`
                .andExpect(jsonPath("$.result[1].address").value("Tenant 2")); // Kiểm tra trường `name`

        // Verify interactions with mocks
        verify(tenantService, times(1)).getAllTenants();
    }

    @Test
    void testGetAllTenants_EmptyResult() throws Exception {
        // Mock service call with empty list
        when(tenantService.getAllTenants()).thenReturn(Arrays.asList());

        // Perform the GET request
        mockMvc.perform(get("/tenant"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Get all tenants successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.length()").value(0));

        // Verify interactions with mocks
        verify(tenantService, times(1)).getAllTenants();
    }

    @Test
    void testInsertTenant_Success() throws Exception {
        // Giả lập dữ liệu TenantRequest và TenantResponse
        TenantRequest tenantRequest = new TenantRequest();
        tenantRequest.setAddress("John Doe");
        tenantRequest.setEmail("johndoe@example.com");

        UUID roomId = UUID.randomUUID(); // Giả lập roomId

        // Giả lập dịch vụ trả về một TenantResponse sau khi thêm tenant
        TenantResponse tenantResponse = new TenantResponse();
        tenantResponse.setTenantId(UUID.randomUUID());
        tenantResponse.setAddress(tenantRequest.getAddress());
        tenantResponse.setEmail(tenantRequest.getEmail());

        when(tenantService.insert(eq(roomId), eq(tenantRequest))).thenReturn(tenantResponse);

        // Thực hiện POST yêu cầu
        mockMvc.perform(post("/tenant/insert/{roomId}", roomId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper()
                                .writeValueAsString(tenantRequest))) // Chuyển tenantRequest thành JSON
                .andExpect(jsonPath("$.code").value(HttpStatus.CREATED.value())) // Kiểm tra mã trả về
                .andExpect(jsonPath("$.message").value("success")) // Kiểm tra thông báo
                .andExpect(jsonPath("$.result.address").value("John Doe")) // Kiểm tra address trong result
                .andExpect(jsonPath("$.result.email").value("johndoe@example.com")); // Kiểm tra email trong result

        // Kiểm tra rằng phương thức insert của tenantService đã được gọi đúng một lần
        verify(tenantService, times(1)).insert(eq(roomId), eq(tenantRequest));
    }

    @Test
    void testUpdateTenant_Success() throws Exception {
        // Giả lập UUID và TenantRequest
        UUID tenantId = UUID.randomUUID();
        TenantRequest tenantRequest = new TenantRequest();
        tenantRequest.setAddress("Updated Address");
        tenantRequest.setEmail("updated@example.com");
        tenantRequest.setPhone("0987654321");

        TenantResponse tenantResponse = new TenantResponse();
        tenantResponse.setTenantId(tenantId);
        tenantResponse.setAddress("Updated Address");
        tenantResponse.setEmail("updated@example.com");
        tenantResponse.setPhone("0987654321");

        // Giả lập tenantService.update trả về TenantResponse
        when(tenantService.update(eq(tenantId), any(TenantRequest.class))).thenReturn(tenantResponse);

        // Thực hiện PUT yêu cầu
        mockMvc.perform(put("/tenant/{id}", tenantId) // Đảm bảo URL đúng
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(tenantRequest)))
                .andExpect(status().isOk()) // Kiểm tra mã trạng thái trả về 200 OK
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value())) // Kiểm tra mã code trả về
                .andExpect(jsonPath("$.message").value("success")) // Kiểm tra thông báo thành công
                .andExpect(jsonPath("$.result.tenantId").value(tenantId.toString())) // Kiểm tra tenantId
                .andExpect(jsonPath("$.result.address").value("Updated Address")) // Kiểm tra địa chỉ
                .andExpect(jsonPath("$.result.email").value("updated@example.com")) // Kiểm tra email
                .andExpect(jsonPath("$.result.phone").value("0987654321")); // Kiểm tra phone

        // Kiểm tra rằng phương thức update của tenantService đã được gọi một lần
        verify(tenantService, times(1)).update(eq(tenantId), any(TenantRequest.class));
    }

    @Test
    void testDeleteTenant_Success() throws Exception {
        // Giả lập một UUID cho tenant
        UUID tenantId = UUID.randomUUID();

        // Không có ngoại lệ xảy ra khi gọi service.delete
        doNothing().when(tenantService).delete(tenantId);

        // Thực hiện yêu cầu DELETE
        mockMvc.perform(delete("/tenant/{id}", tenantId))
                .andExpect(status().isOk()) // Kiểm tra mã trạng thái trả về là 200
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value())) // Kiểm tra mã code trả về
                .andExpect(jsonPath("$.message").value("success")) // Kiểm tra thông báo thành công
                .andExpect(jsonPath("$.result").value(true)); // Kiểm tra kết quả là true

        // Kiểm tra rằng phương thức delete của tenantService đã được gọi một lần
        verify(tenantService, times(1)).delete(tenantId);
    }
    //    @Test
    //    void testDeleteTenant_Failure() throws Exception {
    //        // Giả lập một UUID cho tenant
    //        UUID tenantId = UUID.randomUUID();
    //
    //        // Giả lập rằng phương thức delete sẽ ném ra một ngoại lệ
    //        doThrow(new RuntimeException("Delete failed")).when(tenantService).delete(tenantId);
    //
    //        // Thực hiện yêu cầu DELETE
    //        mockMvc.perform(delete("/tenant/{id}", tenantId))
    //                .andExpect(status().isBadRequest())  // Kiểm tra mã trạng thái trả về là 400 (Bad Request)
    //                .andExpect(jsonPath("$.code").value(HttpStatus.BAD_REQUEST.value()))  // Kiểm tra mã code trả về
    // là 400
    //                .andExpect(jsonPath("$.message").value("error"))  // Kiểm tra thông báo lỗi
    //                .andExpect(jsonPath("$.result").value(false));  // Kiểm tra kết quả là false
    //
    //        // Kiểm tra rằng phương thức delete của tenantService đã được gọi một lần
    //        verify(tenantService, times(1)).delete(tenantId);
    //    }
    @Test
    void testGetAllTenantsRoomId_Success() throws Exception {
        // Giả lập UUID cho roomId
        UUID roomId = UUID.randomUUID();

        // Giả lập danh sách tenants trả về từ service
        List<TenantResponse> tenantList = Arrays.asList(
                new TenantResponse(
                        UUID.randomUUID(),
                        "Tenant1",
                        "description",
                        "address",
                        "phone",
                        LocalDate.now(),
                        Gender.MALE,
                        "email",
                        "status",
                        LocalDate.now(),
                        "idCard",
                        "type",
                        "roomId",
                        true,
                        "remarks",
                        false,
                        false,
                        false),
                new TenantResponse(
                        UUID.randomUUID(),
                        "Tenant2",
                        "description",
                        "address",
                        "phone",
                        LocalDate.now(),
                        Gender.FEMALE,
                        "email",
                        "status",
                        LocalDate.now(),
                        "idCard",
                        "type",
                        "roomId",
                        true,
                        "remarks",
                        false,
                        false,
                        false));
        when(tenantService.getAllTenantsRoomId(roomId)).thenReturn(tenantList);

        // Thực hiện yêu cầu GET
        mockMvc.perform(get("/tenant/roomId/{roomId}", roomId))
                .andExpect(status().isOk()) // Kiểm tra mã trạng thái trả về là 200
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value())) // Kiểm tra mã code trả về là 200
                .andExpect(jsonPath("$.message").value("Get all tenants by room id successfully")) // Kiểm tra thông báo
                .andExpect(jsonPath("$.result").isArray()) // Kiểm tra kết quả trả về là một mảng
                .andExpect(jsonPath("$.result[0].fullname").value("Tenant1")) // Kiểm tra tên tenant đầu tiên
                .andExpect(jsonPath("$.result[1].fullname").value("Tenant2")); // Kiểm tra tên tenant thứ hai

        // Kiểm tra phương thức được gọi đúng
        verify(tenantService, times(1)).getAllTenantsRoomId(roomId);
    }
}
