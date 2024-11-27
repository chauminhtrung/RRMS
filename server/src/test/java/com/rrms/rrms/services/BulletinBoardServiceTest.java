package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.elasticsearch.ResourceNotFoundException;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.BulletinBoardTableResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.BulletinBoardMapper;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.servicesImp.BulletinBoardService;

@ExtendWith(MockitoExtension.class)
public class BulletinBoardServiceTest {

    @InjectMocks
    BulletinBoardService bulletinBoardService;

    @Mock
    AccountRepository accountRepository;

    @Mock
    BulletinBoardRepository bulletinBoardRepository;

    @Mock
    BulletinBoardMapper bulletinBoardMapper;

    @Mock
    BulletinBoardImageRepository bulletinBoardImageRepository;

    @Mock
    BulletinBoardRuleRepository bulletinBoardRuleRepository;

    @Mock
    BulletinBoards_RentalAmRepository bulletinBoards_RentalAmRepository;

    @Mock
    RentalAmenitiesRepository rentalAmenitiesRepository;

    @Mock
    RuleRepository ruleRepository;

    BulletinBoardRequest bulletinBoardRequest;
    BulletinBoardResponse bulletinBoardResponse;
    BulletinBoard bulletinBoard;
    Account account;
    RentalAmenities rentalAmenities;
    UUID bulletinBoardId;

    @BeforeEach
    void init() {
        // Tạo các đối tượng yêu cầu
        rentalAmenities = RentalAmenities.builder()
                .name("Tên tiện ích") // Gán tên hoặc giá trị cho tiện ích
                .build();

        // Tạo BulletinBoards_RentalAm với rentalAmenities hợp lệ
        BulletinBoards_RentalAm bulletinBoards_RentalAm = new BulletinBoards_RentalAm();
        bulletinBoards_RentalAm.setRentalAmenities(rentalAmenities);

        // Tạo bulletinBoard
        account = Account.builder().username("testuser").build();
        bulletinBoard = BulletinBoard.builder().account(account).build();

        // Gán BulletinBoard cho BulletinBoards_RentalAm
        bulletinBoards_RentalAm.setBulletinBoard(bulletinBoard);

        // Tạo BulletinBoardRequest với các giá trị cần thiết
        bulletinBoardRequest = BulletinBoardRequest.builder()
                .username("testuser")
                .title("Test Bulletin Board")
                .rentalCategory("Room")
                .description("A room for rent")
                .rentPrice(1000.0)
                .promotionalRentalPrice(900.0)
                .deposit(500.0)
                .area(50)
                .electricityPrice(10.0)
                .waterPrice(5.0)
                .maxPerson("4")
                .moveInDate(new Date())
                .openingHours("08:00")
                .closeHours("22:00")
                .address("123 Main Street")
                .longitude(105.0)
                .latitude(21.0)
                .status(true)
                .isActive(true)
                .bulletinBoardImages(Collections.singletonList(new BulletinBoardImage()))
                .bulletinBoardRules(Collections.singletonList(new BulletinBoardRule()))
                .bulletinBoards_RentalAm(Collections.singletonList(bulletinBoards_RentalAm)) // Gán vào
                // danh
                // sách hợp
                // lệ
                .build();

        // Tạo BulletinBoardResponse tương ứng
        bulletinBoardResponse = BulletinBoardResponse.builder()
                .bulletinBoardId(UUID.randomUUID())
                .account(AccountResponse.builder().username("testuser").build())
                .title("Test Bulletin Board")
                .rentalCategory("Room")
                .description("A room for rent")
                .rentPrice(1000.0)
                .promotionalRentalPrice(900.0)
                .deposit(500.0)
                .area(50)
                .electricityPrice(10.0)
                .waterPrice(5.0)
                .maxPerson("4")
                .moveInDate(new Date())
                .openingHours("08:00")
                .closeHours("22:00")
                .address("123 Main Street")
                .longitude(105.0)
                .latitude(21.0)
                .status(true)
                .isActive(true)
                .bulletinBoardImages(Collections.singletonList(new BulletinBoardImage()))
                .bulletinBoardReviews(Collections.singletonList(new BulletinBoardReviewsResponse()))
                .bulletinBoardRules(Collections.singletonList(new BulletinBoardRule()))
                .bulletinBoards_RentalAm(Collections.singletonList(bulletinBoards_RentalAm)) // Gán vào
                // danh
                // sách hợp
                // lệ
                .build();

        bulletinBoardId = UUID.randomUUID();
        bulletinBoard = BulletinBoard.builder()
                .bulletinBoardId(bulletinBoardId)
                .isActive(false) // Trạng thái ban đầu là không hoạt động
                .build();

    }

