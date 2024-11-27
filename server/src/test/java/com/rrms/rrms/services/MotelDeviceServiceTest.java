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
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Import;

import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.mapper.MotelDeviceMapper;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.MotelDevice;
import com.rrms.rrms.repositories.MotelDeviceRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.servicesImp.MotelDeviceService;

@ExtendWith(MockitoExtension.class)
@Import(SecurityConfigTest.class)
class MotelDeviceServiceTest {
    @Mock
    private MotelRepository motelRepository; // Mock repository

    @Mock
    private MotelDeviceRepository motelDeviceRepository; // Mock repository

    @Mock
    private MotelDeviceMapper motelDeviceMapper; // Mock mapper

    @InjectMocks
    private MotelDeviceService motelDeviceService; // Inject mocks vào service

    @Mock
    private MotelDeviceMapper mapper; // Mock mapper

    private UUID motelDeviceId;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Mở các mock trước mỗi test
        motelDeviceId = UUID.randomUUID();
    }

    // @Test
    // public void testGetAllMotelDevicesByMotel_MotelExists() {
    // // Setup mock data
    // UUID motelId = UUID.randomUUID();
    // Motel mockMotel = new Motel();
    // mockMotel.setMotelId(motelId);
    //
    // MotelDevice motelDevice1 = new MotelDevice();
    // motelDevice1.setDeviceName("Device1");
    // motelDevice1.setUnit(Unit.CAI);
    //
    // MotelDevice motelDevice2 = new MotelDevice();
    // motelDevice2.setDeviceName("Device2");
    // motelDevice2.setUnit(Unit.BO);
    //
    // MotelDeviceResponse response1 = new MotelDeviceResponse();
    // response1.setDeviceName("Device1");
    //
    // MotelDeviceResponse response2 = new MotelDeviceResponse();
    // response2.setDeviceName("Device2");
    //
    // List<MotelDevice> motelDevices = Arrays.asList(motelDevice1, motelDevice2);
    //
    // // Mock repository behaviors
    // when(motelRepository.findById(motelId)).thenReturn(Optional.of(mockMotel));
    // // Giả lập findById
    // when(motelDeviceRepository.findAllByMotel(mockMotel))
    // .thenReturn(motelDevices); // Giả lập tìm tất cả thiết bị theo Motel
    // when(motelDeviceMapper.motelDeviceToMotelDeviceResponse(motelDevice1)).thenReturn(response1);
    // // Giả lập
    // mapper
    // when(motelDeviceMapper.motelDeviceToMotelDeviceResponse(motelDevice2)).thenReturn(response2);
    // // Giả lập
    // mapper
    //
    // // Call the service method
    // List<MotelDeviceResponse> result =
    // motelDeviceService.getAllMotelDevicesByMotel(motelId);
    //
    // // Assertions
    // assertNotNull(result);
    // assertEquals(2, result.size());
    // assertEquals("Device1", result.get(0).getDeviceName());
    // assertEquals("Device2", result.get(1).getDeviceName());
    //
    // // Verify interactions
    // verify(motelRepository, times(1)).findById(motelId); // Verify gọi đúng
    // phương thức
    // verify(motelDeviceRepository, times(1)).findAllByMotel(mockMotel); // Verify
    // tìm thiết bị theo Motel
    // verify(motelDeviceMapper, times(2))
    // .motelDeviceToMotelDeviceResponse(any(MotelDevice.class)); // Verify mapper
    // được gọi đúng
    // }

    @Test
    public void testGetAllMotelDevicesByMotel_MotelDoesNotExist() {
        // Setup mock data
        UUID motelId = UUID.randomUUID();
        when(motelRepository.findById(motelId)).thenReturn(Optional.empty());

        // Call the service method
        List<MotelDeviceResponse> result = motelDeviceService.getAllMotelDevicesByMotel(motelId);

        // Assertions
        assertNotNull(result);
        assertEquals(0, result.size()); // Should return an empty list if motel doesn't exist

        // Verify interactions
        verify(motelRepository, times(1)).findById(motelId);
        verify(motelDeviceRepository, never())
                .findAllByMotel(any(Motel.class)); // Should not call this method if motel doesn't exist
    }

    @Test
    public void testInsertMotelDevice_Success() {
        // Setup mock data for the request
        MotelDeviceRequest motelDeviceRequest = new MotelDeviceRequest();

        // Giả sử bạn sử dụng DTO MotelResponse thay vì Motel trong request
        MotelResponse mockMotelResponse = new MotelResponse();
        mockMotelResponse.setMotelId(UUID.randomUUID()); // Set MotelId cho mockMotelResponse

        // Set các thuộc tính khác cho request
        motelDeviceRequest.setMotel(mockMotelResponse); // Chuyển sang MotelResponse thay vì Motel
        motelDeviceRequest.setDeviceName("Device1");
        motelDeviceRequest.setIcon("Icon1");
        motelDeviceRequest.setValue(100.0);
        motelDeviceRequest.setValueInput(80.0);
        motelDeviceRequest.setTotalQuantity(200);
        motelDeviceRequest.setTotalUsing(150);
        motelDeviceRequest.setTotalNull(50);
        motelDeviceRequest.setSupplier("Supplier1");
        motelDeviceRequest.setUnit("cai");

        // Mock hành vi của repository
        Motel mockMotel = new Motel();
        mockMotel.setMotelId(mockMotelResponse.getMotelId()); // Set ID từ MotelResponse mock
        when(motelRepository.findById(mockMotelResponse.getMotelId())).thenReturn(Optional.of(mockMotel));

        // Mock hành vi lưu đối tượng MotelDevice
        MotelDevice mockMotelDevice = new MotelDevice();
        mockMotelDevice.setDeviceName("Device1");
        when(motelDeviceRepository.save(any(MotelDevice.class))).thenReturn(mockMotelDevice);

        // Mock hành vi của mapper
        MotelDeviceResponse mockResponse = new MotelDeviceResponse();
        mockResponse.setDeviceName("Device1");
        when(mapper.motelDeviceToMotelDeviceResponse(any(MotelDevice.class))).thenReturn(mockResponse);

        // Gọi phương thức insertMotelDevice
        MotelDeviceResponse result = motelDeviceService.insertMotelDevice(motelDeviceRequest);

        // Assertions
        assertNotNull(result);
        assertEquals("Device1", result.getDeviceName());
        verify(motelRepository, times(1)).findById(mockMotelResponse.getMotelId()); // Verify findById is called
        verify(motelDeviceRepository, times(1)).save(any(MotelDevice.class)); // Verify save is called
        verify(mapper, times(1)).motelDeviceToMotelDeviceResponse(any(MotelDevice.class)); // Verify mapper is called
    }

    @Test
    public void testInsertMotelDevice_MotelNotFound() {
        // Setup mock data for the request
        MotelDeviceRequest motelDeviceRequest = new MotelDeviceRequest();
        MotelResponse mockMotelResponse = new MotelResponse();
        mockMotelResponse.setMotelId(UUID.randomUUID()); // Set MotelId cho mockMotelResponse

        // Set Motel and other request data
        motelDeviceRequest.setMotel(mockMotelResponse);
        motelDeviceRequest.setDeviceName("Device1");
        motelDeviceRequest.setUnit("cai");

        // Mock the repository behavior to return empty Optional (no motel found)
        when(motelRepository.findById(mockMotelResponse.getMotelId())).thenReturn(Optional.empty());

        // Call the service method
        MotelDeviceResponse result = motelDeviceService.insertMotelDevice(motelDeviceRequest);

        // Assertions
        assertNull(result); // Since motel is not found, result should be null
        verify(motelRepository, times(1)).findById(mockMotelResponse.getMotelId()); // Verify findById is called
        verify(motelDeviceRepository, times(0)).save(any(MotelDevice.class)); // Verify save is not called
        verify(mapper, times(0))
                .motelDeviceToMotelDeviceResponse(any(MotelDevice.class)); // Verify mapper is not called
    }

    @Test
    public void testDeleteMotelDevice_DeviceExists() {
        // Tạo mock đối tượng MotelDevice
        MotelDevice motelDevice = new MotelDevice();
        motelDevice.setMotel_device_id(motelDeviceId);

        // Mock phương thức findById trả về Optional chứa đối tượng MotelDevice
        when(motelDeviceRepository.findById(motelDeviceId)).thenReturn(Optional.of(motelDevice));

        // Gọi phương thức delete
        motelDeviceService.deleteMotelDevice(motelDeviceId);

        // Kiểm tra xem phương thức delete đã được gọi với đối tượng MotelDevice chưa
        verify(motelDeviceRepository, times(1))
                .delete(motelDevice); // Kiểm tra xem phương thức delete có được gọi đúng 1 lần
    }

    @Test
    public void testDeleteMotelDevice_DeviceNotFound() {
        // Mock phương thức findById trả về Optional.empty (MotelDevice không tồn tại)
        when(motelDeviceRepository.findById(motelDeviceId)).thenReturn(Optional.empty());

        // Gọi phương thức delete
        motelDeviceService.deleteMotelDevice(motelDeviceId);

        // Kiểm tra xem phương thức delete không được gọi
        verify(motelDeviceRepository, times(0))
                .delete(any(MotelDevice.class)); // Kiểm tra xem phương thức delete không được gọi
    }
}
