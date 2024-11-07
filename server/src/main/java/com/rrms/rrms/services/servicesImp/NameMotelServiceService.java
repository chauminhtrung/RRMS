package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.NameMotelServiceRequest;
import com.rrms.rrms.dto.response.NameMotelServiceResponse;
import com.rrms.rrms.models.NameMotelService;
import com.rrms.rrms.repositories.NameMotelServiceRepository;
import com.rrms.rrms.services.INameMotelServiceService;

@Service
public class NameMotelServiceService implements INameMotelServiceService {

    @Autowired
    private NameMotelServiceRepository nameMotelServiceRepository;

    // Chuyển đổi từ Request thành Entity
    private NameMotelService toNameMotelService(NameMotelServiceRequest request) {
        NameMotelService nameMotelService = new NameMotelService();
        nameMotelService.setTypeService(request.getTypeService());
        nameMotelService.setNameService(request.getNameService());

        return nameMotelService;
    }

    // Chuyển đổi từ Entity thành Response
    private NameMotelServiceResponse toNameMotelServiceResponse(NameMotelService nameMotelService) {
        return new NameMotelServiceResponse(
                nameMotelService.getNameMotelServicesId(),
                nameMotelService.getTypeService(),
                nameMotelService.getNameService());
    }

    @Override
    public NameMotelServiceResponse createNameMotelService(NameMotelServiceRequest request) {
        NameMotelService nameMotelService = toNameMotelService(request);
        NameMotelService savedNameMotelService = nameMotelServiceRepository.save(nameMotelService);
        return toNameMotelServiceResponse(savedNameMotelService);
    }

    @Override
    public NameMotelServiceResponse updateNameMotelService(UUID id, NameMotelServiceRequest request) {
        NameMotelService nameMotelService =
                nameMotelServiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        nameMotelService.setTypeService(request.getTypeService());
        nameMotelService.setNameService(request.getNameService());

        NameMotelService updatedNameMotelService = nameMotelServiceRepository.save(nameMotelService);
        return toNameMotelServiceResponse(updatedNameMotelService);
    }

    @Override
    public List<NameMotelServiceResponse> getAllNameMotelServices() {
        return nameMotelServiceRepository.findAll().stream()
                .map(this::toNameMotelServiceResponse)
                .collect(Collectors.toList());
    }

    @Override
    public NameMotelServiceResponse getNameMotelServiceById(UUID id) {
        NameMotelService nameMotelService =
                nameMotelServiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
        return toNameMotelServiceResponse(nameMotelService);
    }

    @Override
    public void deleteNameMotelService(UUID id) {
        nameMotelServiceRepository.deleteById(id);
    }
}
