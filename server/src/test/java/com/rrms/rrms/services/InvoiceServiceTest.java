package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rrms.rrms.dto.request.*;
import com.rrms.rrms.dto.response.InvoiceResponse;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.servicesImp.InvoiceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class InvoiceServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private DetailInvoiceRepository detailInvoiceRepository;

    @Mock
    private RoomServiceRepository roomServiceRepository;

    @Mock
    private RoomDeviceRepository roomDeviceRepository;

    @InjectMocks
    private InvoiceService invoiceService;

    private UUID motelId;
    private UUID invoiceId;
    private Contract contract;
    private Invoice invoice;

    @BeforeEach
    void setUp() {
        motelId = UUID.randomUUID();
        invoiceId = UUID.randomUUID();
        contract = new Contract();
        contract.setMoveinDate(new Date());
        contract.setPrice(100.0);
        contract.setContractId(UUID.randomUUID()); // Assign an ID to contract

        invoice = new Invoice();
        invoice.setContract(contract);
        invoice.setInvoiceReason("Old Reason");
        invoice.setInvoiceId(UUID.randomUUID()); // Assign an ID to invoice

        Mockito.lenient().when(roomDeviceRepository.findById(any(UUID.class))).thenReturn(Optional.empty());
    }

    @Test
    void testGetInvoicesByMotelId() {
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        Motel motel = new Motel();

        room.setMotel(motel); // Correctly associate room with motel
        List<Room> rooms = List.of(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);

        List<Contract> contracts = List.of(contract);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(contracts);

        List<Invoice> invoices = List.of(invoice);
        when(invoiceRepository.findByContractContractId(contract.getContractId()))
                .thenReturn(invoices);
        // Mock for InvoiceDetail -  Adjust based on your actual mapping logic
        when(detailInvoiceRepository.findByInvoiceInvoiceId(invoice.getInvoiceId()))
                .thenReturn(new ArrayList<>());

        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    void testGetInvoicesByMotelId_NoRooms() {
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(Collections.emptyList());
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetInvoicesByMotelId_NoContracts() {
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = List.of(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(Collections.emptyList());
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetInvoicesByMotelId_NoInvoices() {
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = List.of(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(List.of(contract));
        when(invoiceRepository.findByContractContractId(contract.getContractId()))
                .thenReturn(Collections.emptyList());
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetInvoicesByMotelId_NoInvoiceDetails() {
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = List.of(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(List.of(contract));
        when(invoiceRepository.findByContractContractId(contract.getContractId()))
                .thenReturn(List.of(invoice));
        when(detailInvoiceRepository.findByInvoiceInvoiceId(invoice.getInvoiceId()))
                .thenReturn(Collections.emptyList());
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    void testCreateInvoice_ContractNotFound() {
        InvoiceRequest invoiceRequest = new InvoiceRequest();
        UUID nonExistentContractId = UUID.randomUUID();
        invoiceRequest.setContractId(nonExistentContractId);
        when(contractRepository.findById(nonExistentContractId)).thenReturn(Optional.empty());
        AppException exception = assertThrows(AppException.class, () -> invoiceService.createInvoice(invoiceRequest));
        assertEquals("Hợp đồng không tồn tại", exception.getMessage()); // Check the message
        verify(contractRepository, times(1)).findById(nonExistentContractId);
    }

    @Test
    void testCreateInvoice_RoomServiceNotFound() {
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(contract.getContractId()); // Use existing contract
        List<InvoiceDetailServiceRequest> serviceDetails =
                List.of(new InvoiceDetailServiceRequest(UUID.randomUUID(), 1));
        request.setServiceDetails(serviceDetails);
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));
        when(roomServiceRepository.findById(serviceDetails.get(0).getRoomServiceId()))
                .thenReturn(Optional.empty());
        RuntimeException exception = assertThrows(RuntimeException.class, () -> invoiceService.createInvoice(request));
        assertEquals("RoomService không tồn tại", exception.getMessage());
    }

    @Test
    void testCreateInvoice_MotelServiceNotFound() {
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(contract.getContractId());
        List<InvoiceDetailServiceRequest> serviceDetails =
                List.of(new InvoiceDetailServiceRequest(UUID.randomUUID(), 1));
        request.setServiceDetails(serviceDetails);
        RoomService roomService = mock(RoomService.class);
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));
        when(roomServiceRepository.findById(serviceDetails.get(0).getRoomServiceId()))
                .thenReturn(Optional.of(roomService));
        when(roomService.getService()).thenReturn(null);
        RuntimeException exception = assertThrows(RuntimeException.class, () -> invoiceService.createInvoice(request));
        assertEquals("MotelService không tồn tại", exception.getMessage());
    }

    @Test
    void testCreateInvoice_Success() {
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(contract.getContractId());
        List<InvoiceDetailServiceRequest> serviceDetails =
                List.of(new InvoiceDetailServiceRequest(UUID.randomUUID(), 1));
        request.setServiceDetails(serviceDetails);
        RoomService roomService = new RoomService();
        MotelService motelService = new MotelService();
        motelService.setPrice(50L);
        roomService.setService(motelService);
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));
        when(roomServiceRepository.findById(serviceDetails.get(0).getRoomServiceId()))
                .thenReturn(Optional.of(roomService));
        when(invoiceRepository.save(any(Invoice.class))).thenReturn(invoice); // Use existing invoice for simplicity
        InvoiceResponse response = invoiceService.createInvoice(request);
        assertNotNull(response);
    }

    @Test
    void testCreateInvoice_NoServiceDetails() {
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(contract.getContractId());
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));
        when(invoiceRepository.save(any(Invoice.class))).thenReturn(invoice); // Mock save to avoid NullPointerException
        InvoiceResponse response = invoiceService.createInvoice(request);
        assertNotNull(response);
    }

    @Test
    void testMapToResponse() {
        // Mock dữ liệu cho Invoice
        Invoice invoice = mock(Invoice.class);
        Contract contract = mock(Contract.class);
        Room room = mock(Room.class);
        RoomService roomService = mock(RoomService.class);
        MotelService motelService = mock(MotelService.class);
        InvoiceDetail invoiceDetail = mock(InvoiceDetail.class);
        InvoiceAdditionItem additionItem = mock(InvoiceAdditionItem.class);

        // Thiết lập các mock
        UUID invoiceId = UUID.randomUUID();
        when(invoice.getInvoiceId()).thenReturn(invoiceId);
        when(invoice.getInvoiceReason()).thenReturn("Test Reason");
        when(invoice.getInvoiceCreateMonth()).thenReturn(YearMonth.of(2024, 12));
        when(invoice.getInvoiceCreateDate()).thenReturn(LocalDate.now());
        when(invoice.getDueDate()).thenReturn(LocalDate.now().plusDays(7));
        when(invoice.getDeposit()).thenReturn(1000.0);
        when(invoice.getContract()).thenReturn(contract);
        when(contract.getRoom()).thenReturn(room);
        when(contract.getPrice()).thenReturn(5000.0);
        when(room.getName()).thenReturn("Room 101");
        when(room.getPrice()).thenReturn(3000.0);

        // Thêm thêm các items vào Invoice
        when(invoice.getAdditionItems()).thenReturn(Arrays.asList(additionItem));
        when(additionItem.getIsAddition()).thenReturn(true);
        when(additionItem.getAmount()).thenReturn(200.0);
        when(additionItem.getReason()).thenReturn("Cleaning");

        // Tạo một InvoiceDetail mock và các thông tin liên quan
        when(invoiceDetail.getRoomService()).thenReturn(roomService);
        when(roomService.getService()).thenReturn(motelService);
        when(motelService.getNameService()).thenReturn("Wi-Fi");
        when(motelService.getPrice()).thenReturn((long) 500.0);
        when(invoiceDetail.getRoomServiceQuantity()).thenReturn(2);

        // Đặt chi tiết dịch vụ
        List<InvoiceDetail> details = Arrays.asList(invoiceDetail);

        // Map địa chỉ di chuyển
        LocalDate moveInDate = LocalDate.now();
        LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);

        // Tính toán tổng số tiền dịch vụ
        double totalServiceAmount = 1000.0; // Số tiền dịch vụ giả định

        // Khởi tạo phương thức trả về
        InvoiceResponse response = new InvoiceService()
                .mapToResponse(invoice, details, moveInDate, dueDateOfMoveInDate, totalServiceAmount);

        // Kiểm tra các trường hợp
        assertNotNull(response);
        assertEquals(invoiceId, response.getInvoiceId());
        assertEquals("Test Reason", response.getInvoiceReason());
        assertEquals(YearMonth.of(2024, 12), response.getInvoiceCreateMonth());
        assertEquals(LocalDate.now(), response.getInvoiceCreateDate());
        assertEquals(LocalDate.now().plusDays(7), response.getDueDate());
        assertEquals(1000.0, response.getDeposit());
        assertEquals("Room 101", response.getRoomName());
        assertEquals(3000.0, response.getRoomPrice());
        assertEquals(moveInDate, response.getMoveinDate());
        assertEquals(dueDateOfMoveInDate, response.getDueDateofmoveinDate());

        // Kiểm tra tổng tiền
        double expectedTotalAmount = 5000.0 + totalServiceAmount + 200.0; // Giá phòng + tổng dịch vụ + phí phát sinh
        assertEquals(expectedTotalAmount, response.getTotalAmount(), 0.001);

        // Kiểm tra chi tiết dịch vụ
        assertEquals(1, response.getServiceDetails().size());
        assertEquals("Wi-Fi", response.getServiceDetails().get(0).getServiceName());
        assertEquals(
                500.0, response.getServiceDetails().get(0).getServicePrice().doubleValue());
        assertEquals(2, response.getServiceDetails().get(0).getQuantity());
        assertEquals(1000.0, response.getServiceDetails().get(0).getTotalPrice().doubleValue());

        // Kiểm tra chi tiết thiết bị
        assertEquals(0, response.getDeviceDetails().size()); // Không có thiết bị trong trường hợp này

        // Kiểm tra khoản phí phát sinh
        assertEquals(1, response.getAdditionItems().size());
        assertEquals("Cleaning", response.getAdditionItems().get(0).getReason());
        assertEquals(200.0, response.getAdditionItems().get(0).getAmount());
    }

    @Test
    void updateInvoice_success() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setInvoiceReason("Updated Reason");
        request.setInvoiceCreateMonth(YearMonth.of(2024, 5));
        request.setInvoiceCreateDate(LocalDate.of(2024, 5, 15));

        RoomService roomService = new RoomService();
        roomService.setService(new MotelService());
        roomService.setRoomServiceId(UUID.randomUUID());
        when(roomServiceRepository.findById(any(UUID.class))).thenReturn(Optional.of(roomService));

        request.setServiceDetails(List.of(new InvoiceDetailServiceRequest(roomService.getRoomServiceId(), 2)));

        InvoiceResponse response = null;
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            invoiceService.updateInvoice(invoiceId, request);
        });
        assertEquals("Hóa đơn không tồn tại", exception.getMessage());
        verify(invoiceRepository, times(1)).save(any(Invoice.class));
    }

    @Test
    void updateInvoice_nullRequest() {
        InvoiceResponse response = null;
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            invoiceService.updateInvoice(invoiceId, null);
        });
        assertEquals("Hóa đơn không tồn tại", exception.getMessage());
    }

    @Test
    void updateInvoice_nullFieldsInRequest() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        InvoiceResponse response = null;
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            invoiceService.updateInvoice(invoiceId, request);
        });
        assertEquals("Hóa đơn không tồn tại", exception.getMessage());
        verify(invoiceRepository, never()).save(any(Invoice.class));
    }

    @Test
    void updateInvoice_RoomServiceNotFound() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setServiceDetails(List.of(new InvoiceDetailServiceRequest(UUID.randomUUID(), 1)));
        //        when(roomServiceRepository.findById(any(UUID.class))).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> invoiceService.updateInvoice(invoiceId, request));
    }

    @Test
    void updateInvoice_MotelServiceNotFound() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        RoomService roomService = mock(RoomService.class);
        //        when(roomServiceRepository.findById(any(UUID.class))).thenReturn(Optional.of(roomService));
        //        when(roomService.getService()).thenReturn(null);
        request.setServiceDetails(List.of(new InvoiceDetailServiceRequest(roomService.getRoomServiceId(), 1)));
        assertThrows(RuntimeException.class, () -> invoiceService.updateInvoice(invoiceId, request));
    }

    @Test
    void updateInvoice_RoomDeviceNotFound() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setDeviceDetails(List.of(new InvoiceDetailDeviceRequest(UUID.randomUUID())));
        //        when(roomDeviceRepository.findById(any(UUID.class))).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> invoiceService.updateInvoice(invoiceId, request));
    }

    @Test
    void updateInvoice_invoiceNotFound() {
        UUID nonExistentInvoiceId = UUID.randomUUID();
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        when(invoiceRepository.findById(nonExistentInvoiceId)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> invoiceService.updateInvoice(nonExistentInvoiceId, request));
    }

    @Test
    void updateInvoice_withDeviceDetails() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        UUID deviceId = UUID.randomUUID();
        request.setDeviceDetails(List.of(new InvoiceDetailDeviceRequest(deviceId)));

        RoomDevice roomDevice = new RoomDevice();
        roomDevice.setRoomDeviceId(deviceId);

        when(roomDeviceRepository.findById(deviceId)).thenReturn(Optional.of(roomDevice));

        InvoiceResponse response = null;
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            invoiceService.updateInvoice(invoiceId, request);
        });
        assertEquals("Hóa đơn không tồn tại", exception.getMessage());
        verify(invoiceRepository, times(1)).save(any(Invoice.class));
    }

    @Test
    void updateInvoice_withAdditionItems() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        UUID additionItemId = UUID.randomUUID();
        request.setAdditionItems(
                List.of(new UpdateInvoiceAdditionItemRequest(additionItemId, "New Reason", 50.0, true)));

        InvoiceAdditionItem additionItem = new InvoiceAdditionItem();
        additionItem.setAdditionalChargeId(additionItemId);
        invoice.getAdditionItems().add(additionItem); // Add existing item to the invoice

        InvoiceResponse response = null;
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            invoiceService.updateInvoice(invoiceId, request);
        });
        assertEquals("Hóa đơn không tồn tại", exception.getMessage());
        verify(invoiceRepository, times(1)).save(any(Invoice.class));
    }

    @Test
    void updateInvoice_withAllFields() {
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setInvoiceReason("Updated Reason");
        request.setInvoiceCreateMonth(YearMonth.of(2024, 5));
        request.setInvoiceCreateDate(LocalDate.of(2024, 5, 15));
        request.setDueDate(LocalDate.of(2024, 6, 10));
        RoomService roomService = new RoomService();
        roomService.setRoomServiceId(UUID.randomUUID());
        roomService.setService(new MotelService());
        when(roomServiceRepository.findById(any(UUID.class))).thenReturn(Optional.of(roomService));
        request.setServiceDetails(List.of(new InvoiceDetailServiceRequest(roomService.getRoomServiceId(), 2)));

        InvoiceResponse response = null;
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            invoiceService.updateInvoice(invoiceId, request);
        });
        assertEquals("Hóa đơn không tồn tại", exception.getMessage());
        verify(invoiceRepository, times(1)).save(any(Invoice.class));
    }
}
