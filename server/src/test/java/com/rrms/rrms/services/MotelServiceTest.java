package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.mapper.AccountMapper;
import com.rrms.rrms.mapper.MotelMapper;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.servicesImp.MotelService;

import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
public class MotelServiceTest {

    @InjectMocks
    MotelService motelService;

    @Mock
    MotelRepository motelRepository;

    @Mock
    MotelMapper motelMapper;

    @Mock
    AccountMapper accountMapper;

    Motel motel;
    MotelRequest motelRequest;
    MotelResponse motelResponse;
    UUID motelId;

    @BeforeEach
    void init() {
        motel = Motel.builder().motelName("Motel 1").address("456 Main St").build();
        motelResponse = MotelResponse.builder()
                .motelName("Motel 1")
                .address("456 Main St")
                .build();

        motelId = UUID.randomUUID();
        motel = Motel.builder()
                .motelId(motelId)
                .motelName("Motel 1")
                .address("456 Main St")
                .build();

        motelRequest = MotelRequest.builder()
                .motelName("Updated Motel 1")
                .address("789 New St")
                .build();

        motelResponse = MotelResponse.builder()
                .motelName("Updated Motel 1")
                .address("789 New St")
                .build();
    }

    @Test
    void findAll_success() {
        // Given
        List<Motel> motels = List.of(motel);
        when(motelRepository.findAll()).thenReturn(motels);

        // Cập nhật đúng giá trị cho motelResponse để khớp với dữ liệu thực tế
        MotelResponse motelResponse = MotelResponse.builder()
                .motelName("Motel 1") // Sửa thành "Motel 1" để khớp với giá trị mong đợi
                .address("456 Main St") // Đảm bảo địa chỉ đúng
                .build();

        when(motelMapper.motelToMotelResponse(motel)).thenReturn(motelResponse);

        // When
        List<MotelResponse> response = motelService.findAll();

        // Then
        log.info(response.toString());
        assertEquals(1, response.size());
        assertEquals("Motel 1", response.get(0).getMotelName()); // Sửa thành "Motel 1" thay vì "Updated Motel 1"

        verify(motelRepository).findAll();
        verify(motelMapper).motelToMotelResponse(motel);
    }

    @Test
    void findAll_whenNoMotels_returnsEmptyList() {
        // Given
        when(motelRepository.findAll()).thenReturn(List.of());

        // When
        List<MotelResponse> response = motelService.findAll();

        // Then
        assertTrue(response.isEmpty());

        verify(motelRepository).findAll();
        verifyNoInteractions(motelMapper);
    }

    @Test
    void update_whenMotelExists_returnsUpdatedMotelResponse() {
        // Given
        when(motelRepository.findById(motelId)).thenReturn(Optional.of(motel));
        when(motelRepository.save(motel)).thenReturn(motel);
        when(motelMapper.motelToMotelResponse(motel)).thenReturn(motelResponse);
        when(accountMapper.toAccount(any())).thenReturn(null); // Mock accountMapper method

        // When
        MotelResponse response = motelService.update(motelId, motelRequest);

        // Then
        assertNotNull(response);
        assertEquals("Updated Motel 1", response.getMotelName());
        assertEquals("789 New St", response.getAddress());

        verify(motelRepository).findById(motelId);
        verify(motelRepository).save(motel);
        verify(motelMapper).motelToMotelResponse(motel);
        verify(accountMapper).toAccount(any()); // Verify accountMapper method
    }

    @Test
    void update_whenMotelDoesNotExist_returnsNull() {
        // Given
        when(motelRepository.findById(motelId)).thenReturn(Optional.empty()); // Khi không tìm thấy Motel

        // When
        MotelResponse response = motelService.update(motelId, motelRequest); // Gọi phương thức update

        // Then
        assertNull(response); // Đảm bảo trả về null khi không tìm thấy Motel

        verify(motelRepository).findById(motelId); // Kiểm tra rằng findById đã được gọi
        verifyNoMoreInteractions(motelRepository); // Kiểm tra không có bất kỳ tương tác nào khác
        verifyNoInteractions(motelMapper); // Kiểm tra không có bất kỳ tương tác nào với motelMapper
    }

    @Test
    void delete_whenMotelExists_callsDeleteById() {
        // Given
        UUID motelId = UUID.randomUUID(); // Tạo một ID ngẫu nhiên cho motel
        Motel motel = Motel.builder() // Tạo một đối tượng motel mẫu
                .motelId(motelId)
                .motelName("Motel 1")
                .address("456 Main St")
                .build();

        when(motelRepository.findById(motelId)).thenReturn(Optional.of(motel)); // Khi motel tồn tại

        // When
        motelService.delete(motelId); // Gọi phương thức delete

        // Then
        verify(motelRepository).findById(motelId); // Kiểm tra phương thức findById đã được gọi
        verify(motelRepository).deleteById(motelId); // Kiểm tra phương thức deleteById đã được gọi
    }

    @Test
    void delete_whenMotelDoesNotExist_doesNotCallDeleteById() {
        // Given
        UUID motelId = UUID.randomUUID(); // Tạo một ID ngẫu nhiên cho motel
        when(motelRepository.findById(motelId)).thenReturn(Optional.empty()); // Khi motel không tồn tại

        // When
        motelService.delete(motelId); // Gọi phương thức delete

        // Then
        verify(motelRepository).findById(motelId); // Kiểm tra phương thức findById đã được gọi
        verify(motelRepository, never()).deleteById(motelId); // Kiểm tra phương thức deleteById không được gọi
    }
}
