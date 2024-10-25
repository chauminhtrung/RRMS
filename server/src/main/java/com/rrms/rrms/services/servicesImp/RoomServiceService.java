package com.rrms.rrms.services.servicesImp;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.RoomServiceRequest;
import com.rrms.rrms.dto.response.RoomServiceResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomServiceMapper;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomService;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.RoomServiceRepository;
import com.rrms.rrms.repositories.ServiceRepository;
import com.rrms.rrms.services.IRoomService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomServiceService implements IRoomService {

    RoomServiceRepository roomServiceRepository;
    RoomRepository roomRepository;
    ServiceRepository serviceRepository;
    RoomServiceMapper roomServiceMapper;

    @Override
    public RoomServiceResponse createRoomService(RoomServiceRequest roomServiceRequest) {

        Room room = roomRepository
                .findById(roomServiceRequest.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_DETAIL_NOT_FOUND));
        com.rrms.rrms.models.Service service = serviceRepository
                .findById(roomServiceRequest.getServiceId())
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));

        RoomService roomService =
                RoomService.builder().room(room).service(service).build();

        roomService = roomServiceRepository.save(roomService);
        return roomServiceMapper.toRoomServiceResponse(roomService);
    }
}
