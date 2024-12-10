package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rrms.rrms.dto.request.*;
import com.rrms.rrms.dto.response.InvoiceResponse;
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

    Contract contract;

    Invoice invoice;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        RoomService mockRoomService = mock(RoomService.class);
        MotelService mockMotelService = mock(MotelService.class);
        RoomDevice mockRoomDevice = mock(RoomDevice.class);
        MotelDevice mockMotelDevice = mock(MotelDevice.class);
        invoiceService = mock(InvoiceService.class);

        motelId = UUID.randomUUID();
        contract = new Contract();
        contract.setMoveinDate(new Date());
        contract.setPrice(100.0);

        invoice = new Invoice();
        invoice.setContract(contract);
        invoice.setInvoiceReason("Old Reason");

        // Mock các phương thức repository và service
        when(invoiceRepository.findById(any(UUID.class))).thenReturn(Optional.of(invoice));
        when(roomServiceRepository.findById(any(UUID.class))).thenReturn(Optional.of(mock(RoomService.class)));
        when(roomDeviceRepository.findById(any(UUID.class))).thenReturn(Optional.of(mock(RoomDevice.class)));
        when(invoiceRepository.save(invoice)).thenReturn(invoice); // Mock save để trả về chính invoice
        when(invoiceRepository.findById(any())).thenReturn(Optional.of(invoice));
        when(roomServiceRepository.findById(any())).thenReturn(Optional.of(mock(RoomService.class)));
        when(mockRoomService.getService()).thenReturn(mockMotelService); // Trả về mock MotelService
        when(roomServiceRepository.findById(any())).thenReturn(Optional.of(mockRoomService));
        when(mockMotelDevice.getDeviceName()).thenReturn("Test Device Name"); // Mock getDeviceName() để tránh NPE
        when(mockRoomDevice.getMotelDevice())
                .thenReturn(mockMotelDevice); // Mock getMotelDevice() để trả về mockMotelDevice

        when(roomDeviceRepository.findById(any())).thenReturn(Optional.of(mockRoomDevice));
    }

    @Test
    void testGetInvoicesByMotelId() {
        // Prepare mock data for Room
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = Collections.singletonList(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);

        // Prepare mock data for Contract

        contract.setContractId(UUID.randomUUID());
        contract.setRoom(room); // Make sure the contract has a valid room
        List<Contract> contracts = Collections.singletonList(contract);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(contracts);

        // Prepare mock data for Invoice
        Invoice invoice = new Invoice();
        invoice.setInvoiceId(UUID.randomUUID());
        invoice.setContract(contract); // Ensure the invoice has a contract
        List<Invoice> invoices = Collections.singletonList(invoice);
        when(invoiceRepository.findByContractContractId(contract.getContractId()))
                .thenReturn(invoices);

        // Call the service method
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);

        // Assert the result
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    void testGetInvoicesByMotelId_NoRooms() {
        // Prepare mock data for Room (no rooms for motelId)
        List<Room> rooms = Collections.emptyList();
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);

        // Call the service method
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);

        // Assert the result
        assertNotNull(result);
        assertTrue(result.isEmpty(), "The result should be an empty list if there are no rooms.");
    }

    @Test
    void testGetInvoicesByMotelId_NoContracts() {
        // Prepare mock data for Room
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = Collections.singletonList(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);

        // Prepare mock data for Contract (no contracts for room)
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(Collections.emptyList());

        // Call the service method
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);

        // Assert the result
        assertNotNull(result);
        assertTrue(result.isEmpty(), "The result should be an empty list if there are no contracts.");
    }

    @Test
    void testGetInvoicesByMotelId_NoInvoices() {
        // Prepare mock data for Room
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = Collections.singletonList(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);

        // Prepare mock data for Contract
        contract.setContractId(UUID.randomUUID());
        contract.setRoom(room); // Ensure the contract has a valid room
        List<Contract> contracts = Collections.singletonList(contract);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(contracts);

        // Prepare mock data for Invoice (no invoices for contract)
        when(invoiceRepository.findByContractContractId(contract.getContractId()))
                .thenReturn(Collections.emptyList());

        // Call the service method
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);

        // Assert the result
        assertNotNull(result);
        assertTrue(result.isEmpty(), "The result should be an empty list if there are no invoices.");
    }

    @Test
    void testGetInvoicesByMotelId_NoInvoiceDetails() {
        // Prepare mock data for Room
        Room room = new Room();
        room.setRoomId(UUID.randomUUID());
        List<Room> rooms = Collections.singletonList(room);
        when(roomRepository.findByMotelMotelId(motelId)).thenReturn(rooms);

        // Prepare mock data for Contract
        contract.setContractId(UUID.randomUUID());
        contract.setRoom(room); // Ensure the contract has a valid room
        List<Contract> contracts = Collections.singletonList(contract);
        when(contractRepository.findByRoomRoomId(room.getRoomId())).thenReturn(contracts);

        // Prepare mock data for Invoice
        Invoice invoice = new Invoice();
        invoice.setInvoiceId(UUID.randomUUID());
        invoice.setContract(contract); // Ensure the invoice has a contract
        List<Invoice> invoices = Collections.singletonList(invoice);
        when(invoiceRepository.findByContractContractId(contract.getContractId()))
                .thenReturn(invoices);

        // Prepare mock data for InvoiceDetail (no details for invoice)
        when(detailInvoiceRepository.findByInvoiceInvoiceId(invoice.getInvoiceId()))
                .thenReturn(Collections.emptyList());

        // Call the service method
        List<InvoiceResponse> result = invoiceService.getInvoicesByMotelId(motelId);

        // Assert the result
        assertNotNull(result);
        assertEquals(1, result.size(), "There should be one invoice in the result.");
    }

    @Test
    void testCreateInvoice_ContractNotFound() {
        // Prepare mock data for InvoiceRequest
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(UUID.randomUUID()); // Contract không tồn tại

        // Mock contractRepository.findById để trả về Optional.empty()
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(RuntimeException.class, () -> invoiceService.createInvoice(request), "Hợp đồng không tồn tại");
    }

    @Test
    void testCreateInvoice_RoomServiceNotFound() {
        // Prepare mock data for InvoiceRequest
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(UUID.randomUUID()); // Contract hợp lệ

        // Add service details
        List<InvoiceDetailServiceRequest> serviceDetails = new ArrayList<>();
        InvoiceDetailServiceRequest serviceRequest = new InvoiceDetailServiceRequest();
        serviceRequest.setRoomServiceId(UUID.randomUUID()); // RoomService không tồn tại
        serviceDetails.add(serviceRequest);
        request.setServiceDetails(serviceDetails);

        // Mock contractRepository.findById để trả về một contract hợp lệ
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));

        // Mock roomServiceRepository.findById trả về Optional.empty() (RoomService không tồn tại)
        when(roomServiceRepository.findById(serviceRequest.getRoomServiceId())).thenReturn(Optional.empty());

        // Call the service method and expect exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> invoiceService.createInvoice(request));

        // Assert that the exception message matches the expected message
        assertEquals("RoomService không tồn tại", exception.getMessage());
    }

    @Test
    void testCreateInvoice_MotelServiceNotFound() {
        // Prepare mock data for InvoiceRequest
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(UUID.randomUUID()); // Contract hợp lệ

        // Add service details
        List<InvoiceDetailServiceRequest> serviceDetails = new ArrayList<>();
        InvoiceDetailServiceRequest serviceRequest = new InvoiceDetailServiceRequest();
        serviceRequest.setRoomServiceId(UUID.randomUUID()); // RoomService hợp lệ nhưng MotelService không tồn tại
        serviceDetails.add(serviceRequest);
        request.setServiceDetails(serviceDetails);

        // Mock contractRepository.findById để trả về một contract hợp lệ
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));

        // Mock roomServiceRepository.findById trả về RoomService hợp lệ
        RoomService roomService = mock(RoomService.class); // Mock RoomService
        when(roomServiceRepository.findById(serviceRequest.getRoomServiceId())).thenReturn(Optional.of(roomService));

        // Mock getService trả về null (MotelService không tồn tại)
        when(roomService.getService()).thenReturn(null); // Mock getService trả về null

        // Call the service method and expect exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> invoiceService.createInvoice(request));

        // Assert that the exception message matches the expected message
        assertEquals("MotelService không tồn tại", exception.getMessage());
    }

    @Test
    void testCreateInvoice_Success() {
        // Prepare mock data for InvoiceRequest
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(UUID.randomUUID()); // Contract hợp lệ
        // Add service details
        List<InvoiceDetailServiceRequest> serviceDetails = new ArrayList<>();
        InvoiceDetailServiceRequest serviceRequest = new InvoiceDetailServiceRequest();
        serviceRequest.setRoomServiceId(UUID.randomUUID()); // RoomService hợp lệ
        serviceRequest.setQuantity(2); // Số lượng
        serviceDetails.add(serviceRequest);
        request.setServiceDetails(serviceDetails);

        // Add additional charges
        List<InvoiceAdditionItemRequest> additionItems = new ArrayList<>();
        InvoiceAdditionItemRequest additionItemRequest = new InvoiceAdditionItemRequest();
        additionItemRequest.setReason("Late fee");
        additionItemRequest.setAmount(100.0);
        additionItemRequest.setIsAddition(true);
        additionItems.add(additionItemRequest);
        request.setAdditionItems(additionItems);

        // Mock contractRepository.findById trả về một contract hợp lệ
        contract.setMoveinDate(new Date());
        contract.setDeposit(500.0);
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));

        // Mock roomServiceRepository.findById trả về RoomService hợp lệ
        RoomService roomService = new RoomService();
        MotelService motelService = new MotelService();
        motelService.setPrice((long) 50.0);
        roomService.setService(motelService);
        when(roomServiceRepository.findById(serviceRequest.getRoomServiceId())).thenReturn(Optional.of(roomService));

        // Mock thêm các giá trị hợp lý cho các phần còn lại (ví dụ: Invoice, InvoiceDetail)
        // Mã hóa chi tiết cho các khoản phát sinh
        Invoice invoice = new Invoice();
        invoice.setContract(contract);
        invoice.setInvoiceReason(request.getInvoiceReason());
        when(invoiceRepository.save(any(Invoice.class))).thenReturn(invoice);

        // Call the service method
        InvoiceResponse response = invoiceService.createInvoice(request);

        // Assert the result
        assertNotNull(response);
    }

    @Test
    void testCreateInvoice_NoServiceDetails() {
        // Prepare mock data for InvoiceRequest
        InvoiceRequest request = new InvoiceRequest();
        request.setContractId(UUID.randomUUID()); // Contract hợp lệ
        request.setServiceDetails(null); // Không có dịch vụ

        // Mock contractRepository.findById để trả về một contract hợp lệ
        contract.setMoveinDate(new Date());
        contract.setDeposit(500.0);
        when(contractRepository.findById(request.getContractId())).thenReturn(Optional.of(contract));

        // Call the service method
        InvoiceResponse response = invoiceService.createInvoice(request);

        // Assert the result
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
    void testUpdateInvoice_Success() {
        // Prepare mock data for UpdateInvoiceRequest
        UUID invoiceId = invoice.getInvoiceId();
        UUID testRoomServiceId = UUID.randomUUID(); // ID dùng trong test

        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setServiceDetails(List.of(new InvoiceDetailServiceRequest(testRoomServiceId, 1))); // Set roomServiceId
        request.setInvoiceId(invoiceId);
        request.setInvoiceReason("Updated Reason");
        request.setInvoiceUpdateMonth(YearMonth.of(2024, 12));
        request.setInvoiceUpdateDate(LocalDate.now().plusDays(5));
        UUID testRoomDeviceId = UUID.randomUUID();
        request.setDeviceDetails(List.of(new InvoiceDetailDeviceRequest(testRoomDeviceId)));

        // Call the service method
        InvoiceResponse response = invoiceService.updateInvoice(request);

        // Assertions
        assertEquals("Updated Reason", response.getInvoiceReason());

        // Verify interactions - sử dụng ArgumentCaptor để kiểm tra đối tượng được lưu
        ArgumentCaptor<Invoice> invoiceCaptor = ArgumentCaptor.forClass(Invoice.class);
        verify(invoiceRepository).save(invoiceCaptor.capture());
        Invoice savedInvoice = invoiceCaptor.getValue();
        assertEquals("Updated Reason", savedInvoice.getInvoiceReason());

        // Sử dụng ArgumentCaptor để kiểm tra roomServiceId
        ArgumentCaptor<UUID> roomServiceIdCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(roomServiceRepository).findById(roomServiceIdCaptor.capture());
        UUID capturedRoomServiceId = roomServiceIdCaptor.getValue();
        assertEquals(testRoomServiceId, capturedRoomServiceId); // Kiểm tra roomServiceId

        // Other verifications (if needed) - nên dùng any() hoặc giá trị cụ thể
        verify(roomDeviceRepository).findById(any()); // Hoặc giá trị cụ thể nếu có
        verify(invoiceService).mapToResponse(any(), anyList(), any(), any(), anyDouble());
    }

    @Test
    void testUpdateInvoice_InvoiceNotFound() {
        // Prepare mock data for UpdateInvoiceRequest
        UUID invoiceId = UUID.randomUUID();
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setInvoiceId(invoiceId);

        // Mock Invoice Repository to return an empty Optional
        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(RuntimeException.class, () -> invoiceService.updateInvoice(request), "Hóa đơn không tồn tại");
    }

    @Test
    void testUpdateInvoice_RoomServiceNotFound() {
        // Prepare mock data for UpdateInvoiceRequest
        UUID invoiceId = UUID.randomUUID();
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setInvoiceId(invoiceId);

        // Mock Invoice Repository to return an existing invoice
        Invoice existingInvoice = new Invoice();
        existingInvoice.setInvoiceId(invoiceId);
        Contract contract = new Contract();
        existingInvoice.setContract(contract);
        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(existingInvoice));

        // Mock RoomService Repository to return empty
        when(roomServiceRepository.findById(any())).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(
                RuntimeException.class, () -> invoiceService.updateInvoice(request), "Dịch vụ phòng không tồn tại");
    }

    @Test
    void testUpdateInvoice_RoomDeviceNotFound() {
        // Prepare mock data for UpdateInvoiceRequest
        UUID invoiceId = UUID.randomUUID();
        UpdateInvoiceRequest request = new UpdateInvoiceRequest();
        request.setInvoiceId(invoiceId);

        // Mock Invoice Repository to return an existing invoice
        Invoice existingInvoice = new Invoice();
        existingInvoice.setInvoiceId(invoiceId);
        Contract contract = new Contract();
        existingInvoice.setContract(contract);
        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(existingInvoice));

        // Mock RoomService and MotelService
        RoomService roomService = new RoomService();
        MotelService motelService = new MotelService();
        when(roomServiceRepository.findById(any())).thenReturn(Optional.of(roomService));
        when(roomService.getService()).thenReturn(motelService);

        // Mock RoomDevice Repository to return empty
        when(roomDeviceRepository.findById(any())).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(
                RuntimeException.class, () -> invoiceService.updateInvoice(request), "Thiết bị phòng không tồn tại");
    }
}
