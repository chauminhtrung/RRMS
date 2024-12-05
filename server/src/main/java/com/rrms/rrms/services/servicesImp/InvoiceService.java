package com.rrms.rrms.services.servicesImp;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.InvoiceAdditionItemRequest;
import com.rrms.rrms.dto.request.InvoiceDetailDeviceRequest;
import com.rrms.rrms.dto.request.InvoiceDetailServiceRequest;
import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.request.UpdateInvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceAdditionItemResponse;
import com.rrms.rrms.dto.response.InvoiceDeviceDetailResponse;
import com.rrms.rrms.dto.response.InvoiceResponse;
import com.rrms.rrms.dto.response.InvoiceServiceDetailResponse;
import com.rrms.rrms.models.Contract;
import com.rrms.rrms.models.Invoice;
import com.rrms.rrms.models.InvoiceAdditionItem;
import com.rrms.rrms.models.InvoiceDetail;
import com.rrms.rrms.models.MotelService;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomDevice;
import com.rrms.rrms.models.RoomService;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.repositories.DetailInvoiceRepository;
import com.rrms.rrms.repositories.InvoiceRepository;
import com.rrms.rrms.repositories.RoomDeviceRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.RoomServiceRepository;
import com.rrms.rrms.services.IInvoices;

@Service
public class InvoiceService implements IInvoices {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private DetailInvoiceRepository detailInvoiceRepository;

    @Autowired
    private RoomDeviceRepository roomDeviceRepository;

    @Autowired
    private RoomServiceRepository roomServiceRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<InvoiceResponse> getInvoicesByMotelId(UUID motelId) {
        // Lấy danh sách tất cả các phòng thuộc về motel
        List<Room> rooms = roomRepository.findByMotelMotelId(motelId);

        // Từ danh sách phòng, lấy ra các hợp đồng
        List<Contract> contracts = rooms.stream()
                .flatMap(room -> contractRepository.findByRoomRoomId(room.getRoomId()).stream())
                .collect(Collectors.toList());

        // Từ danh sách hợp đồng, lấy ra tất cả các hóa đơn
        List<Invoice> invoices = contracts.stream()
                .flatMap(contract -> invoiceRepository.findByContractContractId(contract.getContractId()).stream())
                .collect(Collectors.toList());

        // Map dữ liệu hóa đơn sang response
        return invoices.stream()
                .map(invoice -> {
                    List<InvoiceDetail> details =
                            detailInvoiceRepository.findByInvoiceInvoiceId(invoice.getInvoiceId());

                    LocalDate moveInDate = invoice.getContract()
                            .getMoveinDate()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);

                    // Tính toán tổng tiền dịch vụ cho mỗi hóa đơn
                    double totalServiceAmount = 0;
                    if (details != null) {
                        for (InvoiceDetail detail : details) {
                            if (detail.getRoomService() != null) {
                                MotelService service = detail.getRoomService().getService();
                                int quantity = detail.getRoomServiceQuantity();
                                totalServiceAmount += service.getPrice() * quantity;
                            }
                        }
                    }

                    return mapToResponse(invoice, details, moveInDate, dueDateOfMoveInDate, totalServiceAmount);
                })
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponse createInvoice(InvoiceRequest request) {

        double totalServiceAmount = 0;
        // Validate contract existence
        Contract contract = contractRepository
                .findById(request.getContractId())
                .orElseThrow(() -> new RuntimeException("Hợp đồng không tồn tại"));

        // Get move-in date
        LocalDate moveInDate = contract.getMoveinDate()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);

        // Create new invoice
        Invoice invoice = new Invoice();
        invoice.setInvoiceReason(request.getInvoiceReason());
        invoice.setInvoiceCreateMonth(
                request.getInvoiceCreateMonth() != null ? request.getInvoiceCreateMonth() : YearMonth.now());
        invoice.setInvoiceCreateDate(
                request.getInvoiceCreateDate() != null ? request.getInvoiceCreateDate() : LocalDate.now());
        invoice.setDueDate(invoice.getInvoiceCreateDate().plusDays(7));
        invoice.setDeposit(contract.getDeposit());
        invoice.setContract(contract);

        // Create invoice details
        List<InvoiceDetail> details = new ArrayList<>();

        // Xử lý khoản phát sinh (Additional Charges)
        if (request.getAdditionItems() != null) {
            List<InvoiceAdditionItem> additionalCharges = new ArrayList<>();
            for (InvoiceAdditionItemRequest addRequest : request.getAdditionItems()) {
                InvoiceAdditionItem charge = new InvoiceAdditionItem();
                charge.setInvoice(invoice); // Gán invoice
                charge.setReason(addRequest.getReason());
                charge.setAmount(addRequest.getAmount());
                charge.setIsAddition(addRequest.getIsAddition());
                additionalCharges.add(charge);
            }
            invoice.setAdditionItems(additionalCharges); // Gán danh sách các charges vào invoice
        }

