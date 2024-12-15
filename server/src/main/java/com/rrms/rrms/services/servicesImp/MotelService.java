package com.rrms.rrms.services.servicesImp;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.dto.response.MotelRoomCountResponse;
import com.rrms.rrms.enums.ContractStatus;
import com.rrms.rrms.mapper.AccountMapper;
import com.rrms.rrms.mapper.MotelMapper;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.IMotelService;

@Service
public class MotelService implements IMotelService {
    @Autowired
    private MotelRepository motelRepository;

    @Autowired
    private MotelMapper motelMapper;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private ContractTemplateRepository contractTemplateRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReserveAPlaceRepository reserveAPlaceRepository;

    @Override
    public Optional<Integer> getTotalRooms(UUID motelId, String username) {
        Optional<Motel> motel = motelRepository.findByMotelNameAndUsername(motelId, username);
        return motel.map(m -> m.getRooms().size()); // Trả về số lượng phòng
    }

    @Override
    public MotelResponse insert(MotelRequest motel) {
        // Lưu motel và lấy entity đã lưu cùng với ID được tạo
        Motel savedMotel = motelRepository.save(motelMapper.motelRequestToMotel(motel));

        // Tạo ContractTemplateRequest với ID của Motel vừa lưu
        ContractTemplate contractTemplate = new ContractTemplate();
        contractTemplate.setMotel(savedMotel); // Sử dụng ID từ entity đã lưu
        contractTemplate.setTemplatename("Mẫu mặc định");
        contractTemplate.setNamecontract("Mẫu mặc định");
        contractTemplate.setSortorder(1);
        contractTemplate.setContent("Mẫu mặc định");

        // Lưu contract template
        contractTemplateRepository.save(contractTemplate);

        // Trả về response
        return motelMapper.motelToMotelResponse(savedMotel);
    }

    @Transactional
    @Override
    public MotelResponse findById(UUID id) {
        return motelRepository
                .findById(id)
                .map(motel -> {
                    MotelResponse response = motelMapper.motelToMotelResponse(motel);
                    return response;
                })
                .orElseThrow(() -> new IllegalArgumentException("Motel not found"));
    }

    @Override
    public List<MotelResponse> findAllByMotelName(String motelName) {
        return motelRepository.findAllByMotelName(motelName).stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MotelResponse> findMotelByAccount_Username(String username) {
        return motelRepository.findMotelByAccount_Username(username).stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MotelResponse> findAll() {
        return motelRepository.findAll().stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MotelResponse update(UUID id, MotelRequest motel) {
        Optional<Motel> motelfind = motelRepository.findById(id);
        if (motelfind.isPresent()) {
            motelfind.get().setMotelName(motel.getMotelName());
            motelfind.get().setArea(motel.getArea());
            motelfind.get().setAveragePrice(motel.getAveragePrice());
            motelfind.get().setAddress(motel.getAddress());
            motelfind.get().setMethodofcreation(motel.getMethodofcreation());
            motelfind.get().setMaxperson(motel.getMaxperson());
            motelfind.get().setInvoicedate(motel.getInvoicedate());
            motelfind.get().setPaymentdeadline(motel.getPaymentdeadline());
            motelfind.get().setAccount(accountMapper.toAccount(motel.getAccount()));
            motelfind.get().setTypeRoom(motel.getTypeRoom());
            return motelMapper.motelToMotelResponse(motelRepository.save(motelfind.get()));
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        Optional<Motel> motelfind = motelRepository.findById(id);
        if (motelfind.isPresent()) {
            motelRepository.deleteById(id);
        }
    }

    @Override
    public List<MotelRoomCountResponse> getRoomCountsByContractStatus() {
        List<Motel> motels = motelRepository.findAll();
        List<MotelRoomCountResponse> responseList = new ArrayList<>();

        for (Motel motel : motels) {
            int activeCount = contractRepository
                    .findContractsByMotelIdAndStatus(motel.getMotelId(), ContractStatus.ACTIVE)
                    .size();
            int endedCount = contractRepository
                    .findContractsByMotelIdAndStatus(motel.getMotelId(), ContractStatus.ENDED)
                    .size();
            int iatExpireCount = contractRepository
                    .findContractsByMotelIdAndStatus(motel.getMotelId(), ContractStatus.IATExpire)
                    .size();
            int stakeCount = contractRepository
                    .findContractsByMotelIdAndStatus(motel.getMotelId(), ContractStatus.Stake)
                    .size();
            int reportEndCount = contractRepository
                    .findContractsByMotelIdAndStatus(motel.getMotelId(), ContractStatus.ReportEnd)
                    .size();

            // Đếm số phòng không có hợp đồng và số phòng đã đặt cọc
            List<Room> rooms = roomRepository.findByMotelMotelId(motel.getMotelId());
            int noContractCount = 0;
            int reservedCount = 0; // Biến để đếm số phòng đã đặt cọc

            for (Room room : rooms) {
                boolean hasContract = contractRepository
                                .findContractsByRoomId(room.getRoomId())
                                .size()
                        > 0;
                if (!hasContract) {
                    noContractCount++;
                }
                // Kiểm tra phòng có đặt cọc
                List<Reserve_a_place> reserves = reserveAPlaceRepository.findByRoom_RoomId(room.getRoomId());
                reservedCount += reserves.size(); // Tổng số phòng đã đặt cọc
            }

            MotelRoomCountResponse response = new MotelRoomCountResponse(
                    motel.getMotelId(),
                    motel.getMotelName(),
                    activeCount,
                    endedCount,
                    iatExpireCount,
                    stakeCount,
                    reportEndCount,
                    noContractCount,
                    reservedCount // Thêm số phòng đã đặt cọc
                    );

            responseList.add(response);
        }

        return responseList;
    }

    @Override
    public Double calculateTotalDeposit(UUID motelId) {
        return contractRepository.findTotalDepositByMotelId(motelId);
    }

    @Override
    public Double calculateTotalReserveDeposit(UUID motelId) {
        return reserveAPlaceRepository.findTotalReserveDepositByMotelId(motelId);
    }

    @Override
    public BigDecimal getTotalPaidInvoices(UUID motelId) {
        List<Object[]> results = motelRepository.getTotalPaidInvoicesByMotelId(motelId);
        if (!results.isEmpty() && results.get(0)[1] != null) {
            return (BigDecimal) results.get(0)[1]; // Trả về BigDecimal
        }
        return BigDecimal.ZERO; // Trả về 0 nếu không có kết quả
    }

    @Override
    public BigDecimal getTotalPaidRoomPrice(UUID motelId) {
        List<Object[]> results = motelRepository.getTotalPaidRoomPriceByMotelId(motelId);
        if (!results.isEmpty() && results.get(0)[1] != null) {
            return (BigDecimal) results.get(0)[1]; // Trả về BigDecimal
        }
        return BigDecimal.ZERO; // Trả về 0 nếu không có kết quả
    }
}