    @Test
    void createBulletinBoard_success() {
        // Mô phỏng hành động khi tạo bảng thông báo thành công
        when(accountRepository.findByUsername(bulletinBoardRequest.getUsername()))
                .thenReturn(Optional.of(account));
        when(bulletinBoardMapper.toBulletinBoard(bulletinBoardRequest)).thenReturn(bulletinBoard);
        when(bulletinBoardRepository.save(bulletinBoard)).thenReturn(bulletinBoard);
        when(bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard)).thenReturn(bulletinBoardResponse);

        // Test phương thức createBulletinBoard
        BulletinBoardResponse response = bulletinBoardService.createBulletinBoard(bulletinBoardRequest);

        // Kiểm tra kết quả
        assertEquals(
                bulletinBoardResponse.getAccount().getUsername(),
                response.getAccount().getUsername());

        // Xác nhận các phương thức đã được gọi đúng cách
        verify(accountRepository).findByUsername(bulletinBoardRequest.getUsername());
        verify(bulletinBoardMapper).toBulletinBoard(bulletinBoardRequest);
        verify(bulletinBoardRepository).save(bulletinBoard);
        verify(bulletinBoardMapper).toBulletinBoardResponse(bulletinBoard);
    }

    @Test
    void createBulletinBoard_whenAccountNotFound_throwsException() {
        // Mô phỏng trường hợp không tìm thấy tài khoản
        when(accountRepository.findByUsername(bulletinBoardRequest.getUsername()))
                .thenReturn(Optional.empty());

        // Kiểm tra khi tài khoản không tồn tại
        AppException exception = assertThrows(AppException.class, () -> {
            bulletinBoardService.createBulletinBoard(bulletinBoardRequest);
        });

        // Kiểm tra thông báo lỗi
        assertEquals(ErrorCode.ACCOUNT_NOT_FOUND, exception.getErrorCode());
    }

    @Test
    void createBulletinBoard_whenBulletinBoardImagesAreEmpty_doesNotSaveImages() {
        // Mô phỏng khi danh sách hình ảnh bảng thông báo trống
        bulletinBoardRequest.setBulletinBoardImages(Collections.emptyList());
        when(accountRepository.findByUsername(bulletinBoardRequest.getUsername()))
                .thenReturn(Optional.of(account));
        when(bulletinBoardMapper.toBulletinBoard(bulletinBoardRequest)).thenReturn(bulletinBoard);
        when(bulletinBoardRepository.save(bulletinBoard)).thenReturn(bulletinBoard);
        when(bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard)).thenReturn(bulletinBoardResponse);

        // Test phương thức createBulletinBoard
        BulletinBoardResponse response = bulletinBoardService.createBulletinBoard(bulletinBoardRequest);

        // Kiểm tra kết quả
        assertEquals(
                bulletinBoardResponse.getAccount().getUsername(),
                response.getAccount().getUsername());

        // Xác nhận rằng phương thức save hình ảnh không được gọi
        verify(bulletinBoardImageRepository, never()).save(any(BulletinBoardImage.class));
    }

    @Test
    void createBulletinBoard_whenBulletinBoardRulesAreEmpty_doesNotSaveRules() {
        // Mô phỏng khi danh sách quy tắc bảng thông báo trống
        bulletinBoardRequest.setBulletinBoardRules(Collections.emptyList());
        when(accountRepository.findByUsername(bulletinBoardRequest.getUsername()))
                .thenReturn(Optional.of(account));
        when(bulletinBoardMapper.toBulletinBoard(bulletinBoardRequest)).thenReturn(bulletinBoard);
        when(bulletinBoardRepository.save(bulletinBoard)).thenReturn(bulletinBoard);
        when(bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard)).thenReturn(bulletinBoardResponse);

        // Test phương thức createBulletinBoard
        BulletinBoardResponse response = bulletinBoardService.createBulletinBoard(bulletinBoardRequest);

        // Kiểm tra kết quả
        assertEquals(
                bulletinBoardResponse.getAccount().getUsername(),
                response.getAccount().getUsername());

        // Xác nhận rằng phương thức save quy tắc không được gọi
        verify(bulletinBoardRuleRepository, never()).save(any(BulletinBoardRule.class));
    }

    @Test
    void testGetAllBulletinBoards() {
        // Tạo dữ liệu mẫu
        BulletinBoard bulletinBoard = BulletinBoard.builder()
                .bulletinBoardId(UUID.randomUUID())
                .title("Test Bulletin")
                .build();

        BulletinBoardResponse bulletinBoardResponse = BulletinBoardResponse.builder()
                .bulletinBoardId(bulletinBoard.getBulletinBoardId())
                .title(bulletinBoard.getTitle())
                .build();

        // Mock hành vi của repository và mapper
        when(bulletinBoardRepository.findAll()).thenReturn(Collections.singletonList(bulletinBoard));
        when(bulletinBoardMapper.toBulletinBoardResponse(any(BulletinBoard.class)))
                .thenReturn(bulletinBoardResponse);

        // Gọi phương thức cần kiểm tra
        List<BulletinBoardResponse> result = bulletinBoardService.getAllBulletinBoards();

        // Kiểm tra kết quả
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(bulletinBoardResponse.getBulletinBoardId(), result.get(0).getBulletinBoardId());
        assertEquals(bulletinBoardResponse.getTitle(), result.get(0).getTitle());

        // Kiểm tra rằng phương thức `findAll()` và `toBulletinBoardResponse()` được gọi
        verify(bulletinBoardRepository).findAll();
        verify(bulletinBoardMapper).toBulletinBoardResponse(any(BulletinBoard.class));
    }

    @Test
    void testGetBulletinBoardById_Success() {
        UUID bulletinBoardId = UUID.randomUUID();

        // Tạo dữ liệu mẫu
        BulletinBoard bulletinBoard = BulletinBoard.builder()
                .bulletinBoardId(bulletinBoardId)
                .title("Test Bulletin")
                .build();

        BulletinBoardResponse bulletinBoardResponse = BulletinBoardResponse.builder()
                .bulletinBoardId(bulletinBoard.getBulletinBoardId())
                .title(bulletinBoard.getTitle())
                .build();

        // Mock hành vi của repository và mapper
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));
        when(bulletinBoardMapper.toBulletinBoardResponse(any(BulletinBoard.class)))
                .thenReturn(bulletinBoardResponse);

        // Gọi phương thức cần kiểm tra
        BulletinBoardResponse result = bulletinBoardService.getBulletinBoardById(bulletinBoardId);

        // Kiểm tra kết quả
        assertNotNull(result);
        assertEquals(bulletinBoardResponse.getBulletinBoardId(), result.getBulletinBoardId());
        assertEquals(bulletinBoardResponse.getTitle(), result.getTitle());

        // Kiểm tra rằng phương thức `findById()` và `toBulletinBoardResponse()` được
        // gọi
        verify(bulletinBoardRepository).findById(bulletinBoardId);
        verify(bulletinBoardMapper).toBulletinBoardResponse(any(BulletinBoard.class));
    }

    @Test
    void testGetBulletinBoardById_NotFound() {
        UUID bulletinBoardId = UUID.randomUUID();

        // Mock hành vi của repository trả về Optional.empty() khi không tìm thấy
        // BulletinBoard
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.empty());

        // Kiểm tra khi không tìm thấy BulletinBoard sẽ ném ngoại lệ
        assertThrows(AppException.class, () -> {
            bulletinBoardService.getBulletinBoardById(bulletinBoardId);
        });

        // Kiểm tra rằng phương thức `findById()` đã được gọi
        verify(bulletinBoardRepository).findById(bulletinBoardId);
    }

    @Test
    void testUpdateBulletinBoard_Success() {
        // Tạo dữ liệu mẫu BulletinBoard và BulletinBoardRequest
        UUID bulletinBoardId = UUID.randomUUID();

        BulletinBoard bulletinBoard = BulletinBoard.builder()
                .bulletinBoardId(bulletinBoardId)
                .title("Old Title")
                .build();

        // Tạo RentalAmenities mẫu để tránh NullPointerException
        RentalAmenities rentalAmenities =
                RentalAmenities.builder().name("Wi-Fi").build();

        // Tạo BulletinBoards_RentalAm với RentalAmenities đã khởi tạo
        BulletinBoards_RentalAm bulletinBoards_RentalAm = new BulletinBoards_RentalAm();
        bulletinBoards_RentalAm.setRentalAmenities(rentalAmenities); // Set RentalAmenities cho
        // BulletinBoards_RentalAm
        bulletinBoards_RentalAm.setBulletinBoard(bulletinBoard);

        // Tạo BulletinBoardRequest với các dữ liệu cần thiết
        BulletinBoardRequest bulletinBoardRequest = BulletinBoardRequest.builder()
                .title("Updated Title")
                .bulletinBoardImages(Collections.singletonList(new BulletinBoardImage()))
                .bulletinBoardRules(Collections.singletonList(new BulletinBoardRule()))
                .bulletinBoards_RentalAm(Collections.singletonList(bulletinBoards_RentalAm)) // Set
                // bulletinBoards_RentalAm
                // đã khởi tạo
                .build();

        BulletinBoardResponse bulletinBoardResponse = BulletinBoardResponse.builder()
                .bulletinBoardId(bulletinBoardId)
                .title("Updated Title")
                .build();

        // Mock hành vi của các repository và mapper
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));

        // Dùng doAnswer thay vì thenAnswer cho phương thức void
        doAnswer(invocation -> {
                    BulletinBoardRequest request = invocation.getArgument(0);
                    BulletinBoard board = invocation.getArgument(1);
                    board.setTitle(request.getTitle()); // Chỉ cần cập nhật các trường trong board
                    return null; // Không cần trả về gì cho phương thức void
                })
                .when(bulletinBoardMapper)
                .updateBulletinBoardFromRequest(any(), any());

        when(bulletinBoardRepository.save(any(BulletinBoard.class))).thenReturn(bulletinBoard);
        when(bulletinBoardMapper.toBulletinBoardResponse(any(BulletinBoard.class)))
                .thenReturn(bulletinBoardResponse);

        // Gọi phương thức cần kiểm tra
        BulletinBoardResponse result = bulletinBoardService.updateBulletinBoard(bulletinBoardId, bulletinBoardRequest);

        // Kiểm tra kết quả
        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());

        // Kiểm tra rằng các phương thức save() và findById() đã được gọi
        verify(bulletinBoardRepository).findById(bulletinBoardId);
        verify(bulletinBoardRepository).save(any(BulletinBoard.class));
        verify(bulletinBoardMapper).toBulletinBoardResponse(any(BulletinBoard.class));
    }

    @Test
    void testUpdateBulletinBoard_BulletinBoardNotFound() {
        UUID bulletinBoardId = UUID.randomUUID();

        BulletinBoardRequest bulletinBoardRequest =
                BulletinBoardRequest.builder().title("Updated Title").build();

        // Mock hành vi của repository khi không tìm thấy bulletinBoard
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.empty());

        // Kiểm tra rằng ngoại lệ ResourceNotFoundException được ném ra
        assertThrows(ResourceNotFoundException.class, () -> {
            bulletinBoardService.updateBulletinBoard(bulletinBoardId, bulletinBoardRequest);
        });

        // Kiểm tra rằng phương thức `findById()` đã được gọi
        verify(bulletinBoardRepository).findById(bulletinBoardId);
    }

    @Test
    void testGetBulletinBoardTable_Success() {
        // Given
        String username = "testuser";
        Account account = new Account();
        account.setUsername(username);

        BulletinBoard bulletinBoard1 = new BulletinBoard();
        bulletinBoard1.setBulletinBoardId(UUID.randomUUID());
        bulletinBoard1.setTitle("Bulletin 1");

        BulletinBoard bulletinBoard2 = new BulletinBoard();
        bulletinBoard2.setBulletinBoardId(UUID.randomUUID());
        bulletinBoard2.setTitle("Bulletin 2");

        List<BulletinBoard> bulletinBoards = Arrays.asList(bulletinBoard1, bulletinBoard2);

        when(accountRepository.findByUsername(username)).thenReturn(Optional.of(account));
        when(bulletinBoardRepository.findByAccount(account)).thenReturn(bulletinBoards);
        when(bulletinBoardMapper.toBulletinBoardTableResponse(any(BulletinBoard.class)))
                .thenReturn(new BulletinBoardTableResponse());

        // When
        List<BulletinBoardTableResponse> result = bulletinBoardService.getBulletinBoardTable(username);

        // Then
        assertNotNull(result);
        assertEquals(2, result.size()); // Expected number of bulletin boards
        verify(bulletinBoardRepository).findByAccount(account);
    }

    @Test
    void testGetBulletinBoard_Success() {
        // Given
        BulletinBoard bulletinBoard1 = new BulletinBoard();
        bulletinBoard1.setBulletinBoardId(UUID.randomUUID());
        bulletinBoard1.setIsActive(false);
        bulletinBoard1.setTitle("Inactive Bulletin 1");

        BulletinBoard bulletinBoard2 = new BulletinBoard();
        bulletinBoard2.setBulletinBoardId(UUID.randomUUID());
        bulletinBoard2.setIsActive(false);
        bulletinBoard2.setTitle("Inactive Bulletin 2");

        List<BulletinBoard> bulletinBoards = Arrays.asList(bulletinBoard1, bulletinBoard2);

        when(bulletinBoardRepository.findAllByIsActive(false)).thenReturn(bulletinBoards);
        when(bulletinBoardMapper.toBulletinBoardResponse(any(BulletinBoard.class)))
                .thenReturn(new BulletinBoardResponse());

        // When
        List<BulletinBoardResponse> result = bulletinBoardService.getBulletinBoard();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size()); // Expected number of inactive bulletin boards
        verify(bulletinBoardRepository).findAllByIsActive(false);
    }

    @Test
    void testApproveBulletinBoard_Success() {
        // Given
        UUID bulletinBoardId = UUID.randomUUID();
        BulletinBoard bulletinBoard = new BulletinBoard();
        bulletinBoard.setBulletinBoardId(bulletinBoardId);
        bulletinBoard.setIsActive(false);

        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));
        when(bulletinBoardRepository.save(any(BulletinBoard.class))).thenReturn(bulletinBoard);

        // When
        BulletinBoard result = bulletinBoardService.approveBulletinBoard(bulletinBoardId);

        // Then
        assertNotNull(result);
        assertTrue(result.getIsActive()); // The bulletin board should be active after approval
        verify(bulletinBoardRepository).findById(bulletinBoardId);
        verify(bulletinBoardRepository).save(any(BulletinBoard.class));
    }

    @Test
    void testDeleteBulletinBoard_Success() {
        // Given
        UUID bulletinBoardId = UUID.randomUUID();

        // Mock the repository
        doNothing().when(bulletinBoardRepository).deleteById(bulletinBoardId);

        // When
        bulletinBoardService.deleteBulletinBoard(bulletinBoardId);

        // Then
        verify(bulletinBoardRepository).deleteById(bulletinBoardId);
    }

    @Test
    public void testGetBulletinBoard() {
        // Dữ liệu giả lập
        BulletinBoard bulletinBoard1 = new BulletinBoard();
        BulletinBoard bulletinBoard2 = new BulletinBoard();

        BulletinBoardResponse response1 = new BulletinBoardResponse();
        BulletinBoardResponse response2 = new BulletinBoardResponse();

        // Thiết lập hành vi của repository
        when(bulletinBoardRepository.findAllByIsActive(false)).thenReturn(Arrays.asList(bulletinBoard1, bulletinBoard2));

        // Thiết lập hành vi của mapper cho từng đối tượng
        when(bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard1)).thenReturn(response1);
        when(bulletinBoardMapper.toBulletinBoardResponse(bulletinBoard2)).thenReturn(response2);

        // Gọi phương thức cần test
        List<BulletinBoardResponse> responses = bulletinBoardService.getBulletinBoard();

        // Kiểm tra kết quả
        assertEquals(2, responses.size());
        assertEquals(response1, responses.get(0));
        assertEquals(response2, responses.get(1));

        // Sử dụng ArgumentCaptor để kiểm tra các đối tượng đã được gọi
        ArgumentCaptor<BulletinBoard> captor = ArgumentCaptor.forClass(BulletinBoard.class);

        verify(bulletinBoardMapper, times(2)).toBulletinBoardResponse(captor.capture());
        List<BulletinBoard> capturedBulletins = captor.getAllValues();

        assertEquals(2, capturedBulletins.size());
        assertEquals(bulletinBoard1, capturedBulletins.get(0));
        assertEquals(bulletinBoard2, capturedBulletins.get(1));
    }

    @Test
    public void testApproveBulletinBoardisActive_Success() {
        // Thiết lập hành vi của repository
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));
        when(bulletinBoardRepository.save(bulletinBoard)).thenReturn(bulletinBoard);

        // Gọi phương thức cần test
        BulletinBoard approvedBulletinBoard = bulletinBoardService.approveBulletinBoard(bulletinBoardId);

        // Kiểm tra trạng thái đã được phê duyệt
        assertEquals(true, approvedBulletinBoard.getIsActive());

        // Xác minh rằng các phương thức đã được gọi đúng cách
        verify(bulletinBoardRepository).findById(bulletinBoardId);
        verify(bulletinBoardRepository).save(bulletinBoard);
    }

    @Test
    public void testApproveBulletinBoardisActive_NotFound() {
        // Thiết lập hành vi của repository để không tìm thấy BulletinBoard
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.empty());

        // Kiểm tra xem ngoại lệ ResourceNotFoundException có được ném ra không
        assertThrows(ResourceNotFoundException.class, () -> {
            bulletinBoardService.approveBulletinBoard(bulletinBoardId);
        });

        // Xác minh rằng phương thức findById đã được gọi
        verify(bulletinBoardRepository).findById(bulletinBoardId);
        verify(bulletinBoardRepository, never()).save(any(BulletinBoard.class)); // Không nên gọi save nếu không tìm thấy
    }

    @Test
    public void testDeleteBulletinBoard() {
        // Gọi phương thức cần test
        bulletinBoardService.deleteBulletinBoard(bulletinBoardId);

        // Xác minh rằng phương thức deleteById đã được gọi với ID chính xác
        verify(bulletinBoardRepository).deleteById(bulletinBoardId);
    }



}