        // Handle service details
        if (request.getServiceDetails() != null) {
            for (InvoiceDetailServiceRequest serviceDetailRequest : request.getServiceDetails()) {
                InvoiceDetail detail = new InvoiceDetail();
                RoomService roomService = roomServiceRepository
                        .findById(serviceDetailRequest.getRoomServiceId())
                        .orElseThrow(() -> new RuntimeException("RoomService không tồn tại"));

                MotelService service = roomService.getService();
                if (service == null) {
                    throw new RuntimeException("MotelService không tồn tại");
                }

                int quantity = serviceDetailRequest.getQuantity() != null ? serviceDetailRequest.getQuantity() : 1;
                double totalPrice = service.getPrice() * quantity;

                detail.setInvoice(invoice);
                detail.setRoomService(roomService);
                detail.setRoomServiceQuantity(quantity); // Set số lượng
                details.add(detail);

                // Cộng tổng tiền của dịch vụ hiện tại vào totalServiceAmount
                totalServiceAmount += totalPrice;
            }
        }

        // Handle device details
        if (request.getDeviceDetails() != null) {
            for (InvoiceDetailDeviceRequest deviceDetailRequest : request.getDeviceDetails()) {
                InvoiceDetail detail = new InvoiceDetail();
                RoomDevice roomDevice = roomDeviceRepository
                        .findById(deviceDetailRequest.getRoomDeviceId())
                        .orElseThrow(() -> new RuntimeException("RoomDevice không tồn tại"));

                detail.setInvoice(invoice);
                detail.setRoomDevice(roomDevice);
                details.add(detail);
            }
        }

        invoice.setDetailInvoices(details);
        invoiceRepository.save(invoice);

