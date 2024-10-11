package com.rrms.rrms.services;

// Các import cần thiết cho việc kiểm thử
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.TypeRoomMapper;
import com.rrms.rrms.models.TypeRoom;
import com.rrms.rrms.repositories.TypeRoomRepository;
import com.rrms.rrms.services.servicesImp.TypeRoomService;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@SpringBootTest // Annotation để đánh dấu rằng lớp này là một lớp kiểm thử Spring Boot
@Slf4j // Annotation để cung cấp một logger cho lớp này
@AutoConfigureMockMvc // Annotation để tự động cấu hình MockMvc cho kiểm thử web
@FieldDefaults(level = AccessLevel.PRIVATE) // Đặt cấp độ truy cập cho các trường trong lớp là private
@TestPropertySource("/test.properties") // Chỉ định nguồn thuộc tính cho kiểm thử
public class TypeRoomServiceTest {

    @Autowired
    TypeRoomService typeRoomService; // Dịch vụ TypeRoom được tiêm vào để kiểm thử

    @MockBean
    TypeRoomRepository typeRoomRepository; // Giả lập cho repository TypeRoom

    @MockBean
    TypeRoomMapper typeRoomMapper; // Giả lập cho mapper TypeRoom

    TypeRoomRequest typeRoomRequest; // Đối tượng yêu cầu loại phòng
    TypeRoomResponse typeRoomResponse; // Đối tượng phản hồi loại phòng
    TypeRoom typeRoom; // Thực thể loại phòng

    @BeforeEach
    void init() {
        // Khởi tạo các đối tượng trước mỗi bài kiểm thử
        typeRoomRequest = TypeRoomRequest.builder()
                .name("test") // Đặt tên cho yêu cầu loại phòng
                .build();

        typeRoomResponse = TypeRoomResponse.builder()
                .name("test") // Đặt tên cho phản hồi loại phòng
                .build();

        typeRoom = new TypeRoom();
        typeRoom.setName("test"); // Khởi tạo thực thể loại phòng với tên "test"
    }

    @Test
    void createTypeRoom_success() {
        // Arrange: Thiết lập trạng thái cho các đối tượng giả lập
        when(typeRoomRepository.findByName(typeRoomRequest.getName()))
                .thenReturn(Optional.empty()); // Giả lập tìm kiếm không có kết quả
        when(typeRoomMapper.toTypeRoom(typeRoomRequest))
                .thenReturn(typeRoom); // Giả lập mapper chuyển đổi yêu cầu thành thực thể
        when(typeRoomRepository.save(typeRoom)).thenReturn(typeRoom); // Giả lập lưu trữ thực thể vào cơ sở dữ liệu
        when(typeRoomMapper.toTypeRoomResponse(typeRoom))
                .thenReturn(typeRoomResponse); // Giả lập mapper chuyển đổi thực thể thành phản hồi

        // Act: Gọi phương thức cần kiểm thử
        var response = typeRoomService.createTypeRoom(typeRoomRequest);

        // Assert: Kiểm tra kết quả phản hồi
        assertEquals(typeRoomResponse, response); // Kiểm tra rằng phản hồi khớp với phản hồi mong đợi

        // Verify: Xác minh rằng các phương thức đã được gọi đúng cách
        verify(typeRoomRepository)
                .findByName(typeRoomRequest.getName()); // Kiểm tra rằng phương thức findByName đã được gọi
        verify(typeRoomMapper).toTypeRoom(typeRoomRequest); // Kiểm tra rằng phương thức toTypeRoom đã được gọi
        verify(typeRoomRepository).save(typeRoom); // Kiểm tra rằng phương thức save đã được gọi
        verify(typeRoomMapper).toTypeRoomResponse(typeRoom); // Kiểm tra rằng phương thức toTypeRoomResponse đã được gọi
    }

    @Test
    void createTypeRoom_whenTypeRoomExists_throwsException() {
        // Arrange: Giả lập rằng TypeRoom đã tồn tại
        when(typeRoomRepository.findByName(typeRoomRequest.getName()))
                .thenReturn(Optional.of(typeRoom)); // Trả về Optional chứa thực thể loại phòng

        // Act & Assert: Kiểm tra ngoại lệ khi cố gắng tạo TypeRoom đã tồn tại
        AppException exception = assertThrows(AppException.class, () -> {
            typeRoomService.createTypeRoom(typeRoomRequest); // Gọi phương thức sẽ ném ngoại lệ
        });

        // Kiểm tra mã lỗi của ngoại lệ
        assertEquals(
                ErrorCode.TYPE_ROOM_EXIST, exception.getErrorCode()); // Kiểm tra rằng mã lỗi khớp với mã lỗi mong đợi
    }
}
