package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.ResourceNotFoundException;

import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.mapper.BulletinBoardMapper;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.servicesImp.BulletinBoardService;

@SpringBootTest
public class BulletinBoardServiceTest {

    @Mock
    private BulletinBoardRepository bulletinBoardRepository;

    @Mock
    private BulletinBoardImageRepository bulletinBoardImageRepository;

    @Mock
    private BulletinBoardRuleRepository bulletinBoardRuleRepository;

    @Mock
    private BulletinBoards_RentalAmRepository bulletinBoards_RentalAmRepository;

    @Mock
    private RuleRepository ruleRepository;

    @Mock
    private RentalAmenitiesRepository rentalAmenitiesRepository;

    @Mock
    private BulletinBoardMapper bulletinBoardMapper;

    @InjectMocks
    private BulletinBoardService bulletinBoardService;

    private BulletinBoardRequest bulletinBoardRequest;
    private BulletinBoard bulletinBoard;
    private UUID bulletinBoardId;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        bulletinBoardId = UUID.randomUUID();
        bulletinBoard = new BulletinBoard();
        bulletinBoard.setBulletinBoardId(bulletinBoardId);

        bulletinBoardRequest = new BulletinBoardRequest();
        // Thiết lập các thuộc tính cho bulletinBoardRequest
        bulletinBoardRequest.setBulletinBoardImages(Arrays.asList(new BulletinBoardImage()));
        bulletinBoardRequest.setBulletinBoardRules(Arrays.asList(new BulletinBoardRule()));
        bulletinBoardRequest.setBulletinBoards_RentalAm(Arrays.asList(new BulletinBoards_RentalAm()));

        when(bulletinBoardMapper.toBulletinBoardResponse(any(BulletinBoard.class)))
                .thenReturn(new BulletinBoardResponse());
    }

    //    @Test
    //    public void testUpdateBulletinBoard_Success() {
    //        // Mock repository để trả về bulletinBoard
    //        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));
    //
    //        // Mock các thao tác cập nhật trong repository
    //        when(bulletinBoardRepository.save(any(BulletinBoard.class))).thenReturn(bulletinBoard);
    //        when(bulletinBoardMapper.updateBulletinBoardFromRequest(any(BulletinBoardRequest.class),
    // any(BulletinBoard.class)))
    //                .thenReturn(bulletinBoard);
    //
    //        // Gọi phương thức cần kiểm tra
    //        BulletinBoardResponse response = bulletinBoardService.updateBulletinBoard(bulletinBoardId,
    // bulletinBoardRequest);
    //
    //        // Kiểm tra kết quả
    //        assertNotNull(response);
    //        verify(bulletinBoardRepository).save(any(BulletinBoard.class));
    //        verify(bulletinBoardImageRepository).deleteAllByBulletinBoard(any(BulletinBoard.class));
    //        verify(bulletinBoardRuleRepository).deleteAllByBulletinBoard(any(BulletinBoard.class));
    //        verify(bulletinBoards_RentalAmRepository).deleteAllByBulletinBoard(any(BulletinBoard.class));
    //    }

    @Test
    public void testUpdateBulletinBoard_BulletinBoardNotFound() {
        // Mock repository trả về empty Optional (không tìm thấy BulletinBoard)
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.empty());

        // Kiểm tra exception khi không tìm thấy BulletinBoard
        assertThrows(ResourceNotFoundException.class, () -> {
            bulletinBoardService.updateBulletinBoard(bulletinBoardId, bulletinBoardRequest);
        });
    }

    @Test
    public void testUpdateBulletinBoard_UpdateImages() {
        // Mock BulletinBoard đã có trong hệ thống
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));

        // Mock save hoạt động lưu hình ảnh
        when(bulletinBoardRepository.save(any(BulletinBoard.class))).thenReturn(bulletinBoard);

        // Gọi phương thức cập nhật
        bulletinBoardService.updateBulletinBoard(bulletinBoardId, bulletinBoardRequest);

        // Kiểm tra các repository liên quan đến hình ảnh
        verify(bulletinBoardImageRepository).deleteAllByBulletinBoard(any(BulletinBoard.class));
        verify(bulletinBoardImageRepository).save(any(BulletinBoardImage.class));
    }

    @Test
    public void testUpdateBulletinBoard_UpdateRules() {
        // Mock BulletinBoard đã có trong hệ thống
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));

        // Mock save các quy tắc
        when(bulletinBoardRepository.save(any(BulletinBoard.class))).thenReturn(bulletinBoard);

        // Gọi phương thức cập nhật
        bulletinBoardService.updateBulletinBoard(bulletinBoardId, bulletinBoardRequest);

        // Kiểm tra các repository liên quan đến quy tắc
        verify(bulletinBoardRuleRepository).deleteAllByBulletinBoard(any(BulletinBoard.class));
        verify(ruleRepository).save(any(Rule.class));
        verify(bulletinBoardRuleRepository).save(any(BulletinBoardRule.class));
    }

    @Test
    public void testUpdateBulletinBoard_UpdateRentalAmenities() {
        // Mock BulletinBoard đã có trong hệ thống
        when(bulletinBoardRepository.findById(bulletinBoardId)).thenReturn(Optional.of(bulletinBoard));

        // Mock save các tiện ích
        when(bulletinBoardRepository.save(any(BulletinBoard.class))).thenReturn(bulletinBoard);

        // Gọi phương thức cập nhật
        bulletinBoardService.updateBulletinBoard(bulletinBoardId, bulletinBoardRequest);

        // Kiểm tra các repository liên quan đến tiện ích
        verify(bulletinBoards_RentalAmRepository).deleteAllByBulletinBoard(any(BulletinBoard.class));
        verify(rentalAmenitiesRepository).save(any(RentalAmenities.class));
        verify(bulletinBoards_RentalAmRepository).save(any(BulletinBoards_RentalAm.class));
    }
}
