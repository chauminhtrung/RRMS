package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.rrms.rrms.dto.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.MotelDeviceRequest;
import com.rrms.rrms.dto.response.MotelDeviceResponse;
import com.rrms.rrms.enums.Unit;
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
    public List<MotelDeviceResponse> getAllMotelDevicesByMotel(UUID motelId) {
        Motel find = motelRepository.findById(motelId).orElse(null);
        return motelDeviceRepository.findAllByMotel(find).stream()
                .map(mapper::motelDeviceToMotelDeviceResponse)
                .toList();
    }

    @Override
    public MotelDeviceResponse insertMotelDevice(MotelDeviceRequest motelDeviceRequest) {
        Motel find = motelRepository
                .findById(motelDeviceRequest.getMotel().getMotelId())
                .orElse(null);
        if (find != null) {
            // Logging thông tin để kiểm tra
            System.out.println("Found motel: " + find.getMotelId());

            MotelDevice motelDevice = new MotelDevice();
            motelDevice.setMotel(find);
            motelDevice.setDeviceName(motelDeviceRequest.getDeviceName());
            motelDevice.setIcon(motelDeviceRequest.getIcon());
            motelDevice.setValue(motelDeviceRequest.getValue());
            motelDevice.setValueInput(motelDeviceRequest.getValueInput());
            motelDevice.setTotalQuantity(motelDeviceRequest.getTotalQuantity());
            motelDevice.setTotalUsing(motelDeviceRequest.getTotalUsing());
            motelDevice.setTotalNull(motelDeviceRequest.getTotalNull());
            motelDevice.setSupplier(motelDeviceRequest.getSupplier());

            // Logging thông tin cho từng thuộc tính
            System.out.println("Setting device name: " + motelDeviceRequest.getDeviceName());
            System.out.println("Setting value: " + motelDeviceRequest.getValue());

            switch (motelDeviceRequest.getUnit()) {
                case "cai" -> {
                    motelDevice.setUnit(Unit.CAI);
                    System.out.println("Setting unit: CAI");
                }
                case "chiec" -> {
                    motelDevice.setUnit(Unit.CHIEC);
                    System.out.println("Setting unit: CHIEC");
                }
                case "bo" -> {
                    motelDevice.setUnit(Unit.BO);
                    System.out.println("Setting unit: BO");
                }
                case "cap" -> {
                    motelDevice.setUnit(Unit.CAP);
                    System.out.println("Setting unit: CAP");
                }
                default -> {
                    motelDevice.setUnit(Unit.CAI);
                    System.out.println("Setting unit: default (CAI)");
                }
            }

            // Lưu đối tượng và kiểm tra kết quả
            MotelDevice savedMotelDevice = motelDeviceRepository.save(motelDevice);
            System.out.println("Saved MotelDevice: " + savedMotelDevice.getDeviceName());

            return mapper.motelDeviceToMotelDeviceResponse(savedMotelDevice);
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
