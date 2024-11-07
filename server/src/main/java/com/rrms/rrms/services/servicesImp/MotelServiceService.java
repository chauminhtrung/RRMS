package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.MotelServiceRequest;
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
    private NameMotelServiceRepository nameMotelServiceRepository;

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
        return mapToResponse(savedMotelService);
    }

    @Override
    public MotelServiceResponse updateMotelService(UUID id, MotelServiceRequest request) {
        MotelService motelService = motelServiceRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("MotelService not found"));

        Motel motel = motelRepository
                .findById(request.getMotelId())
                .orElseThrow(() -> new IllegalArgumentException("Motel not found"));

        motelService.setMotel(motel);
        motelService.setNameService(request.getNameService());
        motelService.setPrice(request.getPrice());
        motelService.setChargetype(request.getChargetype());
        MotelService updatedMotelService = motelServiceRepository.save(motelService);
        return mapToResponse(updatedMotelService);
    }

    @Override
    public void deleteMotelService(UUID id) {
        if (!motelServiceRepository.existsById(id)) {
            throw new IllegalArgumentException("MotelService not found");
        }
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
    public MotelServiceResponse updateMotelServiceById(UUID motelId, MotelServiceRequest request) {
        // Tìm bản ghi MotelService đầu tiên theo motelId
        MotelService motelService = motelServiceRepository
                .findFirstByMotel_MotelId(motelId)
                .orElseThrow(() -> new IllegalArgumentException("MotelService not found for given motelId"));

        // Kiểm tra xem motel có tồn tại không
        Motel motel = motelRepository
                .findById(request.getMotelId())
                .orElseThrow(() -> new IllegalArgumentException("Motel not found"));

        // Cập nhật các thuộc tính
        motelService.setNameService(request.getNameService());
        motelService.setPrice(request.getPrice());
        motelService.setChargetype(request.getChargetype());
        motelService.setMotel(motel); // Gán lại motel

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
