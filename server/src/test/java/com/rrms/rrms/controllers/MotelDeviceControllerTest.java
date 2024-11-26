package com.rrms.rrms.controllers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.services.servicesImp.MotelDeviceService;

@WebMvcTest(controllers = MotelDeviceController.class) // Controller-specific test
@ExtendWith(MockitoExtension.class)
@Import(SecurityConfigTest.class)
public class MotelDeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean // This ensures the mock is injected into the context
    private MotelDeviceService motelDeviceService;

    private UUID motelDeviceId;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        motelDeviceId = UUID.randomUUID();
    }

    @WithMockUser
    @Test
    public void testGetMotelDevices_Success() throws Exception {
        // Arrange: Mock the service to return a list of MotelDeviceResponse
        UUID motelDeviceId = UUID.randomUUID(); // Ensure motelDeviceId is initialized

        MotelDeviceResponse device1 = new MotelDeviceResponse(
                UUID.randomUUID(),
                new MotelResponse(UUID.randomUUID(), "Motel A"),
                "Device 1",
                "icon1.png",
                100.0,
                50.0,
                10,
                5,
                2,
                "Supplier 1",
                "unit1");

        MotelDeviceResponse device2 = new MotelDeviceResponse(
                UUID.randomUUID(),
                new MotelResponse(UUID.randomUUID(), "Motel B"),
                "Device 2",
                "icon2.png",
                150.0,
                70.0,
                20,
                10,
                5,
                "Supplier 2",
                "unit2");

        List<MotelDeviceResponse> devices = Arrays.asList(device1, device2);

        // Mock service to return the list of devices
        when(motelDeviceService.getAllMotelDevicesByMotel(motelDeviceId)).thenReturn(devices);

        // Act: Perform GET request to fetch motel devices
        ResultActions result =
                mockMvc.perform(get("/moteldevices/{motelId}", motelDeviceId).contentType("application/json"));

        // Assert: Expect status 200 OK and correct response
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"))
                .andExpect(jsonPath("$.result.size()").value(2)) // Expect 2 devices
                .andExpect(jsonPath("$.result[0].deviceName").value("Device 1"))
                .andExpect(jsonPath("$.result[1].deviceName").value("Device 2"));
    }

    @WithMockUser
    @Test
    public void testGetMotelDevices_NoDevicesFound() throws Exception {
        // Arrange: Mock the service to return an empty list when no devices are found
        when(motelDeviceService.getAllMotelDevicesByMotel(motelDeviceId)).thenReturn(List.of());

        // Act: Perform GET request to fetch motel devices
        ResultActions result =
                mockMvc.perform(get("/moteldevices/{motelId}", motelDeviceId).contentType("application/json"));

        // Assert: Expect status 200 OK and empty result
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"))
                .andExpect(jsonPath("$.result.size()").value(0)); // Expect no devices
    }

    @WithMockUser
    @Test
    public void testDeleteMotelDevice_Success() throws Exception {
        // Arrange: Mock the service to simulate a successful deletion
        UUID motelDeviceId = UUID.randomUUID();
        doNothing().when(motelDeviceService).deleteMotelDevice(motelDeviceId); // Giả lập việc xóa thành công

        // Act: Perform DELETE request to delete motel device
        ResultActions result = mockMvc.perform(
                delete("/moteldevices/{motelDeviceId}", motelDeviceId).contentType("application/json"));

        // Log the actual response for debugging
        String responseString = result.andReturn().getResponse().getContentAsString();
        System.out.println("Response: " + responseString);

        // Assert: Expect status 200 OK and correct response
        result.andExpect(status().isOk()) // Kiểm tra mã trạng thái 200 OK
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"))
                .andExpect(jsonPath("$.result").value(true)); // result should be true on success
    }

    @WithMockUser
    @Test
    public void testDeleteMotelDevice_Failure() throws Exception {
        // Arrange: Mock the service to simulate an exception during deletion
        UUID motelDeviceId = UUID.randomUUID();
        doThrow(new RuntimeException("Deletion failed"))
                .when(motelDeviceService)
                .deleteMotelDevice(motelDeviceId);

        // Act: Perform DELETE request to delete motel device
        ResultActions result = mockMvc.perform(
                delete("/moteldevices/{motelDeviceId}", motelDeviceId).contentType("application/json"));

        // Assert: Expect status 400 BAD_REQUEST and correct response
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(HttpStatus.BAD_REQUEST.value()))
                .andExpect(jsonPath("$.message").value("error"))
                .andExpect(jsonPath("$.result").value(false)); // result should be false on failure
    }

    @WithMockUser
    @Test
    public void testInsertMotelDevice_Success() throws Exception {
        // Arrange: Create a valid MotelDeviceRequest
        MotelDeviceRequest motelDeviceRequest = new MotelDeviceRequest();
        motelDeviceRequest.setDeviceName("Device 1");
        motelDeviceRequest.setIcon("icon1.png");
        motelDeviceRequest.setValue(100.0);
        motelDeviceRequest.setValueInput(50.0);
        motelDeviceRequest.setTotalQuantity(10);
        motelDeviceRequest.setTotalUsing(5);
        motelDeviceRequest.setTotalNull(2);
        motelDeviceRequest.setSupplier("Supplier 1");
        motelDeviceRequest.setUnit("unit1");

        // Mock response from the service layer
        MotelDeviceResponse mockResponse = new MotelDeviceResponse(
                UUID.randomUUID(),
                new MotelResponse(UUID.randomUUID(), "Motel A"),
                "Device 1",
                "icon1.png",
                100.0,
                50.0,
                10,
                5,
                2,
                "Supplier 1",
                "unit1");

        // Mock the service to return the expected response
        when(motelDeviceService.insertMotelDevice(any(MotelDeviceRequest.class)))
                .thenReturn(mockResponse);

        // Initialize ObjectMapper (can be declared at class level for reuse)
        ObjectMapper objectMapper = new ObjectMapper();

        // Act: Perform POST request to insert a motel device
        ResultActions result = mockMvc.perform(post("/moteldevices")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(motelDeviceRequest)));

        // Assert: Expect status 200 OK and correct response
        result.andExpect(status().isOk()) // Expect status 200 OK
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("success"))
                .andExpect(jsonPath("$.result.deviceName").value("Device 1"))
                .andExpect(jsonPath("$.result.supplier").value("Supplier 1"));
    }

    @WithMockUser
    @Test
    public void testInsertMotelDevice_Failure() throws Exception {
        // Arrange: Create a valid MotelDeviceRequest
        MotelDeviceRequest motelDeviceRequest = new MotelDeviceRequest();
        motelDeviceRequest.setDeviceName("Device 2");
        motelDeviceRequest.setIcon("icon2.png");
        motelDeviceRequest.setValue(150.0);
        motelDeviceRequest.setValueInput(75.0);
        motelDeviceRequest.setTotalQuantity(20);
        motelDeviceRequest.setTotalUsing(10);
        motelDeviceRequest.setTotalNull(5);
        motelDeviceRequest.setSupplier("Supplier 2");
        motelDeviceRequest.setUnit("unit2");

        // Mock the service to return null (simulate failure)
        when(motelDeviceService.insertMotelDevice(any(MotelDeviceRequest.class)))
                .thenReturn(null);

        // Initialize ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper(); // Ensure ObjectMapper is instantiated

        // Act: Perform POST request to insert a motel device
        ResultActions result = mockMvc.perform(post("/moteldevices")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(motelDeviceRequest))); // Serialize request to JSON

        // Assert: Expect status 400 BAD REQUEST and error response
        result.andExpect(status().isOk()) // Expect status 400 Bad Request
                .andExpect(jsonPath("$.code").value(400))
                .andExpect(jsonPath("$.message").value("error"));
    }
}
