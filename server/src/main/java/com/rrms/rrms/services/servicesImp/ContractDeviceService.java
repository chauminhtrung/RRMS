package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.services.IContractDeviceService;
import com.rrms.rrms.dto.request.ContractDeviceRequest;
import com.rrms.rrms.dto.response.ContractDeviceResponse;
import com.rrms.rrms.models.ContractDevice;
import com.rrms.rrms.repositories.ContractDeviceRepository;
import com.rrms.rrms.repositories.ContractRepository;
import com.rrms.rrms.repositories.MotelDeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractDeviceService  implements IContractDeviceService {
    private final ContractDeviceRepository contractDeviceRepository;
    private final ContractRepository contractRepository;
    private final MotelDeviceRepository motelDeviceRepository;

    @Override
    public ContractDeviceResponse createContractDevice(ContractDeviceRequest request) {
        var contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new IllegalArgumentException("Contract not found"));

        var motelDevice = motelDeviceRepository.findById(request.getMotelDeviceId())
                .orElseThrow(() -> new IllegalArgumentException("MotelDevice not found"));

        ContractDevice contractDevice = ContractDevice.builder()
                .contract(contract)
                .motelDevice(motelDevice)
                .quantity(request.getQuantity())
                .build();

        ContractDevice savedDevice = contractDeviceRepository.save(contractDevice);
        return mapToResponse(savedDevice);
    }

    @Override
    public ContractDeviceResponse updateContractDevice(UUID contractDeviceId, ContractDeviceRequest request) {
        ContractDevice contractDevice = contractDeviceRepository.findById(contractDeviceId)
                .orElseThrow(() -> new IllegalArgumentException("ContractDevice not found"));

        var contract = contractRepository.findById(request.getContractId())
                .orElseThrow(() -> new IllegalArgumentException("Contract not found"));

        var motelDevice = motelDeviceRepository.findById(request.getMotelDeviceId())
                .orElseThrow(() -> new IllegalArgumentException("MotelDevice not found"));

        contractDevice.setContract(contract);
        contractDevice.setMotelDevice(motelDevice);
        contractDevice.setQuantity(request.getQuantity());

        ContractDevice updatedDevice = contractDeviceRepository.save(contractDevice);
        return mapToResponse(updatedDevice);
    }

    @Override
    public void deleteContractDevice(UUID contractDeviceId) {
        if (!contractDeviceRepository.existsById(contractDeviceId)) {
            throw new IllegalArgumentException("ContractDevice not found");
        }
        contractDeviceRepository.deleteById(contractDeviceId);
    }

    @Override
    public ContractDeviceResponse getContractDeviceById(UUID contractDeviceId) {
        ContractDevice contractDevice = contractDeviceRepository.findById(contractDeviceId)
                .orElseThrow(() -> new IllegalArgumentException("ContractDevice not found"));
        return mapToResponse(contractDevice);
    }

    @Override
    public List<ContractDeviceResponse> getAllContractDevices() {
        return contractDeviceRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ContractDeviceResponse mapToResponse(ContractDevice contractDevice) {
        return ContractDeviceResponse.builder()
                .contractDeviceId(contractDevice.getContractDeviceId())
                .contractId(contractDevice.getContract().getContractId())
                .motelDeviceId(contractDevice.getMotelDevice().getMotel_device_id())
                .quantity(contractDevice.getQuantity())
                .build();
    }
}
