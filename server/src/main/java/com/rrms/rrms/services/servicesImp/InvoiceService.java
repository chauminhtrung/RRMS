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

import com.rrms.rrms.dto.request.CollectPaymentRequest;
import com.rrms.rrms.dto.request.InvoiceAdditionItemRequest;
import com.rrms.rrms.dto.request.InvoiceDetailDeviceRequest;
import com.rrms.rrms.dto.request.InvoiceDetailServiceRequest;
import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.request.UpdateInvoiceAdditionItemRequest;
import com.rrms.rrms.dto.request.UpdateInvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceAdditionItemResponse;
import com.rrms.rrms.dto.response.InvoiceDeviceDetailResponse;
import com.rrms.rrms.dto.response.InvoiceResponse;
import com.rrms.rrms.dto.response.InvoiceServiceDetailResponse;
import com.rrms.rrms.dto.response.PaymentDetailsResponse;
import com.rrms.rrms.enums.PaymentStatus;
import com.rrms.rrms.models.Contract;
import com.rrms.rrms.models.Invoice;
import com.rrms.rrms.models.InvoiceAdditionItem;
import com.rrms.rrms.models.InvoiceDetail;
import com.rrms.rrms.models.MotelService;
import com.rrms.rrms.models.Payment;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomDevice;
import com.rrms.rrms.models.RoomService;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.repositories.DetailInvoiceRepository;
import com.rrms.rrms.repositories.InvoiceRepository;
import com.rrms.rrms.repositories.PaymentRepository;
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

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<InvoiceResponse> getInvoicesByMotelId(UUID motelId) {
        List<Room> rooms = roomRepository.findByMotelMotelId(motelId);

        List<Contract> contracts = rooms.stream()
                .flatMap(room -> contractRepository.findByRoomRoomId(room.getRoomId()).stream())
                .collect(Collectors.toList());

        List<Invoice> invoices = contracts.stream()
                .flatMap(contract -> invoiceRepository.findByContractContractId(contract.getContractId()).stream())
                .collect(Collectors.toList());

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
        Contract contract = contractRepository
                .findById(request.getContractId())
                .orElseThrow(() -> new RuntimeException("Hợp đồng không tồn tại"));

        LocalDate moveInDate = contract.getMoveinDate()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);

        Invoice invoice = new Invoice();
        invoice.setInvoiceReason(request.getInvoiceReason());
        invoice.setInvoiceCreateMonth(
                request.getInvoiceCreateMonth() != null ? request.getInvoiceCreateMonth() : YearMonth.now());
        invoice.setInvoiceCreateDate(
                request.getInvoiceCreateDate() != null ? request.getInvoiceCreateDate() : LocalDate.now());
        invoice.setDueDate(invoice.getInvoiceCreateDate().plusDays(7));
        invoice.setDeposit(contract.getDeposit());
        invoice.setContract(contract);
        invoice.setPaymentStatus(PaymentStatus.UNPAID);

        List<InvoiceDetail> details = new ArrayList<>();

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
            invoice.setAdditionItems(additionalCharges);
        }

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
                detail.setRoomServiceQuantity(quantity);
                details.add(detail);
                totalServiceAmount += totalPrice;
            }
        }

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
        response.setPaymentStatus(invoice.getPaymentStatus());
        Room room = invoice.getContract().getRoom();
        if (room != null) {
            response.setRoomId(room.getRoomId());
            response.setRoomName(room.getName());
            response.setRoomPrice(room.getPrice());
        }

        double totalAddition = invoice.getAdditionItems() != null
                ? invoice.getAdditionItems().stream()
                        .mapToDouble(charge -> charge.getIsAddition() ? charge.getAmount() : -charge.getAmount())
                        .sum()
                : 0;

        double totalInvoice = invoice.getContract().getPrice() + totalServiceAmount + totalAddition;

        response.setTotalAmount(totalInvoice);

        List<InvoiceServiceDetailResponse> serviceDetailResponses = details.stream()
                .filter(detail -> detail.getRoomService() != null)
                .map(detail -> {
                    InvoiceServiceDetailResponse serviceResponse = new InvoiceServiceDetailResponse();
                    RoomService roomService = detail.getRoomService();
                    MotelService service = roomService.getService();

                    serviceResponse.setRoomServiceId(roomService.getRoomServiceId());
                    serviceResponse.setServiceName(service.getNameService());
                    serviceResponse.setServicePrice(service.getPrice());
                    serviceResponse.setQuantity(detail.getRoomServiceQuantity());
                    serviceResponse.setChargetype(service.getChargetype());
                    serviceResponse.setTotalPrice(service.getPrice() * detail.getRoomServiceQuantity());

                    return serviceResponse;
                })
                .collect(Collectors.toList());
        response.setServiceDetails(serviceDetailResponses);

        List<InvoiceDeviceDetailResponse> deviceDetailResponses = details.stream()
                .filter(detail -> detail.getRoomDevice() != null)
                .map(detail -> {
                    InvoiceDeviceDetailResponse deviceResponse = new InvoiceDeviceDetailResponse();

                    deviceResponse.setRoomDeviceId(detail.getRoomDevice().getRoomDeviceId());
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

        List<InvoiceAdditionItemResponse> additionItemResponses = invoice.getAdditionItems().stream()
                .map(charge -> {
                    InvoiceAdditionItemResponse additionResponse = new InvoiceAdditionItemResponse();
                    additionResponse.setAdditionalChargeId(charge.getAdditionalChargeId());
                    additionResponse.setReason(charge.getReason());
                    additionResponse.setAmount(charge.getAmount());
                    additionResponse.setAddition(charge.getIsAddition());
                    return additionResponse;
                })
                .collect(Collectors.toList());
        response.setAdditionItems(additionItemResponses);

        // Thiết lập thông tin thanh toán
        if (invoice.getPayment() != null) {
            Payment payment = invoice.getPayment();
            response.setPaymentDetails(new PaymentDetailsResponse(
                    payment.getPaymentName(), payment.getDescription(), payment.getPaymentDate()));
        }

        return response;
    }

    @Override
    public InvoiceResponse updateInvoice(UUID invoiceId, UpdateInvoiceRequest request) {
        Invoice invoice =
                invoiceRepository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Hóa đơn không tồn tại"));

        if (request.getInvoiceReason() != null) {
            invoice.setInvoiceReason(request.getInvoiceReason());
        }
        if (request.getInvoiceCreateMonth() != null) {
            invoice.setInvoiceCreateMonth(request.getInvoiceCreateMonth());
        }
        if (request.getInvoiceCreateDate() != null) {
            invoice.setInvoiceCreateDate(request.getInvoiceCreateDate());
            invoice.setDueDate(request.getInvoiceCreateDate().plusDays(7));
        }
        if (request.getDueDate() != null) {
            invoice.setDueDate(request.getDueDate());
        }

        LocalDate moveInDate = invoice.getContract()
                .getMoveinDate()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        List<InvoiceDetail> updatedDetails = new ArrayList<>();

        if (request.getServiceDetails() != null) {
            for (InvoiceDetailServiceRequest serviceRequest : request.getServiceDetails()) {
                InvoiceDetail detail = new InvoiceDetail();

                RoomService roomService = roomServiceRepository
                        .findById(serviceRequest.getRoomServiceId())
                        .orElseThrow(() -> new RuntimeException("RoomService không tồn tại"));

                MotelService service = roomService.getService();
                if (service == null) {
                    throw new RuntimeException("MotelService không tồn tại");
                }

                int quantity = serviceRequest.getQuantity() != null ? serviceRequest.getQuantity() : 1;
                detail.setInvoice(invoice);
                detail.setRoomService(roomService);
                detail.setRoomServiceQuantity(quantity);

                updatedDetails.add(detail);
            }
        }

        if (request.getDeviceDetails() != null) {
            for (InvoiceDetailDeviceRequest deviceRequest : request.getDeviceDetails()) {
                InvoiceDetail detail = invoice.getDetailInvoices().stream()
                        .filter(d -> d.getRoomDevice() != null
                                && d.getRoomDevice().getRoomDeviceId().equals(deviceRequest.getRoomDeviceId()))
                        .findFirst()
                        .orElse(new InvoiceDetail());

                RoomDevice roomDevice = roomDeviceRepository
                        .findById(deviceRequest.getRoomDeviceId())
                        .orElseThrow(() -> new RuntimeException("RoomDevice không tồn tại"));

                detail.setInvoice(invoice);
                detail.setRoomDevice(roomDevice);

                updatedDetails.add(detail);
            }
        }

        invoice.getDetailInvoices().clear();
        invoice.getDetailInvoices().addAll(updatedDetails);

        List<InvoiceAdditionItem> updatedAdditionItems = new ArrayList<>();
        if (request.getAdditionItems() != null) {
            for (UpdateInvoiceAdditionItemRequest additionRequest : request.getAdditionItems()) {

                InvoiceAdditionItem additionItem = invoice.getAdditionItems().stream()
                        .filter(a -> a.getAdditionalChargeId().equals(additionRequest.getAdditionalChargeId()))
                        .findFirst()
                        .orElse(new InvoiceAdditionItem());

                additionItem.setInvoice(invoice);
                additionItem.setReason(additionRequest.getReason());
                additionItem.setAmount(additionRequest.getAmount());
                additionItem.setIsAddition(additionRequest.getIsAddition());

                updatedAdditionItems.add(additionItem);
            }
        }

        invoice.getAdditionItems().clear();
        invoice.getAdditionItems().addAll(updatedAdditionItems);

        invoiceRepository.save(invoice);

        return mapToResponse(
                invoice,
                invoice.getDetailInvoices(),
                moveInDate,
                invoice.getDueDateofmoveinDate(),
                calculateTotalServiceAmount(invoice.getDetailInvoices()));
    }

    private double calculateTotalServiceAmount(List<InvoiceDetail> details) {
        return details.stream()
                .filter(detail -> detail.getRoomService() != null)
                .mapToDouble(
                        detail -> detail.getRoomService().getService().getPrice() * detail.getRoomServiceQuantity())
                .sum();
    }

    @Override
    public Invoice findInvoiceById(UUID invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Invoice không tồn tại"));
    }

    @Override
    public InvoiceResponse mapToResponse(Invoice invoice) {
        InvoiceResponse response = new InvoiceResponse();
        List<InvoiceDetail> details = invoice.getDetailInvoices();
        LocalDate moveInDate = invoice.getContract()
                .getMoveinDate()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        Payment payment = invoice.getPayment();
        if (payment != null) {
            response.setPaymentDetails(new PaymentDetailsResponse(
                    payment.getPaymentName(), payment.getDescription(), payment.getPaymentDate()));
        }
        LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);
        double totalServiceAmount = details.stream()
                .filter(detail -> detail.getRoomService() != null)
                .mapToDouble(
                        detail -> detail.getRoomService().getService().getPrice() * detail.getRoomServiceQuantity())
                .sum();
        return mapToResponse(invoice, details, moveInDate, dueDateOfMoveInDate, totalServiceAmount);
    }

    @Override
    public void collectPayment(UUID invoiceId, CollectPaymentRequest request) {
        // Tìm hóa đơn
        Invoice invoice =
                invoiceRepository.findById(invoiceId).orElseThrow(() -> new RuntimeException("Invoice không tồn tại"));

        // Kiểm tra trạng thái thanh toán
        if (invoice.getPaymentStatus() == PaymentStatus.PAID) {
            throw new RuntimeException("Hóa đơn đã được thanh toán trước đó.");
        }

        // Tính toán tổng số tiền hóa đơn (totalAmount)
        double totalServiceAmount = invoice.getDetailInvoices().stream()
                .filter(detail -> detail.getRoomService() != null)
                .mapToDouble(
                        detail -> detail.getRoomService().getService().getPrice() * detail.getRoomServiceQuantity())
                .sum();

        double totalAddition = invoice.getAdditionItems() != null
                ? invoice.getAdditionItems().stream()
                        .mapToDouble(charge -> charge.getIsAddition() ? charge.getAmount() : -charge.getAmount())
                        .sum()
                : 0;

        double totalAmount = invoice.getContract().getPrice() + totalServiceAmount + totalAddition;

        // Kiểm tra nếu số tiền từ request không khớp
        if (!(totalAmount == request.getTotalAmount())) {
            throw new RuntimeException("Số tiền thanh toán không khớp với hóa đơn.");
        }

        // Tạo đối tượng Payment
        Payment payment = new Payment();
        payment.setPaymentName(request.getPaymentName());
        payment.setDescription(request.getDescription());
        payment.setPaymentDate(request.getPaymentDate());
        paymentRepository.save(payment); // Lưu payment trước

        // Cập nhật Payment vào Invoice
        invoice.setPayment(payment);
        invoice.setPaymentStatus(PaymentStatus.PAID);

        // Lưu hóa đơn
        invoiceRepository.save(invoice);
    }
}
