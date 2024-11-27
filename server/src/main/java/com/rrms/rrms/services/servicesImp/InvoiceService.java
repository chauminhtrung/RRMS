package com.rrms.rrms.services.servicesImp;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.InvoiceRequest;
import com.rrms.rrms.dto.response.InvoiceResponse;
import com.rrms.rrms.dto.response.ServiceDetailResponse;
import com.rrms.rrms.models.Contract;
import com.rrms.rrms.models.DetailInvoice;
import com.rrms.rrms.models.Invoice;
import com.rrms.rrms.models.RoomDevice;
import com.rrms.rrms.models.RoomService;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.repositories.DetailInvoiceRepository;
import com.rrms.rrms.repositories.InvoiceRepository;
import com.rrms.rrms.repositories.RoomDeviceRepository;
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

    @Override
    public InvoiceResponse createInvoice(InvoiceRequest request) {
        // Lấy thông tin hợp đồng
        Contract contract = contractRepository
                .findById(request.getContractId())
                .orElseThrow(() -> new RuntimeException("Hợp đồng không tồn tại"));

        // Lấy ngày vào ở từ hợp đồng
        // Chuyển Date sang LocalDate
        LocalDate moveInDate = contract.getMoveinDate()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);

        // Tạo hóa đơn mới
        Invoice invoice = new Invoice();
        invoice.setInvoiceReason("Thu tiền tháng đầu tiên");
        invoice.setInvoiceCreateMonth(
                request.getInvoiceCreateMonth() != null ? request.getInvoiceCreateMonth() : YearMonth.now());
        invoice.setInvoiceCreateDate(
                request.getInvoiceCreateDate() != null
                        ? request.getInvoiceCreateDate()
                        : LocalDate.now()); // Ngày lập phiếu
        invoice.setDueDate(invoice.getInvoiceCreateDate().plusDays(7)); // Hạn đóng tiền (+7 ngày)
        invoice.setDeposit(contract.getDeposit()); // Tiền cọc
        invoice.setContract(contract);

        // Tạo danh sách chi tiết hóa đơn (DetailInvoice)
        List<DetailInvoice> details = request.getServiceDetails().stream()
                .map(detailRequest -> {
                    DetailInvoice detail = new DetailInvoice();

                    // Lấy RoomService từ repository
                    RoomService roomService = roomServiceRepository
                            .findById(detailRequest.getRoomServiceId())
                            .orElseThrow(() -> new RuntimeException("RoomService không tồn tại"));

                    // Lấy RoomDevice từ repository
                    RoomDevice roomDevice = null;
                    if (detailRequest.getRoomDeviceId() != null) {
                        roomDevice = roomDeviceRepository
                                .findById(detailRequest.getRoomDeviceId())
                                .orElseThrow(() -> new RuntimeException("RoomDevice không tồn tại"));
                    }

                    // Tính giá và thiết lập dữ liệu
                    detail.setInvoice(invoice);
                    detail.setRoomService(roomService);
                    detail.setRoomDevice(roomDevice);
                    detail.setServicePrice(roomService.getService().getPrice().doubleValue());
                    detail.setQuantity(Double.valueOf(roomService.getQuantity()));

                    return detail;
                })
                .collect(Collectors.toList());

        invoice.setDetailInvoices(details);

        // Lưu hóa đơn và chi tiết hóa đơn
        invoiceRepository.save(invoice);

        // Map dữ liệu sang response
        return mapToResponse(invoice, details, moveInDate, dueDateOfMoveInDate);
    }

    private InvoiceResponse mapToResponse(
            Invoice invoice, List<DetailInvoice> details, LocalDate moveInDate, LocalDate dueDateOfMoveInDate) {
        InvoiceResponse response = new InvoiceResponse();
        response.setInvoiceId(invoice.getInvoiceId());
        response.setInvoiceCreateMonth(invoice.getInvoiceCreateMonth());
        response.setInvoiceCreateDate(invoice.getInvoiceCreateDate());
        response.setDueDate(invoice.getDueDate());
        response.setDeposit(invoice.getDeposit());
        response.setMoveinDate(moveInDate);
        response.setDueDateofmoveinDate(dueDateOfMoveInDate);

        List<ServiceDetailResponse> serviceDetailResponses = details.stream()
                .map(detail -> {
                    ServiceDetailResponse serviceResponse = new ServiceDetailResponse();
                    serviceResponse.setServiceName(
                            detail.getRoomService().getService().getNameService());
                    serviceResponse.setServicePrice(detail.getServicePrice());
                    serviceResponse.setQuantity(detail.getQuantity());
                    serviceResponse.setTotalPrice(detail.getServicePrice() * detail.getQuantity());
                    return serviceResponse;
                })
                .collect(Collectors.toList());
        response.setServiceDetails(serviceDetailResponses);

        return response;
    }

    @Override
    public List<InvoiceResponse> getInvoicesByContractId(UUID contractId) {
        List<Invoice> invoices = invoiceRepository.findByContractContractId(contractId);

        return invoices.stream()
                .map(invoice -> {
                    List<DetailInvoice> details =
                            detailInvoiceRepository.findByInvoiceInvoiceId(invoice.getInvoiceId());

                    // Tính toán moveInDate và dueDateOfMoveInDate từ contract
                    LocalDate moveInDate = invoice.getContract()
                            .getMoveinDate()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    LocalDate dueDateOfMoveInDate = moveInDate.plusDays(30);

                    // Sử dụng phiên bản mapToResponse bốn tham số
                    return mapToResponse(invoice, details, moveInDate, dueDateOfMoveInDate);
                })
                .collect(Collectors.toList());
    }
}
