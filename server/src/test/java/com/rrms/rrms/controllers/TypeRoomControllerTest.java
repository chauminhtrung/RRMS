package com.rrms.rrms.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.services.ITypeRoom;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@SpringBootTest // Khởi động toàn bộ ứng dụng Spring Boot để test
@Slf4j // Cung cấp logging thông qua Lombok
@AutoConfigureMockMvc // Tự động cấu hình đối tượng MockMvc cho các test liên quan đến HTTP request
@FieldDefaults(level = AccessLevel.PRIVATE) // Tự động gán các thuộc tính trong class là private
@TestPropertySource("/test.properties") // Sử dụng tệp cấu hình test riêng (test.properties)
public class TypeRoomControllerTest {

    @Autowired
    MockMvc mockMvc; // Dùng để thực hiện các request HTTP giả lập trong các test

    @MockBean
    ITypeRoom typeRoomService; // Tạo mock của ITypeRoom service để không cần dùng đến service thực tế

    TypeRoomRequest typeRoomRequest; // Đối tượng request giả lập dùng trong test
    TypeRoomResponse typeRoomResponse; // Đối tượng response giả lập dùng trong test

    @BeforeEach // Hàm này sẽ được chạy trước mỗi test để khởi tạo các đối tượng
    void init() {
        // Tạo đối tượng request giả lập với tên là "test"
        typeRoomRequest = TypeRoomRequest.builder()
                .name("test")
                .build();

        // Tạo đối tượng response giả lập với tên là "test"
        typeRoomResponse = TypeRoomResponse.builder()
                .name("test")
                .build();
    }

    @Test // Annotation chỉ ra đây là một phương thức kiểm thử
    void createTypeRoom_success() throws Exception {
        // Tạo đối tượng ObjectMapper để chuyển đổi đối tượng Java thành chuỗi JSON
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // Đăng ký module hỗ trợ Java 8 time (LocalDate, etc.)

        // Chuyển đối tượng typeRoomRequest thành chuỗi JSON
        String content = objectMapper.writeValueAsString(typeRoomRequest);

        // Định nghĩa hành vi của typeRoomService: khi gọi hàm createTypeRoom với bất kỳ tham số nào, sẽ trả về typeRoomResponse
        when(typeRoomService.createTypeRoom(ArgumentMatchers.any())).thenReturn(typeRoomResponse);

        // Thực hiện một POST request đến endpoint "/type-rooms" với nội dung là JSON của typeRoomRequest
        mockMvc.perform(MockMvcRequestBuilders.post("/type-rooms")
                        .contentType(MediaType.APPLICATION_JSON) // Xác định kiểu dữ liệu là JSON
                        .content(content)) // Nội dung của request là JSON đã chuyển đổi
                .andExpect(MockMvcResultMatchers.status().isCreated()); // Kiểm tra xem HTTP status trả về có phải là 201 Created không
    }
}
