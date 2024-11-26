// package com.rrms.rrms.controllers;
//
// import static org.mockito.Mockito.when;
//
// import java.time.LocalDate;
// import java.util.Optional;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.TestPropertySource;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.rrms.rrms.dto.request.LoginRequest;
// import com.rrms.rrms.dto.response.LoginResponse;
// import com.rrms.rrms.enums.ErrorCode;
// import com.rrms.rrms.enums.Gender;
// import com.rrms.rrms.exceptions.AppException;
// import com.rrms.rrms.models.Account;
// import com.rrms.rrms.services.IAccountService;
// import com.rrms.rrms.services.IAuthorityService;
// import com.rrms.rrms.services.IMailService;
//
// @SpringBootTest
// @AutoConfigureMockMvc
// @TestPropertySource("/test.properties")
// public class AuthenControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private IAccountService accountService;
//
//    @MockBean
//    private IAuthorityService authorityService;
//
//    @MockBean
//    private IMailService mailService;
//
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setup() {
//        objectMapper = new ObjectMapper();
//    }
//    //
//    //    @Test
//    //    void errorEndpoint_returnsUnauthorizedWithErrorMessage() throws Exception {
//    //        mockMvc.perform(MockMvcRequestBuilders.get("/authen/error"))
//    //                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
//    //                .andExpect(MockMvcResultMatchers.content().string("Đăng nhập thất bại!"));
//    //    }
//    //
//    //    @Test
//    //    void loginSuccess_withNullOAuth2User_returnsBadRequest() throws Exception {
//    //        mockMvc.perform(MockMvcRequestBuilders.get("/authen/success"))
//    //                .andExpect(MockMvcResultMatchers.status().isBadRequest())
//    //                .andExpect(MockMvcResultMatchers.content().string("Không xác thực được tài khoản Google"));
//    //    }
//    //
//    //    @Test
//    //    void loginSuccess_withMissingEmailOrName_returnsBadRequest() throws Exception {
//    //        // Arrange
//    //        Map<String, Object> attributes = new HashMap<>();
//    //        attributes.put("name", "Test User"); // Thiếu email
//    //
//    //        OAuth2User oauthUser = mock(OAuth2User.class);
//    //        when(oauthUser.getAttributes()).thenReturn(attributes);
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.get("/authen/success").requestAttr("oauth2User", oauthUser))
//    //                .andExpect(MockMvcResultMatchers.status().isBadRequest())
//    //                .andExpect(MockMvcResultMatchers.content().string("Không lấy được thông tin email hoặc tên"));
//    //    }
//    //
//    @Test
//    void login_withValidCredentials_returnsSuccess() throws Exception {
//        // Arrange
//        LoginRequest loginRequest = new LoginRequest("0123456789", "password");
//        LoginResponse loginResponse = LoginResponse.builder()
//                .token("jwt-token")
//                .authenticated(true)
//                .username("0123456789")
//                .fullname("John Doe")
//                .phone("0123456789")
//                .email("johndoe@example.com")
//                .avatar("avatar_url")
//                .birthday(LocalDate.of(1990, 1, 1))
//                .gender(Gender.MALE)
//                .cccd("123456789")
//                .build();
//
//        when(authorityService.loginResponse(loginRequest)).thenReturn(loginResponse);
//        when(accountService.findByPhone("0123456789")).thenReturn(Optional.of(new Account()));
//
//        // Act & Assert
//        mockMvc.perform(MockMvcRequestBuilders.post("/authen/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(loginRequest)))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(true))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đăng nhập thành công."))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.token").value("jwt-token"));
//    }
//
//    @Test
//    void login_withInvalidCredentials_returnsUnauthorized() throws Exception {
//        // Arrange
//        LoginRequest loginRequest = new LoginRequest("0123456789", "wrongpassword");
//
//        when(accountService.findByPhone("0123456789")).thenReturn(Optional.of(new Account()));
//        when(authorityService.loginResponse(loginRequest)).thenThrow(new AppException(ErrorCode.UNAUTHORIZED));
//
//        // Act & Assert
//        mockMvc.perform(MockMvcRequestBuilders.post("/authen/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(loginRequest)))
//                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(false))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Sai mật khẩu"));
//    }
//
//    //    @Test
//    //    void logout_withValidRequest_returnsSuccess() throws Exception {
//    //        // Arrange
//    //        LogoutRequest logoutRequest = new LogoutRequest("valid-token");
//    //        doNothing().when(authorityService).logout(logoutRequest);
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/logout")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(logoutRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isOk())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(true))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đăng xuất thành công."));
//    //    }
//    //
//    //    @Test
//    //    void logout_withInvalidToken_returnsUnauthorized() throws Exception {
//    //        // Arrange
//    //        LogoutRequest logoutRequest = new LogoutRequest("invalid-token");
//    //        doThrow(new ParseException("Invalid token", 0)).when(authorityService).logout(logoutRequest);
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/logout")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(logoutRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(false))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Token không hợp lệ: Invalid
//    // token"));
//    //    }
//
//    //    @Test
//    //    void register_withValidRequest_returnsSuccess() throws Exception {
//    //        // Arrange
//    //        RegisterRequest registerRequest = RegisterRequest.builder()
//    //                .username("testuser")
//    //                .email("test@example.com")
//    //                .password("password")
//    //                .userType("CUSTOMER")
//    //                .build();
//    //
//    //        Account account = new Account();
//    //        account.setUsername("testuser");
//    //
//    //        when(accountService.register(registerRequest)).thenReturn(account);
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/register")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(registerRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isOk())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(true))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đăng ký thành công"))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("testuser"));
//    //    }
//    //
//    //    @Test
//    //    void register_withExistingAccount_returnsBadRequest() throws Exception {
//    //        // Arrange
//    //        RegisterRequest registerRequest = RegisterRequest.builder()
//    //                .username("testuser")
//    //                .email("test@example.com")
//    //                .password("password")
//    //                .userType("CUSTOMER")
//    //                .build();
//    //
//    //        when(accountService.register(registerRequest)).thenThrow(new
//    // AppException(ErrorCode.ACCOUNT_ALREADY_EXISTS));
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/register")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(registerRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isBadRequest())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(false))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tài khoản đã tồn tại"));
//    //    }
//    //
//    //    @Test
//    //    void register_withUnexpectedError_returnsInternalServerError() throws Exception {
//    //        // Arrange
//    //        RegisterRequest registerRequest = RegisterRequest.builder()
//    //                .username("testuser")
//    //                .email("test@example.com")
//    //                .password("password")
//    //                .userType("CUSTOMER")
//    //                .build();
//    //
//    //        when(accountService.register(registerRequest)).thenThrow(new RuntimeException("Unexpected error"));
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/register")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(registerRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(false))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Đã xảy ra lỗi trong quá trình đăng
//    // ký."));
//    //    }
//    //
//    //    @Test
//    //    void loginSuccess_withValidOAuth2User_returnsToken() throws Exception {
//    //        // Arrange
//    //        Map<String, Object> attributes = new HashMap<>();
//    //        attributes.put("email", "test@gmail.com");
//    //        attributes.put("name", "Test User");
//    //
//    //        OAuth2User oauthUser = mock(OAuth2User.class);
//    //        when(oauthUser.getAttributes()).thenReturn(attributes);
//    //
//    //        Account account = new Account();
//    //        account.setEmail("test@gmail.com");
//    //        when(accountService.findByEmail("test@gmail.com")).thenReturn(Optional.of(account));
//    //        when(authorityService.generateToken(account)).thenReturn("jwt-token");
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.get("/authen/success").requestAttr("oauth2User", oauthUser))
//    //                .andExpect(MockMvcResultMatchers.status().isOk())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.token").value("jwt-token"));
//    //    }
//    //
//    //    @Test
//    //    void introspect_withValidToken_returnsTokenDetails() throws Exception {
//    //        // Arrange
//    //        IntrospecTokenRequest introspecTokenRequest = new IntrospecTokenRequest("valid-token");
//    //        IntrospecTokenResponse introspecTokenResponse = IntrospecTokenResponse.builder()
//    //                .valid(true)
//    //                .message("Token is valid")
//    //                .subject("0123456789")
//    //                .expirationTime(new Date(System.currentTimeMillis() + 3600000))
//    //                .issuer("Auth Server")
//    //                .issuedAt(new Date())
//    //                .roles(Arrays.asList("ROLE_USER", "ROLE_ADMIN"))
//    //                .permissions(Arrays.asList("READ", "WRITE"))
//    //                .build();
//    //
//    //        when(authorityService.introspect(introspecTokenRequest)).thenReturn(introspecTokenResponse);
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/introspect")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(introspecTokenRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isOk())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.valid").value(true))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Token is valid"))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.subject").value("0123456789"))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.roles[0]").value("ROLE_USER"))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.roles[1]").value("ROLE_ADMIN"));
//    //    }
//    //
//    //    @Test
//    //    void refreshToken_withValidRequest_returnsNewToken() throws Exception {
//    //        // Arrange
//    //        RefreshRequest refreshRequest = new RefreshRequest("refresh-token");
//    //        LoginResponse loginResponse = LoginResponse.builder()
//    //                .token("new-jwt-token")
//    //                .authenticated(true)
//    //                .build();
//    //
//    //        when(authorityService.refreshToken(refreshRequest)).thenReturn(loginResponse);
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/refreshToken")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(refreshRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isOk())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(true))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Làm mới token thành công."))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.data.token").value("new-jwt-token"));
//    //    }
//    //
//    //    @Test
//    //    void refreshToken_withInvalidToken_returnsUnauthorized() throws Exception {
//    //        // Arrange
//    //        RefreshRequest refreshRequest = new RefreshRequest("invalid-token");
//    //
//    //        when(authorityService.refreshToken(refreshRequest))
//    //                .thenThrow(new AppException(ErrorCode.INVALID_REFRESH_TOKEN));
//    //
//    //        // Act & Assert
//    //        mockMvc.perform(MockMvcRequestBuilders.post("/authen/refreshToken")
//    //                        .contentType(MediaType.APPLICATION_JSON)
//    //                        .content(objectMapper.writeValueAsString(refreshRequest)))
//    //                .andExpect(MockMvcResultMatchers.status().isUnauthorized())
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(false))
//    //                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Token không hợp lệ."));
//    //    }
// }