        return mapToResponse(invoice, details, moveInDate, dueDateOfMoveInDate, totalServiceAmount);
    }

    private InvoiceResponse mapToResponse(
            Invoice invoice,
            List<InvoiceDetail> details,
            LocalDate moveInDate,
            LocalDate dueDateOfMoveInDate,
            double totalServiceAmount) {
        InvoiceResponse response = new InvoiceResponse();
        response.setInvoiceId(invoice.getInvoiceId());
        response.setInvoiceReason(invoice.getInvoiceReason());
        response.setInvoiceCreateMonth(invoice.getInvoiceCreateMonth());
        response.setInvoiceCreateDate(invoice.getInvoiceCreateDate());
        response.setDueDate(invoice.getDueDate());
        response.setDeposit(invoice.getDeposit());
        response.setMoveinDate(moveInDate);
        response.setDueDateofmoveinDate(dueDateOfMoveInDate);

        Room room = invoice.getContract().getRoom();
        if (room != null) {
            response.setRoomName(room.getName());
            response.setRoomPrice(room.getPrice());
        }

        // Calculate total additional charges (additions and subtractions)
        double totalAddition = invoice.getAdditionItems() != null
                ? invoice.getAdditionItems().stream()
                        .mapToDouble(charge -> charge.getIsAddition() ? charge.getAmount() : -charge.getAmount())
                        .sum()
                : 0;

        // Calculate the total invoice amount
        double totalInvoice = invoice.getContract().getPrice() // Room price
                + totalServiceAmount // Total service amount
                + totalAddition; // Total additional charges (additions and subtractions)

        response.setTotalAmount(totalInvoice);

        // Map service details
        List<InvoiceServiceDetailResponse> serviceDetailResponses = details.stream()
                .filter(detail -> detail.getRoomService() != null)
                .map(detail -> {
                    InvoiceServiceDetailResponse serviceResponse = new InvoiceServiceDetailResponse();
                    RoomService roomService = detail.getRoomService();
                    MotelService service = roomService.getService();

                    serviceResponse.setServiceName(service.getNameService());
                    serviceResponse.setServicePrice(service.getPrice());
                    serviceResponse.setQuantity(detail.getRoomServiceQuantity());
                    serviceResponse.setTotalPrice(service.getPrice() * detail.getRoomServiceQuantity());

                    return serviceResponse;
                })
                .collect(Collectors.toList());
        response.setServiceDetails(serviceDetailResponses);

        // Map device details
        List<InvoiceDeviceDetailResponse> deviceDetailResponses = details.stream()
                .filter(detail -> detail.getRoomDevice() != null)
                .map(detail -> {
                    InvoiceDeviceDetailResponse deviceResponse = new InvoiceDeviceDetailResponse();
                    deviceResponse.setDeviceName(
                            detail.getRoomDevice().getMotelDevice().getDeviceName());
                    deviceResponse.setDevicePrice(
                            detail.getRoomDevice().getMotelDevice().getValue());
                    deviceResponse.setQuantity(
                            Double.valueOf(detail.getRoomDevice().getQuantity()));
                    deviceResponse.setTotalPrice(deviceResponse.getDevicePrice() * deviceResponse.getQuantity());
                    return deviceResponse;
                })
                .collect(Collectors.toList());
        response.setDeviceDetails(deviceDetailResponses);

        // Map additional charges
        List<InvoiceAdditionItemResponse> additionItemResponses = invoice.getAdditionItems().stream()
                .map(charge -> {
                    InvoiceAdditionItemResponse additionResponse = new InvoiceAdditionItemResponse();
                    additionResponse.setReason(charge.getReason());
                    additionResponse.setAmount(charge.getAmount());
                    additionResponse.setAddition(charge.getIsAddition());
                    return additionResponse;
                })
                .collect(Collectors.toList());
        response.setAdditionItems(additionItemResponses);

        return response;
    }

    @Override
    public InvoiceResponse updateInvoice(UpdateInvoiceRequest request) {

        // Bước 1: Lấy hóa đơn cần cập nhật từ cơ sở dữ liệu
        Invoice invoice = invoiceRepository
                .findById(request.getInvoiceId())
                .orElseThrow(() -> new RuntimeException("Hóa đơn không tồn tại"));

        // Bước 2: Cập nhật thông tin cơ bản của hóa đơn
        if (request.getInvoiceReason() != null) {
            invoice.setInvoiceReason(request.getInvoiceReason());
        }

        if (request.getInvoiceUpdateMonth() != null) {
            invoice.setInvoiceCreateMonth(request.getInvoiceUpdateMonth());
        }

        if (request.getInvoiceUpdateDate() != null) {
            invoice.setInvoiceCreateDate(request.getInvoiceUpdateDate());
            invoice.setDueDate(request.getInvoiceUpdateDate().plusDays(7)); // Cập nhật ngày hết hạn
        }

        // Bước 3: Cập nhật chi tiết các dịch vụ
        if (request.getServiceDetails() != null) {
            List<InvoiceDetail> updatedServiceDetails = new ArrayList<>();
            for (InvoiceDetailServiceRequest serviceRequest : request.getServiceDetails()) {
                InvoiceDetail detail = new InvoiceDetail();
                RoomService roomService = roomServiceRepository
                        .findById(serviceRequest.getRoomServiceId())
                        .orElseThrow(() -> new RuntimeException("Dịch vụ phòng không tồn tại"));

                MotelService service = roomService.getService();
                if (service == null) {
                    throw new RuntimeException("Dịch vụ nhà nghỉ không tồn tại");
                }

                int quantity = serviceRequest.getQuantity() != null ? serviceRequest.getQuantity() : 1;
                detail.setInvoice(invoice);
                detail.setRoomService(roomService);
                detail.setRoomServiceQuantity(quantity);
                updatedServiceDetails.add(detail);
            }
            invoice.setDetailInvoices(updatedServiceDetails); // Cập nhật lại danh sách chi tiết dịch vụ
        }

        // Bước 4: Cập nhật chi tiết các thiết bị
        if (request.getDeviceDetails() != null) {
            List<InvoiceDetail> updatedDeviceDetails = new ArrayList<>();
            for (InvoiceDetailDeviceRequest deviceRequest : request.getDeviceDetails()) {
                InvoiceDetail detail = new InvoiceDetail();
                RoomDevice roomDevice = roomDeviceRepository
                        .findById(deviceRequest.getRoomDeviceId())
                        .orElseThrow(() -> new RuntimeException("Thiết bị phòng không tồn tại"));

                detail.setInvoice(invoice);
                detail.setRoomDevice(roomDevice);
                updatedDeviceDetails.add(detail);
            }
            invoice.getDetailInvoices().addAll(updatedDeviceDetails); // Gộp các chi tiết thiết bị
        }

        // Bước 5: Cập nhật các khoản bổ sung
        if (request.getAdditionItems() != null) {
            List<InvoiceAdditionItem> updatedAdditions = new ArrayList<>();
            for (InvoiceAdditionItemRequest additionRequest : request.getAdditionItems()) {
                InvoiceAdditionItem addition = new InvoiceAdditionItem();
                addition.setInvoice(invoice);
                addition.setReason(additionRequest.getReason());
                addition.setAmount(additionRequest.getAmount());
                addition.setIsAddition(additionRequest.getIsAddition());
                updatedAdditions.add(addition);
            }
            invoice.setAdditionItems(updatedAdditions); // Gán lại danh sách các khoản bổ sung
        }

        // Bước 6: Lưu hóa đơn sau khi cập nhật
        invoiceRepository.save(invoice);

        // Bước 7: Trả về phản hồi
        return mapToResponse(
                invoice,
                invoice.getDetailInvoices(),
                invoice.getContract()
                        .getMoveinDate()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate(),
                invoice.getDueDate(), // Ngày hết hạn đã được cập nhật
                calculateTotalServiceAmount(invoice.getDetailInvoices()));
    }

    private double calculateTotalServiceAmount(List<InvoiceDetail> details) {
        return details.stream()
                .filter(detail -> detail.getRoomService() != null)
                .mapToDouble(
                        detail -> detail.getRoomService().getService().getPrice() * detail.getRoomServiceQuantity())
                .sum();
    }
}
