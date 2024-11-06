package com.rrms.rrms.services.servicesImp;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.IRoom;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class RoomService implements IRoom {
    RoomRepository roomRepository;
    MotelRepository motelRepository;
    ServiceRepository serviceRepository;
    AccountRepository accountRepository;

    RoomMapper roomMapper;

    @Override
    public RoomDetailResponse getRoomById(UUID id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_DETAIL_NOT_FOUND));
        return roomMapper.toRoomDetailResponse(room);
    }

    @Override
    public RoomDetailResponse createRoom(RoomRequest roomRequest) {

        Account account = accountRepository
                .findByUsername(roomRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        Motel motel = motelRepository.save(Motel.builder()
                .account(account)
                .motelName(roomRequest.getNameRoom())
                .address(roomRequest.getAddress())
                .build());

        Room room = roomMapper.toRoom(roomRequest);
        room.setMotel(motel);


        List<com.rrms.rrms.models.RoomService> roomServices =
                new ArrayList<>(roomMapper.mapRoomServices(roomRequest.getRoomServices()));

        if (roomRequest.getPriceElectric() != 0) {
            com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
            //            log.info("Price electric: {}", roomRequest.getPriceElectric());

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

    @Override
    public List<PostRoomTableResponse> getPostRoomTable(String username) {
        Account account = accountRepository
                .findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        return roomRepository.findAllByMotel_Account(account).stream()
                .map(roomMapper::toPostRoomTableResponse)
                .toList();
    }

    @Override
    public String deleteRoom(UUID id) {
        String result;
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            result = "Delete room successful at roomI: " + id;
        } else {
            throw new AppException(ErrorCode.ROOM_NOT_FOUND);
        }

        return result;
    }
}
