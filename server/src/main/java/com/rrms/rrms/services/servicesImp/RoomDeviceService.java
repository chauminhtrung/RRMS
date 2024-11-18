package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;
import com.rrms.rrms.mapper.RoomDeviceMapper;
import com.rrms.rrms.models.RoomDevice;
import com.rrms.rrms.repositories.RoomDeviceRepository;
import com.rrms.rrms.services.IRoomDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RoomDeviceService implements IRoomDeviceService {
    @Autowired
    private RoomDeviceRepository roomDeviceRepository;
    @Autowired
    private RoomDeviceMapper mapper;

    @Override
    public RoomDeviceResponse insertRoomDevice(RoomDeviceRequest roomDeviceRequest) {
        RoomDevice roomDevice = roomDeviceRepository.save(mapper.roomDeviceRequestToRoomDevice(roomDeviceRequest));
        return mapper.roomDeviceToRoomDeviceResponse(roomDevice);
    }

    @Override
    public Boolean deleteRoomDevice(UUID roomDeviceId) {
        RoomDevice roomDevice = roomDeviceRepository.findById(roomDeviceId).orElse(null);
        if (roomDevice != null) {
            roomDeviceRepository.delete(roomDevice);
            return true;
        } else {
            return false;
        }

    }
}
