package com.rrms.rrms.controllers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.request.ChangePasswordRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.services.IAccountService;

@WebMvcTest(AccountController.class)
@TestPropertySource("/test.properties")
@Import(SecurityConfigTest.class) // Bỏ qua bảo mật
public class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IAccountService accountService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mock Security Context
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("testUser");
        when(authentication.getAuthorities()).thenReturn(Collections.emptyList());

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        objectMapper = new ObjectMapper();
    }

    @Test
    void testGetAllAccount_Success() throws Exception {
        // Giả lập dữ liệu trả về từ service
        List<AccountResponse> fakeAccounts = List.of(
                new AccountResponse(), // Thay bằng đối tượng giả mô phỏng dữ liệu
                new AccountResponse());
        when(accountService.findAll()).thenReturn(fakeAccounts);

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/get-all-account").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Call api success"))
                .andExpect(jsonPath("$.data").isArray());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).findAll();
    }

    @Test
    void testGetAllAccount_Failure() throws Exception {
        // Giả lập ngoại lệ khi gọi service
        when(accountService.findAll()).thenThrow(new RuntimeException("Database error"));

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/get-all-account").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Call api failed"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).findAll();
    }

    @Test
    void testGetAccountsByHostRole_Success_WithData() throws Exception {
        // Giả lập dữ liệu trả về từ service
        List<AccountResponse> fakeAccounts = List.of(
                new AccountResponse(), // Thay bằng đối tượng giả mô phỏng dữ liệu
                new AccountResponse());
        when(accountService.getAccountsByRole(Roles.HOST)).thenReturn(fakeAccounts);

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/by-host-role").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Call api success"))
                .andExpect(jsonPath("$.data").isArray());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).getAccountsByRole(Roles.HOST);
    }

    @Test
    void testGetAccountsByHostRole_Success_NoData() throws Exception {
        // Giả lập trường hợp không có dữ liệu trả về từ service
        when(accountService.getAccountsByRole(Roles.HOST)).thenReturn(Collections.emptyList());

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/by-host-role").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("No accounts found for HOST role"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).getAccountsByRole(Roles.HOST);
    }

    @Test
    void testGetAccountsByHostRole_Failure() throws Exception {
        // Giả lập ngoại lệ khi gọi service
        when(accountService.getAccountsByRole(Roles.HOST)).thenThrow(new RuntimeException("Database error"));

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/by-host-role").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Call api failed"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).getAccountsByRole(Roles.HOST);
    }

    @Test
    void testGetAccountByUsername_Success() throws Exception {
        // Giả lập dữ liệu trả về từ service
        String username = "testUser";
        AccountResponse fakeAccount = new AccountResponse();
        fakeAccount.setUsername(username); // Thiết lập các thuộc tính khác nếu cần

        when(accountService.findByUsername(username)).thenReturn(fakeAccount);

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/{username}", username).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).findByUsername(username);
    }

    @Test
    void testGetAccountByUsername_NotFound() throws Exception {
        // Giả lập trường hợp username không tồn tại
        String username = "nonExistentUser";
        when(accountService.findByUsername(username)).thenThrow(new UsernameNotFoundException("User not found"));

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/{username}", username).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Call API failed"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).findByUsername(username);
    }

    @Test
    void testGetAccountByUsername_Failure() throws Exception {
        // Giả lập ngoại lệ bất ngờ
        String username = "testUser";
        when(accountService.findByUsername(username)).thenThrow(new RuntimeException("Unexpected error"));

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/{username}", username).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Call API failed"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).findByUsername(username);
    }

    @Test
    void testCreateAccount_Success() throws Exception {
        // Dữ liệu đầu vào giả lập
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setUsername("testUser");
        accountRequest.setPassword("password123");

        // Dữ liệu trả về giả lập
        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setUsername("testUser");

        when(accountService.createAccount(any(AccountRequest.class))).thenReturn(accountResponse);

        // Gửi yêu cầu POST và kiểm tra phản hồi
        mockMvc.perform(post("/api-accounts/createAccount")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Account created successfully"))
                .andExpect(jsonPath("$.data.username").value("testUser"));

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).createAccount(any(AccountRequest.class));
    }

    @Test
    void testCreateAccount_Conflict() throws Exception {
        // Dữ liệu đầu vào giả lập
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setUsername("existingUser");
        accountRequest.setPassword("password123");

        // Giả lập ngoại lệ khi tạo tài khoản
        when(accountService.createAccount(any(AccountRequest.class)))
                .thenThrow(new AppException(ErrorCode.ACCOUNT_ALREADY_EXISTS));

        // Gửi yêu cầu POST và kiểm tra phản hồi
        mockMvc.perform(post("/api-accounts/createAccount")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).createAccount(any(AccountRequest.class));
    }

    @Test
    void testCreateAccount_Failure() throws Exception {
        // Dữ liệu đầu vào giả lập
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setUsername("testUser");
        accountRequest.setPassword("password123");

        // Giả lập lỗi không mong đợi
        when(accountService.createAccount(any(AccountRequest.class)))
                .thenThrow(new RuntimeException("Unexpected error"));

        // Gửi yêu cầu POST và kiểm tra phản hồi
        mockMvc.perform(post("/api-accounts/createAccount")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Account creation failed: Unexpected error"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).createAccount(any(AccountRequest.class));
    }

    @Test
    void testUpdateAccount_Success() throws Exception {
        // Dữ liệu đầu vào giả lập
        String username = "testUser";
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setFullname("Updated Name");
        accountRequest.setEmail("updatedemail@example.com");

        // Dữ liệu trả về giả lập
        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setUsername(username);
        accountResponse.setFullname("Updated Name");
        accountResponse.setEmail("updatedemail@example.com");

        when(accountService.updateAccount(eq(username), any(AccountRequest.class)))
                .thenReturn(accountResponse);

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/updateAccount/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Account updated successfully"))
                .andExpect(jsonPath("$.data.username").value(username))
                .andExpect(jsonPath("$.data.email").value("updatedemail@example.com"));

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).updateAccount(eq(username), any(AccountRequest.class));
    }

    @Test
    void testUpdateAccount_NotFound() throws Exception {
        // Dữ liệu đầu vào giả lập
        String username = "nonExistentUser";
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setFullname("Updated Name");

        // Giả lập ngoại lệ khi username không tồn tại
        when(accountService.updateAccount(eq(username), any(AccountRequest.class)))
                .thenThrow(new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/updateAccount/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Error updating account: Account not found"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).updateAccount(eq(username), any(AccountRequest.class));
    }

    @Test
    void testUpdateAccount_Failure() throws Exception {
        // Dữ liệu đầu vào giả lập
        String username = "testUser";
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setFullname("Updated Name");

        // Giả lập lỗi không mong đợi
        when(accountService.updateAccount(eq(username), any(AccountRequest.class)))
                .thenThrow(new RuntimeException("Unexpected error"));

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/updateAccount/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(accountRequest)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Account update failed: Unexpected error"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).updateAccount(eq(username), any(AccountRequest.class));
    }

    @Test
    void testDeleteAccount_Success() throws Exception {
        // Giả lập service không ném ra ngoại lệ
        String username = "testUser";
        doNothing().when(accountService).deleteAccount(username);

        // Gửi yêu cầu DELETE và kiểm tra phản hồi
        mockMvc.perform(delete("/api-accounts/deleteAccount/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Account deleted successfully"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).deleteAccount(username);
    }

    @Test
    void testDeleteAccount_NotFound() throws Exception {
        // Giả lập ngoại lệ khi tài khoản không tồn tại
        String username = "nonExistentUser";
        doThrow(new AppException(ErrorCode.ACCOUNT_NOT_FOUND))
                .when(accountService)
                .deleteAccount(username);

        // Gửi yêu cầu DELETE và kiểm tra phản hồi
        mockMvc.perform(delete("/api-accounts/deleteAccount/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Error deleting account: Account not found"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).deleteAccount(username);
    }

    @Test
    void testDeleteAccount_Failure() throws Exception {
        // Giả lập lỗi không mong đợi
        String username = "testUser";
        doThrow(new RuntimeException("Unexpected error")).when(accountService).deleteAccount(username);

        // Gửi yêu cầu DELETE và kiểm tra phản hồi
        mockMvc.perform(delete("/api-accounts/deleteAccount/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Account deletion failed: Unexpected error"))
                .andExpect(jsonPath("$.data").isEmpty());

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).deleteAccount(username);
    }

    @Test
    void testUpdateAccount_Success_02() throws Exception {
        // Giả lập dữ liệu đầu vào và kết quả
        String username = "testUser";
        Account inputAccount = new Account(); // Tạo đối tượng Account đầu vào
        inputAccount.setFullname("Updated Name");
        inputAccount.setAuthorities(new ArrayList<>()); // Khởi tạo authorities là một danh sách rỗng

        Account updatedAccount = new Account(); // Tạo đối tượng Account kết quả
        updatedAccount.setFullname("Updated Name");
        updatedAccount.setAuthorities(new ArrayList<>()); // Đảm bảo authorities cũng được thiết lập

        when(accountService.updateAcc(eq(username), any(Account.class))).thenReturn(updatedAccount);

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/update-acc")
                        .param("username", username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(inputAccount))) // Serialize JSON
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Update product successful"))
                .andExpect(jsonPath("$.data.fullname").value("Updated Name")); // Sửa lại jsonPath cho fullname

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).updateAcc(eq(username), any(Account.class));
    }

    @Test
    void testUpdateAccount_NotFound_02() throws Exception {
        // Giả lập trường hợp tài khoản không tồn tại
        String username = "nonExistentUser";
        Account inputAccount = new Account();
        inputAccount.setFullname("Test Name");
        inputAccount.setAuthorities(new ArrayList<>()); // Khởi tạo authorities với danh sách trống

        when(accountService.updateAcc(eq(username), any(Account.class)))
                .thenThrow(new EntityNotFoundException("Account not found"));

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/update-acc")
                        .param("username", username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(inputAccount))) // Serialize JSON
                .andExpect(status().isNotFound()) // Kiểm tra mã lỗi 404
                .andExpect(jsonPath("$.status").value(false)) // Kiểm tra status là false
                .andExpect(
                        jsonPath("$.message").value("Account not found: Account not found")) // Kiểm tra thông điệp lỗi
                .andExpect(jsonPath("$.data").isEmpty()); // Kiểm tra dữ liệu trả về rỗng

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).updateAcc(eq(username), any(Account.class));
    }

    @Test
    void testGetProfile_Success() throws Exception {
        // Giả lập dữ liệu
        String username = "testUser";
        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setUsername(username);
        accountResponse.setEmail("test@example.com");

        when(accountService.findByUsername(username)).thenReturn(accountResponse);

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/profile")
                        .param("username", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.message").value("Get profile successfully"))
                .andExpect(jsonPath("$.result.username").value(username))
                .andExpect(jsonPath("$.result.email").value("test@example.com"));

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).findByUsername(username);
    }

    @Test
    void testGetProfile_NotFound() throws Exception {
        // Giả lập trường hợp tài khoản không tồn tại
        String username = "nonExistentUser";

        when(accountService.findByUsername(username)).thenThrow(new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        // Gửi yêu cầu GET và kiểm tra phản hồi
        mockMvc.perform(get("/api-accounts/profile")
                        .param("username", username)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(HttpStatus.NOT_FOUND.value()))
                .andExpect(jsonPath("$.message").value("Account not found"));

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).findByUsername(username);
    }

    @Test
    void testUpdateProfile_Success() throws Exception {
        // Giả lập dữ liệu đầu vào
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setUsername("testUser");
        accountRequest.setEmail("newemail@example.com");

        // Giả lập dữ liệu trả về từ service
        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setUsername("testUser");
        accountResponse.setEmail("newemail@example.com");

        when(accountService.update(accountRequest)).thenReturn(accountResponse);

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.message").value("Update profile successfully"))
                .andExpect(jsonPath("$.result.username").value("testUser"))
                .andExpect(jsonPath("$.result.email").value("newemail@example.com"));

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).update(accountRequest);
    }

    @Test
    void testUpdateProfile_Failure() throws Exception {
        // Giả lập trường hợp lỗi không mong đợi trong service
        AccountRequest accountRequest = new AccountRequest();
        accountRequest.setUsername("testUser");
        accountRequest.setEmail("newemail@example.com");

        when(accountService.update(accountRequest)).thenThrow(new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        // Gửi yêu cầu PUT và kiểm tra phản hồi lỗi
        mockMvc.perform(put("/api-accounts/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(accountRequest)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(HttpStatus.NOT_FOUND.value()))
                .andExpect(jsonPath("$.message").value("Account not found"));

        // Kiểm tra phương thức service được gọi
        verify(accountService, times(1)).update(accountRequest);
    }

    @Test
    void testChangePassword_Success() throws Exception {
        // Giả lập thay đổi mật khẩu thành công
        ChangePasswordRequest changePasswordRequest = ChangePasswordRequest.builder()
                .oldPassword("oldPassword")
                .newPassword("newPassword")
                .build();
        when(accountService.changePassword(any(ChangePasswordRequest.class)))
                .thenReturn("Password changed successfully");

        // Gửi yêu cầu PUT và kiểm tra phản hồi
        mockMvc.perform(put("/api-accounts/profile/change-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(changePasswordRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Change password successfully"))
                .andExpect(jsonPath("$.result").value("Password changed successfully"));

        // Kiểm tra xem phương thức trong service có được gọi hay không
        verify(accountService, times(1)).changePassword(any(ChangePasswordRequest.class));
    }

    @Test
    public void testSearchAccounts_withNoSearchTerm() throws Exception {
        // Mô phỏng accountService.findAll()
        List<AccountResponse> mockAccounts = Arrays.asList(
                new AccountResponse().builder().username("user1").build(),
                new AccountResponse().builder().username("user2").build());
        ;
        Mockito.when(accountService.findAll()).thenReturn(mockAccounts);

        // Gửi yêu cầu không có tham số tìm kiếm
        mockMvc.perform(get("/search")).andExpect(status().isNotFound());
    }

    @Test
    public void testSearchAccounts_withSearchTermNoResults() throws Exception {
        // Mô phỏng accountService.searchAccounts() trả về danh sách rỗng
        Mockito.when(accountService.searchAccounts("nonexistent")).thenReturn(Collections.emptyList());

        // Gửi yêu cầu với tham số tìm kiếm không có kết quả
        mockMvc.perform(get("/search").param("search", "nonexistent")).andExpect(status().isNotFound());
    }

    @Test
    public void testSearchAccounts_withSearchTermResults() throws Exception {
        // Mô phỏng accountService.searchAccounts() trả về danh sách tài khoản tìm được
        List<AccountResponse> mockAccounts =
                Arrays.asList(new AccountResponse().builder().username("user1").build());
        Mockito.when(accountService.searchAccounts("user1")).thenReturn(mockAccounts);

        // Gửi yêu cầu với tham số tìm kiếm có kết quả
        mockMvc.perform(get("/search").param("search", "user1")).andExpect(status().isNotFound());
    }

    @Test
    public void testSearchAccounts_withException() throws Exception {
        // Mô phỏng một exception xảy ra khi gọi accountService
        Mockito.when(accountService.searchAccounts(anyString())).thenThrow(new RuntimeException("Internal error"));

        // Gửi yêu cầu với tham số tìm kiếm gây lỗi
        mockMvc.perform(get("/search").param("search", "error")).andExpect(status().isNotFound());
    }
}
