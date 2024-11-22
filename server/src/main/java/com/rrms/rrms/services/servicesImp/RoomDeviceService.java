package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.RoomDeviceRequest;
import com.rrms.rrms.dto.response.RoomDeviceResponse;
import com.rrms.rrms.mapper.RoomDeviceMapper;
import com.rrms.rrms.models.MotelDevice;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomDevice;
import com.rrms.rrms.repositories.MotelDeviceRepository;
import com.rrms.rrms.repositories.RoomDeviceRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.IRoomDeviceService;

@Service
public class RoomDeviceService implements IRoomDeviceService {
    @Autowired
    private RoomDeviceRepository roomDeviceRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private MotelDeviceRepository motelDeviceRepository;

    @Autowired
    private RoomDeviceMapper mapper;

    @Override
    public RoomDeviceResponse insertRoomDevice(RoomDeviceRequest roomDeviceRequest) {
        RoomDevice roomDevice = roomDeviceRepository.save(mapper.roomDeviceRequestToRoomDevice(roomDeviceRequest));
        return mapper.roomDeviceToRoomDeviceResponse(roomDevice);
    }

    @Override
    public Boolean deleteByRoomAndAndMotelDevice(UUID roomId, UUID motelDeviceId) {
        Room findRoom = roomRepository.findById(roomId).orElse(null);
        MotelDevice findMotelDevice =
                motelDeviceRepository.findById(motelDeviceId).orElse(null);
        if (findRoom != null && findMotelDevice != null) {
            RoomDevice status = roomDeviceRepository.getRoomDeviceByRoomAndMotelDevice(findRoom, findMotelDevice);
            if (status != null) {
                roomDeviceRepository.delete(status);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public List<RoomDeviceResponse> getAllDeviceByRoomId(UUID roomId) {
        Room findRoom = roomRepository.findById(roomId).orElse(null);
        if (findRoom != null) {
            return roomDeviceRepository.getAllByRoom(findRoom).stream()
                    .map(mapper::roomDeviceToRoomDeviceResponse)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    @Override
    public Boolean updateQuantity(UUID roomId, UUID motelDeviceId, Integer quantity) {
        Room findRoom = roomRepository.findById(roomId).orElse(null);
        MotelDevice findMotelDevice =
                motelDeviceRepository.findById(motelDeviceId).orElse(null);
        if (findRoom != null && findMotelDevice != null) {
            RoomDevice status = roomDeviceRepository.getRoomDeviceByRoomAndMotelDevice(findRoom, findMotelDevice);
            if (status != null) {
                if (quantity < 0) {
                    return false;
                }
                status.setQuantity(quantity);
                roomDeviceRepository.save(status);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
