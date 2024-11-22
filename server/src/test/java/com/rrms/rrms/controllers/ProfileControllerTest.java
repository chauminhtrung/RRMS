package com.rrms.rrms.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.services.IAccountService;

@WebMvcTest(ProfileController.class)
@TestPropertySource("/test.properties")
@Import(SecurityConfigTest.class)
public class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IAccountService accountService; // Mock dịch vụ xử lý tài khoản

    @Test
    public void testGetProfile_Success() throws Exception {
        // Mock dữ liệu phản hồi từ service
        AccountResponse mockResponse = AccountResponse.builder()
                .username("testuser")
                .email("test@example.com")
                .build();
        when(accountService.findByUsername("testuser")).thenReturn(mockResponse);

        // Gửi yêu cầu GET để lấy thông tin hồ sơ
        mockMvc.perform(MockMvcRequestBuilders.get("/profile")
                        .param("username", "testuser")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Kiểm tra mã trạng thái 200 OK
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value())) // Kiểm tra mã phản hồi
                .andExpect(MockMvcResultMatchers.jsonPath("$.message")
                        .value("Get profile successfully")) // Kiểm tra thông báo
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.username")
                        .value("testuser")) // Kiểm tra tên người dùng
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.result.email").value("test@example.com")); // Kiểm tra email
    }

    @Test
    public void testUpdateProfile_Success() throws Exception {
        // Mock dữ liệu phản hồi từ service khi cập nhật hồ sơ
        AccountRequest accountRequest = AccountRequest.builder()
                .username("newusername")
                .email("newemail@example.com")
                .build();
        AccountResponse mockResponse = AccountResponse.builder()
                .username("newusername")
                .email("newemail@example.com")
                .build();
        when(accountService.update(any(AccountRequest.class))).thenReturn(mockResponse);

        // Gửi yêu cầu PUT để cập nhật hồ sơ
        mockMvc.perform(MockMvcRequestBuilders.put("/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Kiểm tra mã trạng thái 200 OK
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value())) // Kiểm tra mã phản hồi
                .andExpect(MockMvcResultMatchers.jsonPath("$.message")
                        .value("Update profile successfully")) // Kiểm tra thông báo
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.username")
                        .value("newusername")) // Kiểm tra tên người dùng
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.email")
                        .value("newemail@example.com")); // Kiểm tra email
    }

    @Test
    public void testChangePassword_Success() throws Exception {
        // Mock dữ liệu phản hồi từ service khi thay đổi mật khẩu
        ChangePasswordRequest changePasswordRequest = ChangePasswordRequest.builder()
                .oldPassword("oldpassword")
                .newPassword("newpassword")
                .build();
        String mockResponse = "Password changed successfully";
        when(accountService.changePassword(any(ChangePasswordRequest.class))).thenReturn(mockResponse);

        // Gửi yêu cầu PUT để thay đổi mật khẩu
        mockMvc.perform(MockMvcRequestBuilders.put("/profile/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(changePasswordRequest))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Kiểm tra mã trạng thái 200 OK
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value())) // Kiểm tra mã phản hồi
                .andExpect(MockMvcResultMatchers.jsonPath("$.message")
                        .value("Change password successfully")) // Kiểm tra thông báo
                .andExpect(MockMvcResultMatchers.jsonPath("$.result")
                        .value("Password changed successfully")); // Kiểm tra thông báo thay đổi mật khẩu
    }
}
