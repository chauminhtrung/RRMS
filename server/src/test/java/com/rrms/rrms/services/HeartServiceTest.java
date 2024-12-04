// package com.rrms.rrms.services;
//
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;
// import static org.mockito.Mockito.verify;
//
// import java.util.*;
//
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.mockito.junit.jupiter.MockitoExtension;
//
// import com.rrms.rrms.dto.request.AccountRequest;
// import com.rrms.rrms.dto.response.AccountResponse;
// import com.rrms.rrms.dto.response.HeartResponse;
// import com.rrms.rrms.dto.response.RoomDetailResponse;
// import com.rrms.rrms.mapper.HeartMapper;
// import com.rrms.rrms.models.Heart;
// import com.rrms.rrms.models.Room;
// import com.rrms.rrms.repositories.HeartRepository;
// import com.rrms.rrms.repositories.RoomRepository;
// import com.rrms.rrms.services.servicesImp.HeartService;
//
// import lombok.extern.slf4j.Slf4j;
//
// @ExtendWith(MockitoExtension.class)
// @Slf4j
// public class HeartServiceTest {
//
//    @Mock
//    private HeartRepository heartRepository;
//
//    @Mock
//    private HeartMapper heartMapper;
//
//    @InjectMocks
//    private HeartService heartService; // Hoặc lớp chứa phương thức bạn đang test
//
//    @Mock
//    private RoomRepository roomRepository;
//
//    @Mock
//    private Heart heart;
//
//    private Room room;
//    private AccountResponse accountResponse;
//    private RoomDetailResponse roomDetailResponse;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void getHeartByAccount_existingAccount_returnsHeartResponse() {
//        // Mock data
//        String username = "testUser";
//        AccountRequest accountRequest = new AccountRequest();
//        accountRequest.setUsername(username);
//
//        Heart mockHeart = new Heart(); // Tạo đối tượng Heart mock
//        HeartResponse mockHeartResponse = new HeartResponse(); // Tạo đối tượng HeartResponse mock
//
//        // Mocking the repository and mapper
//        when(heartRepository.findHeartByAccount_Username(username)).thenReturn(mockHeart);
//        when(heartMapper.heartToHeartResponse(mockHeart)).thenReturn(mockHeartResponse);
//
//        // Call the method
//        HeartResponse response = heartService.getHeartByAccount(accountRequest);
//
//        // Verify results
//        assertNotNull(response);
//        assertEquals(mockHeartResponse, response);
//
//        // Verify interactions
//        verify(heartRepository).findHeartByAccount_Username(username);
//        verify(heartMapper).heartToHeartResponse(mockHeart);
//    }
//
//    @Test
//    void getHeartByAccount_nonExistingAccount_returnsNull() {
//        // Mock data
//        String username = "nonExistingUser";
//        AccountRequest accountRequest = new AccountRequest();
//        accountRequest.setUsername(username);
//
//        // Mocking the repository to return null
//        when(heartRepository.findHeartByAccount_Username(username)).thenReturn(null);
//
//        // Call the method
//        HeartResponse response = heartService.getHeartByAccount(accountRequest);
//
//        // Verify results
//        assertNull(response);
//
//        // Verify interactions
//        verify(heartRepository).findHeartByAccount_Username(username);
//        verifyNoInteractions(heartMapper); // Không gọi mapper khi repository trả về null
//    }
//
//    @Test
//    void removeHeart_whenHeartAndRoomExist_shouldRemoveRoom() {
//        // Khởi tạo đối tượng AccountResponse với username
//        accountResponse = new AccountResponse();
//        accountResponse.setUsername("testUser"); // Set username cho accountResponse
//
//        // Khởi tạo RoomDetailResponse với roomId
//        roomDetailResponse = new RoomDetailResponse();
//        roomDetailResponse.setRoomId(UUID.randomUUID()); // Set roomId cho roomDetailResponse
//
//        // Khởi tạo Room
//        room = new Room();
//        room.setRoomId(roomDetailResponse.getRoomId());
//
//        // Khởi tạo Heart với các Room liên quan
//        heart = new Heart();
//        heart.setRooms(new ArrayList<>()); // Dùng ArrayList hoặc Set<Room> tùy vào khai báo của Heart
//        heart.getRooms().add(room); // Thêm phòng vào Heart
//
//        // Cấu hình khi tìm Heart theo account (ví dụ: accountId hoặc một thuộc tính khác)
//        when(heartRepository.findHeartByAccount_Username(anyString())).thenReturn(heart);
//        when(roomRepository.getOne(any(UUID.class))).thenReturn(room); // Mock phòng trả về khi gọi getOne
//        // Case: Heart và Room đều tồn tại
//
//        // Khi gọi phương thức removeHeart
//        HeartResponse response = heartService.removeHeart(accountResponse, roomDetailResponse);
//
//        // Kiểm tra rằng room đã được xóa khỏi Heart
//        assertNull(response); // Nếu phương thức trả về null khi không thành công
//
//        // Xác nhận rằng chúng ta đã gọi phương thức findHeartByAccount_Username và roomRepository.getOne
//        verify(heartRepository).findHeartByAccount_Username(anyString());
//        verify(roomRepository).getOne(any(UUID.class));
//    }
//
//    @Test
//    void removeHeart_whenRoomDoesNotExist_shouldReturnNull() {
//        // Tạo dữ liệu giả cho Heart, AccountResponse và RoomDetailResponse
//        AccountResponse accountResponse = new AccountResponse();
//        accountResponse.setUsername("test_user");
//
//        RoomDetailResponse roomDetailResponse = new RoomDetailResponse();
//        roomDetailResponse.setRoomId(UUID.randomUUID());
//
//        // Tạo đối tượng Heart
//        Heart heart = new Heart();
//
//        // Giả lập hành vi của heartRepository
//        when(heartRepository.findHeartByAccount_Username(anyString())).thenReturn(heart);
//
//        // Khi gọi phương thức removeHeart
//        HeartResponse response = heartService.removeHeart(accountResponse, roomDetailResponse);
//
//        // Kiểm tra rằng response trả về null khi không tìm thấy Room
//        assertNull(response, "The response should be null when the room does not exist.");
//
//        // Xác nhận rằng chúng ta đã gọi phương thức findHeartByAccount_Username
//        verify(heartRepository).findHeartByAccount_Username(anyString());
//    }
//
//    @Test
//    void addHeart_whenHeartAndRoomExistAndRoomNotInHeart_shouldAddRoomAndReturnHeartResponse() {
//        // Mock data
//        String username = "testUser";
//        UUID roomId = UUID.randomUUID(); // Sử dụng UUID thay vì Long
//
//        AccountResponse accountResponse = new AccountResponse();
//        accountResponse.setUsername(username);
//
//        RoomDetailResponse roomDetailResponse = new RoomDetailResponse();
//        roomDetailResponse.setRoomId(roomId);
//
//        Heart mockHeart = new Heart();
//        mockHeart.setHeartId(any());
//        mockHeart.setRooms(new ArrayList<>()); // Danh sách Room ban đầu rỗng
//
//        Room mockRoom = new Room();
//        mockRoom.setRoomId(roomId);
//
//        HeartResponse mockHeartResponse = new HeartResponse();
//
//        // Mocking repository and mapper behavior
//        when(heartRepository.findHeartByAccount_Username(username)).thenReturn(mockHeart);
//        when(roomRepository.getOne(roomId)).thenReturn(mockRoom);
//        when(heartMapper.heartToHeartResponse(mockHeart)).thenReturn(mockHeartResponse);
//
//        // Call the method
//        HeartResponse response = heartService.addHeart(accountResponse, roomDetailResponse);
//
//        // Verify results
//        assertNotNull(response);
//        assertEquals(mockHeartResponse, response);
//        assertTrue(mockHeart.getRooms().contains(mockRoom));
//
//        // Verify interactions
//        verify(heartRepository).findHeartByAccount_Username(username);
//        verify(roomRepository).getOne(roomId);
//        verify(heartRepository).save(mockHeart);
//        verify(heartMapper).heartToHeartResponse(mockHeart);
//    }
//
//    @Test
//    void addHeart_whenHeartAndRoomExistButRoomAlreadyInHeart_shouldReturnNull() {
//        // Mock data
//        String username = "testUser";
//        UUID roomId = UUID.randomUUID(); // Sử dụng UUID thay vì Long
//
//        AccountResponse accountResponse = new AccountResponse();
//        accountResponse.setUsername(username);
//
//        RoomDetailResponse roomDetailResponse = new RoomDetailResponse();
//        roomDetailResponse.setRoomId(roomId);
//
//        Room mockRoom = new Room();
//        mockRoom.setRoomId(roomId);
//
//        Heart mockHeart = new Heart();
//        mockHeart.setHeartId(any());
//        mockHeart.setRooms(new ArrayList<>(List.of(mockRoom))); // Room đã có trong danh sách
//
//        // Mocking repository behavior
//        when(heartRepository.findHeartByAccount_Username(username)).thenReturn(mockHeart);
//        when(roomRepository.getOne(roomId)).thenReturn(mockRoom);
//
//        // Call the method
//        HeartResponse response = heartService.addHeart(accountResponse, roomDetailResponse);
//
//        // Verify results
//        assertNull(response);
//        verify(heartRepository).findHeartByAccount_Username(username);
//        verify(roomRepository).getOne(roomId);
//        verifyNoInteractions(heartMapper); // Mapper không được gọi
//        verify(heartRepository, never()).save(any());
//    }
// }
