package com.rrms.rrms.services.servicesImp;

import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.TypeRoomMapper;
import com.rrms.rrms.models.TypeRoom;
import com.rrms.rrms.repositories.TypeRoomRepository;
import com.rrms.rrms.services.ITypeRoom;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TypeRoomService implements ITypeRoom {

    TypeRoomRepository typeRoomRepository;
    TypeRoomMapper typeRoomMapper;

    @Override
    public TypeRoomResponse createTypeRoom(TypeRoomRequest typeRoomRequest) {
        typeRoomRepository.findByName(typeRoomRequest.getName()).ifPresent(existingTypeRoom -> {
            throw new AppException(ErrorCode.TYPE_ROOM_EXIST);
        });

        TypeRoom typeRoom = typeRoomMapper.toTypeRoom(typeRoomRequest);
        typeRoom = typeRoomRepository.save(typeRoom);

        return typeRoomMapper.toTypeRoomResponse(typeRoom);
    }
}
