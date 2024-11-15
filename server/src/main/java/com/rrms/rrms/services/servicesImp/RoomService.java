package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.RoomRequest;
import com.rrms.rrms.dto.request.RoomRequest2;
import com.rrms.rrms.dto.response.PostRoomTableResponse;
import com.rrms.rrms.dto.response.RoomDetailResponse;
import com.rrms.rrms.dto.response.RoomResponse2;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.BulletinBoardMapper;
import com.rrms.rrms.mapper.RoomMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.AccountRepository;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.repositories.ServiceRepository;
import com.rrms.rrms.services.IRoom;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    BulletinBoardMapper bulletinBoardMapper;

    @Override
    public RoomDetailResponse getRoomById(UUID id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_DETAIL_NOT_FOUND));
        return roomMapper.toRoomDetailResponse(room);
    }

    @Override
    public RoomDetailResponse createRoom(RoomRequest roomRequest) {

        // Account account = accountRepository
        // .findByUsername(roomRequest.getUsername())
        // .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        //
        // Motel motel = motelRepository.save(Motel.builder()
        // .account(account)
        // .motelName(roomRequest.getNameRoom())
        // .address(roomRequest.getAddress())
        // .build());
        //
        // Room room = roomMapper.toRoom(roomRequest);
        // room.setMotel(motel);
        //
        // List<com.rrms.rrms.models.RoomService> roomServices =
        // new ArrayList<>(roomMapper.mapRoomServices(roomRequest.getRoomServices()));
        //
        // if (roomRequest.getPriceElectric() != 0) {
        // com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
        // // log.info("Price electric: {}", roomRequest.getPriceElectric());
        //
        // newService.setNameService("Điện");
        // serviceRepository.save(newService);
        // roomServices.add(com.rrms.rrms.models.RoomService.builder()
        // .room(room)
        // .service(newService)
        // .build());
        // }
        //
        // if (roomRequest.getPriceWater() != 0) {
        // com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
        // // log.info("Price water: {}", roomRequest.getPriceWater());
        //
        // newService.setNameService("Nước");
        // serviceRepository.save(newService);
        // roomServices.add(com.rrms.rrms.models.RoomService.builder()
        // .room(room)
        // .service(newService)
        // .build());
        // }
        //
        // Room finalRoom1 = room;
        // roomServices.forEach(roomService -> {
        // if (roomService.getService() != null &&
        // roomService.getService().getServiceId() != null) {
        //
        // com.rrms.rrms.models.Service service = serviceRepository
        // .findById(roomService.getService().getServiceId())
        // .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
        // roomService.setService(service);
        // } else {
        //
        // com.rrms.rrms.models.Service newService = new com.rrms.rrms.models.Service();
        // newService.setNameService(roomService.getService().getNameService());
        //
        // newService = serviceRepository.save(newService);
        // roomService.setService(newService);
        // }
        //
        // roomService.setRoom(finalRoom1);
        // });
        //
        // room.setRoomServices(roomServices);
        //
        // List<RoomImage> roomImages =
        // roomMapper.mapRoomImages(roomRequest.getRoomImages());
        // Room finalRoom = room;
        // roomImages.forEach(image -> image.setRoom(finalRoom));
        // room.setRoomImages(roomImages);
        //
        // room = roomRepository.save(room);
        //
        // return roomMapper.toRoomDetailResponse(room);
        return null;
    }

    // @Override
    // public List<BulletinBoardSearchResponse> getRooms() {
    // return
    // bulletinBoardRepository.findAll().stream().map(bulletinBoardMapper::toBulletinBoardSearchResponse)
    // .toList();
    // }

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

    // lam bieng sua ben tren nen tao luon ben duoi

    @Override
    public RoomResponse2 createRoom2(RoomRequest2 roomRequest) {
        Motel motel = motelRepository
                .findById(roomRequest.getMotelId())
                .orElseThrow(() -> new IllegalArgumentException("Motel not found"));
        Room room = convertToEntity(roomRequest);
        room.setMotel(motel);
        Room savedRoom = roomRepository.save(room);
        return convertToResponse(savedRoom);
    }

    @Override
    public RoomResponse2 getRoomById2(UUID roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found"));
        return convertToResponse(room);
    }

    @Override
    public List<RoomResponse2> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public RoomResponse2 updateRoom2(UUID roomId, RoomRequest2 roomRequest) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found"));

        updateEntityFromRequest(room, roomRequest);

        if (roomRequest.getMotelId() != null) {
            Motel motel = motelRepository
                    .findById(roomRequest.getMotelId())
                    .orElseThrow(() -> new IllegalArgumentException("Motel not found"));
            room.setMotel(motel);
        }

        Room updatedRoom = roomRepository.save(room);
        return convertToResponse(updatedRoom);
    }

    @Override
    public void deleteRoom2(UUID roomId) {
        if (!roomRepository.existsById(roomId)) {
            throw new IllegalArgumentException("Room not found");
        }
        roomRepository.deleteById(roomId);
    }

    @Override
    public List<RoomResponse2> getRoomsByMotelId(UUID motelId) {
        // Kiểm tra xem Motel có tồn tại không
        Motel motel =
                motelRepository.findById(motelId).orElseThrow(() -> new IllegalArgumentException("Motel not found"));

        // Lấy danh sách phòng theo motelId
        List<Room> rooms = roomRepository.findByMotel(motel);

        // Chuyển đổi danh sách Room sang RoomResponse
        return rooms.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    // Chuyển đổi từ Room sang RoomResponse
    private RoomResponse2 convertToResponse(Room room) {
        RoomResponse2 response = new RoomResponse2();
        response.setRoomId(room.getRoomId());
        response.setMotelId(room.getMotel().getMotelId());
        response.setName(room.getName());
        response.setGroup(room.getGroup());
        response.setPrioritize(room.getPrioritize());
        response.setArea(room.getArea());
        response.setPrice(room.getPrice());
        response.setDeposit(room.getDeposit());
        response.setDebt(room.getDebt());
        response.setCountTenant(room.getCountTenant());
        response.setInvoiceDate(room.getInvoiceDate());
        response.setMoveInDate(room.getMoveInDate());
        response.setContractDuration(room.getContractduration());
        response.setStatus(room.getStatus());
        response.setFinance(room.getFinance());
        response.setDescription(room.getDescription());
        return response;
    }

    // Chuyển đổi từ RoomRequest sang Room
    private Room convertToEntity(RoomRequest2 roomRequest) {
        Room room = new Room();
        room.setName(roomRequest.getName());
        room.setGroup(roomRequest.getGroup());
        room.setPrice(roomRequest.getPrice());
        room.setPrioritize(roomRequest.getPrioritize());
        room.setArea(roomRequest.getArea());
        room.setDeposit(roomRequest.getDeposit());
        room.setDebt(roomRequest.getDebt());
        room.setCountTenant(roomRequest.getCountTenant());
        room.setInvoiceDate(roomRequest.getInvoiceDate());
        room.setMoveInDate(roomRequest.getMoveInDate());
        room.setContractduration(roomRequest.getContractDuration());
        room.setStatus(roomRequest.getStatus());
        room.setFinance(roomRequest.getFinance());
        room.setDescription(roomRequest.getDescription());
        return room;
    }

    // Cập nhật Room từ RoomRequest (chỉ cập nhật các trường cần thiết)
    private void updateEntityFromRequest(Room room, RoomRequest2 roomRequest) {
        if (roomRequest.getName() != null) room.setName(roomRequest.getName());
        if (roomRequest.getGroup() != null) room.setGroup(roomRequest.getGroup());
        if (roomRequest.getPrice() != null) room.setPrice(roomRequest.getPrice());
        if (roomRequest.getPrioritize() != null) room.setPrioritize(roomRequest.getPrioritize());
        if (roomRequest.getArea() != null) room.setArea(roomRequest.getArea());
        if (roomRequest.getDeposit() != null) room.setDeposit(roomRequest.getDeposit());
        if (roomRequest.getDebt() != null) room.setDebt(roomRequest.getDebt());
        if (roomRequest.getCountTenant() != null) room.setCountTenant(roomRequest.getCountTenant());
        if (roomRequest.getInvoiceDate() != null) room.setInvoiceDate(roomRequest.getInvoiceDate());
        if (roomRequest.getMoveInDate() != null) room.setMoveInDate(roomRequest.getMoveInDate());
        if (roomRequest.getContractDuration() != null) room.setContractduration(roomRequest.getContractDuration());
        if (roomRequest.getStatus() != null) room.setStatus(roomRequest.getStatus());
        if (roomRequest.getFinance() != null) room.setFinance(roomRequest.getFinance());
        if (roomRequest.getDescription() != null) room.setDescription(roomRequest.getDescription());
    }
}
