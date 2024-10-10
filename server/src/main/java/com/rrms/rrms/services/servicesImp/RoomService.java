package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.models.RoomImage;
import com.rrms.rrms.models.TypeRoom;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.IRoomService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomService implements IRoomService {
    RoomRepository roomRepository;
    MotelRepository motelRepository;
    TypeRoomRepository typeRoomRepository;
    ServiceRepository serviceRepository;

    RoomMapper roomMapper;

    @Override
    public RoomDetailResponse getRoomById(UUID id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_DETAIL_NOT_FOUND));
        return roomMapper.toRoomDetailResponse(room);
    }

    @Override
    public RoomDetailResponse createRoom(RoomRequest roomRequest) {

        Motel motel = motelRepository
                .findById(roomRequest.getModelId())
                .orElseThrow(() -> new AppException(ErrorCode.MOTEL_NOT_FOUND));

        List<TypeRoom> typeRooms = typeRoomRepository.findAllByName(roomRequest.getTypeRoomName());
        if (typeRooms.isEmpty()) {
            throw new AppException(ErrorCode.TYPE_ROOM_NOT_FOUND);
        }
        TypeRoom typeRoom = typeRooms.get(0);

        Room room = roomMapper.toRoom(roomRequest);
        room.setMotel(motel);
        room.setTypeRoom(typeRoom);

        List<com.rrms.rrms.models.RoomService> roomServices = roomMapper.mapRoomServices(roomRequest.getRoomServices());

        Room finalRoom1 = room;
        roomServices.forEach(roomService -> {
            if (roomService.getService() != null && roomService.getService().getServiceId() != null) {

                com.rrms.rrms.models.Service service = serviceRepository
                        .findById(roomService.getService().getServiceId())
                        .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
                roomService.setService(service);
            } else {

                com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
                newService.setNameService(roomService.getService().getNameService());

                newService = serviceRepository.save(newService);
                roomService.setService(newService);
            }

            roomService.setRoom(finalRoom1);
        });

        room.setRoomServices(roomServices);

        List<RoomImage> roomImages = roomMapper.mapRoomImages(roomRequest.getRoomImages());
        Room finalRoom = room;
        roomImages.forEach(image -> image.setRoom(finalRoom));
        room.setRoomImages(roomImages);

        room = roomRepository.save(room);

        return roomMapper.toRoomDetailResponse(room);
    }

    @Override
    public List<RoomDetailResponse> getRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toRoomDetailResponse)
                .toList();
    }
}
