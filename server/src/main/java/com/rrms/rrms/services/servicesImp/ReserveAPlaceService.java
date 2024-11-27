package com.rrms.rrms.services.servicesImp;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.ReserveAPlaceRequest;
import com.rrms.rrms.dto.response.ReserveAPlaceResponse;
import com.rrms.rrms.dto.response.RoomResponse2;
import com.rrms.rrms.models.Reserve_a_place;
import com.rrms.rrms.models.Room;
import com.rrms.rrms.repositories.ReserveAPlaceRepository;
import com.rrms.rrms.repositories.RoomRepository;
import com.rrms.rrms.services.IReserveAPlaceService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ReserveAPlaceService implements IReserveAPlaceService {

    @Autowired
    private ReserveAPlaceRepository reserveAPlaceRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public ReserveAPlaceResponse createReserveAPlace(ReserveAPlaceRequest request) {
        Room room =
                roomRepository.findById(request.getRoomId()).orElseThrow(() -> new RuntimeException("Room not found"));

        Reserve_a_place reserveAPlace = Reserve_a_place.builder()
                .createdate(request.getCreateDate())
                .moveinDate(request.getMoveInDate())
                .nametenant(request.getNameTenant())
                .phonetenant(request.getPhoneTenant())
                .deposit(request.getDeposit())
                .note(request.getNote())
                .status(request.getStatus())
                .room(room)
                .build();

        Reserve_a_place savedReserveAPlace = reserveAPlaceRepository.save(reserveAPlace);
        return mapToResponse(savedReserveAPlace);
    }

    @Override
    public ReserveAPlaceResponse getReserveAPlaceById(UUID id) {
        Reserve_a_place reserveAPlace =
                reserveAPlaceRepository.findById(id).orElseThrow(() -> new RuntimeException("ReserveAPlace not found"));

        return mapToResponse(reserveAPlace);
    }

    @Override
    public List<ReserveAPlaceResponse> getAllReserveAPlaces() {
        return reserveAPlaceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ReserveAPlaceResponse updateReserveAPlace(UUID id, ReserveAPlaceRequest request) {
        Reserve_a_place reserveAPlace =
                reserveAPlaceRepository.findById(id).orElseThrow(() -> new RuntimeException("ReserveAPlace not found"));

        Room room =
                roomRepository.findById(request.getRoomId()).orElseThrow(() -> new RuntimeException("Room not found"));

        reserveAPlace.setCreatedate(request.getCreateDate());
        reserveAPlace.setMoveinDate(request.getMoveInDate());
        reserveAPlace.setNametenant(request.getNameTenant());
        reserveAPlace.setPhonetenant(request.getPhoneTenant());
        reserveAPlace.setDeposit(request.getDeposit());
        reserveAPlace.setNote(request.getNote());
        reserveAPlace.setRoom(room);

        Reserve_a_place updatedReserveAPlace = reserveAPlaceRepository.save(reserveAPlace);
        return mapToResponse(updatedReserveAPlace);
    }

    @Override
    public void deleteReserveAPlace(UUID id) {
        // Chuyển UUID thành HEX (chuỗi HEX)
        String hexId = Hex.encodeHexString(toBytes(id));

        // Kiểm tra sự tồn tại của ReserveAPlace
        if (!reserveAPlaceRepository.existsById(id)) {
            throw new RuntimeException("ReserveAPlace not found");
        }

        // Thực hiện xóa bằng cách gọi custom query
        reserveAPlaceRepository.deleteByIdInHex(hexId);
    }

    // Hàm chuyển UUID thành mảng byte
    private byte[] toBytes(UUID uuid) {
        ByteBuffer buffer = ByteBuffer.wrap(new byte[16]);
        buffer.putLong(uuid.getMostSignificantBits());
        buffer.putLong(uuid.getLeastSignificantBits());
        return buffer.array();
    }

    @Override
    public List<ReserveAPlaceResponse> getReserveAPlacesByRoomId(UUID roomId) {
        List<Reserve_a_place> reserveAPlaces = reserveAPlaceRepository.findByRoom_RoomId(roomId);

        return reserveAPlaces.stream()
                .map(this::mapToResponse) // Chuyển đổi thành DTO
                .collect(Collectors.toList());
    }

    private ReserveAPlaceResponse mapToResponse(Reserve_a_place reserveAPlace) {
        RoomResponse2 roomResponse = RoomResponse2.builder()
                .roomId(reserveAPlace.getRoom().getRoomId())
                .name(reserveAPlace.getRoom().getName()) // Ví dụ trường roomName
                .price(reserveAPlace.getRoom().getPrice()) // Ví dụ trường roomPrice
                .build();
        System.out.println("Status po day" + " " + reserveAPlace.getStatus());
        return ReserveAPlaceResponse.builder()
                .reserveAPlaceId(reserveAPlace.getReserveaplaceId())
                .createDate(reserveAPlace.getCreatedate())
                .moveInDate(reserveAPlace.getMoveinDate())
                .nameTenant(reserveAPlace.getNametenant())
                .phoneTenant(reserveAPlace.getPhonetenant())
                .deposit(reserveAPlace.getDeposit())
                .note(reserveAPlace.getNote())
                .status(reserveAPlace.getStatus())
                .room(roomResponse) // Trả về RoomResponse
                .build();
    }
}
