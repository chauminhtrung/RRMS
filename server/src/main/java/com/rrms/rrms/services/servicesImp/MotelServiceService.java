package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.RoomServiceRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.MotelServiceRequest;
import com.rrms.rrms.dto.request.MotelServiceUpdateRequest;
import com.rrms.rrms.dto.response.MotelServiceResponse;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.MotelService;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.repositories.MotelServiceRepository;
import com.rrms.rrms.repositories.NameMotelServiceRepository;
import com.rrms.rrms.services.IMotelServiceService;

@Service
public class MotelServiceService implements IMotelServiceService {

    @Autowired
    private MotelServiceRepository motelServiceRepository;

    @Autowired
    private MotelRepository motelRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomServiceRepository roomServiceRepository;

    @Override
    public MotelServiceResponse createMotelService(MotelServiceRequest request) {
        Motel motel = motelRepository
            .findById(request.getMotelId())
            .orElseThrow(() -> new IllegalArgumentException("Motel not found"));

        MotelService motelService = new MotelService();
        motelService.setMotel(motel);
        motelService.setNameService(request.getNameService());
        motelService.setPrice(request.getPrice());
        motelService.setChargetype(request.getChargetype());
        MotelService savedMotelService = motelServiceRepository.save(motelService);

        List<UUID> selectedRooms = request.getSelectedRooms();
        if (selectedRooms != null && !selectedRooms.isEmpty()) {
            for (UUID roomId : selectedRooms) {
                Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + roomId));

                com.rrms.rrms.models.RoomService roomService = new com.rrms.rrms.models.RoomService();
                roomService.setRoom(room);
                roomService.setService(savedMotelService);
                roomService.setQuantity(1);

                roomServiceRepository.save(roomService);
            }
        }

        return mapToResponse(savedMotelService);
    }

    @Override
    public MotelServiceResponse updateMotelService(UUID id, MotelServiceUpdateRequest request) {
        // Tìm dịch vụ theo ID
        MotelService motelService = motelServiceRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("MotelService not found"));

        // Cập nhật các thuộc tính của dịch vụ
        motelService.setNameService(request.getNameService());
        motelService.setPrice(request.getPrice());
        motelService.setChargetype(request.getChargetype());

        // Lưu cập nhật dịch vụ
        MotelService updatedMotelService = motelServiceRepository.save(motelService);

        // Lấy danh sách các phòng đã chọn từ request
        List<UUID> selectedRooms = request.getSelectedRooms();

        // Lấy tất cả các dịch vụ phòng hiện tại cho dịch vụ này
        List<com.rrms.rrms.models.RoomService> currentRoomServices = roomServiceRepository.findByService(motelService);

        // Tạo danh sách các phòng ID đã có dịch vụ
        Set<UUID> currentRoomIds = currentRoomServices.stream()
            .map(roomService -> roomService.getRoom().getRoomId())
            .collect(Collectors.toSet());

        // Lọc ra các phòng mới để thêm và các phòng không còn trong selectedRooms để xóa
        Set<UUID> newRoomIds = new HashSet<>(selectedRooms);
        newRoomIds.removeAll(currentRoomIds); // Chỉ giữ các phòng mới cần thêm

        Set<UUID> removedRoomIds = new HashSet<>(currentRoomIds);
        removedRoomIds.removeAll(selectedRooms); // Chỉ giữ các phòng cần xóa

        // Thêm dịch vụ cho các phòng mới
        for (UUID roomId : newRoomIds) {
            Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + roomId));

            com.rrms.rrms.models.RoomService roomService = new com.rrms.rrms.models.RoomService();
            roomService.setRoom(room);
            roomService.setService(updatedMotelService);
            roomService.setQuantity(1);

            roomServiceRepository.save(roomService);
        }

        // Xóa dịch vụ khỏi các phòng không còn trong danh sách selectedRooms
        for (UUID roomId : removedRoomIds) {
            com.rrms.rrms.models.RoomService roomServiceToDelete = currentRoomServices.stream()
                .filter(rs -> rs.getRoom().getRoomId().equals(roomId))
                .findFirst()
                .orElse(null);

            if (roomServiceToDelete != null) {
                roomServiceRepository.delete(roomServiceToDelete);
            }
        }

        return mapToResponse(updatedMotelService);
    }


    @Override
    public void deleteMotelService(UUID id) {
        if (!motelServiceRepository.existsById(id)) {
            throw new IllegalArgumentException("MotelService not found");
        }
        // Bạn có thể cần cập nhật danh sách dịch vụ của motel
        Optional<MotelService> motelServiceOpt = motelServiceRepository.findById(id);
        motelServiceOpt.ifPresent(motelService -> {
            Motel motel = motelService.getMotel(); // tùy thuộc vào cách bạn có mối quan hệ
            if (motel != null) {
                motel.getMotelServices().remove(motelService); // Xoá dịch vụ khỏi danh sách của motel
                motelRepository.save(motel); // Lưu lại motel sau khi đã cập nhật
            }
        });

        motelServiceRepository.deleteById(id);
    }

    @Override
    public MotelServiceResponse getMotelServiceById(UUID id) {
        MotelService motelService = motelServiceRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MotelService not found"));
        return mapToResponse(motelService);
    }

    @Override
    public List<MotelServiceResponse> getAllMotelServices() {
        return motelServiceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MotelServiceResponse updateMotelServiceById(UUID motelId, MotelServiceUpdateRequest request) {
        // Tìm bản ghi MotelService đầu tiên theo motelId
        MotelService motelService = motelServiceRepository
                .findFirstByMotel_MotelId(motelId)
                .orElseThrow(() -> new IllegalArgumentException("MotelService not found for given motelId"));

        // Cập nhật các thuộc tính
        motelService.setNameService(request.getNameService());
        motelService.setPrice(request.getPrice());
        motelService.setChargetype(request.getChargetype());

        // Lưu và trả về response
        MotelService updatedService = motelServiceRepository.save(motelService);
        return mapToResponse(updatedService);
    }

    // Mapping method to convert MotelService entity to MotelServiceResponse DTO
    private MotelServiceResponse mapToResponse(MotelService motelService) {
        return new MotelServiceResponse(
                motelService.getMotelServiceId(),
                motelService.getMotel().getMotelId(),
                motelService.getNameService(),
                motelService.getPrice(),
                motelService.getChargetype());
    }
}
