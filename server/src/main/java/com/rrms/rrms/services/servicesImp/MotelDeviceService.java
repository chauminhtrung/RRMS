package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.mapper.MotelDeviceMapper;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.MotelDevice;
import com.rrms.rrms.repositories.MotelDeviceRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.IMotelDeviceService;

@Service
public class MotelDeviceService implements IMotelDeviceService {
    @Autowired
    private MotelDeviceRepository motelDeviceRepository;

    @Autowired
    private MotelDeviceMapper mapper;

    @Autowired
    MotelRepository motelRepository;

    @Override
    public List<MotelDeviceResponse> getAllMotelDevices() {
        return motelDeviceRepository.findAll().stream()
                .map(mapper::motelDeviceToMotelDeviceResponse)
                .toList();
    }

    @Override
    public MotelDeviceResponse insertMotelDevice(MotelDeviceRequest motelDeviceRequest) {
        Motel find = motelRepository
                .findById(motelDeviceRequest.getMotel().getMotelId())
                .orElse(null);
        if (find != null) {
            MotelDevice motelDevice = new MotelDevice();
            motelDevice.setMotel(find);
            motelDevice.setDeviceName(motelDeviceRequest.getDeviceName());
            motelDevice.setValue(motelDeviceRequest.getValue());
            motelDevice.setValueInput(motelDeviceRequest.getValueInput());
            motelDevice.setTotalQuantity(motelDeviceRequest.getTotalQuantity());
            motelDevice.setTotalUsing(motelDeviceRequest.getTotalUsing());
            motelDevice.setTotalNull(motelDeviceRequest.getTotalNull());
            motelDevice.setSupplier(motelDeviceRequest.getSupplier());
            return mapper.motelDeviceToMotelDeviceResponse(motelDeviceRepository.save(motelDevice));
        }
        return null;
    }

    @Override
    public void deleteMotelDevice(UUID motelDeviceId) {
        Optional<MotelDevice> motelDevice = motelDeviceRepository.findById(motelDeviceId);
        if (motelDevice.isPresent()) {
            motelDeviceRepository.delete(motelDevice.get());
        }
    }
}
