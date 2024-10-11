package com.rrms.rrms.services.servicesImp;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.rrms.rrms.services.IRoom;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoomService implements IRoom {
    private static final Logger log = LoggerFactory.getLogger(RoomService.class);
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

        Motel motel = motelRepository.save(Motel.builder()
                .motelName(roomRequest.getNameRoom())
                .address(roomRequest.getAddress())
                .build());

        List<TypeRoom> typeRooms = typeRoomRepository.findAllByName(roomRequest.getTypeRoomName());
        TypeRoom typeRoom;
        if (typeRooms.isEmpty()) {
            typeRoom = typeRoomRepository.save(
                    TypeRoom.builder().name(roomRequest.getTypeRoomName()).build());
        } else {
            typeRoom = typeRooms.get(0);
        }

        Room room = roomMapper.toRoom(roomRequest);
        room.setMotel(motel);
        room.setTypeRoom(typeRoom);

        List<com.rrms.rrms.models.RoomService> roomServices =
                new ArrayList<>(roomMapper.mapRoomServices(roomRequest.getRoomServices()));

        if (roomRequest.getPriceElectric() != 0) {
            com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
            //            log.info("Price electric: {}", roomRequest.getPriceElectric());
            newService.setPrice(roomRequest.getPriceElectric());
            newService.setNameService("Điện");
            serviceRepository.save(newService);
            roomServices.add(com.rrms.rrms.models.RoomService.builder()
                    .room(room)
                    .service(newService)
                    .build());
        }

        if (roomRequest.getPriceWater() != 0) {
            com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
            //            log.info("Price water: {}", roomRequest.getPriceWater());
            newService.setPrice(roomRequest.getPriceWater());
            newService.setNameService("Nước");
            serviceRepository.save(newService);
            roomServices.add(com.rrms.rrms.models.RoomService.builder()
                    .room(room)
                    .service(newService)
                    .build());
        }

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
