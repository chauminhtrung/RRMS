package com.rrms.rrms.services;

// Các import cần thiết cho việc kiểm thử

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.TypeRoomMapper;
import com.rrms.rrms.models.TypeRoom;
import com.rrms.rrms.repositories.TypeRoomRepository;
import com.rrms.rrms.services.servicesImp.TypeRoomService;

@ExtendWith(MockitoExtension.class)
public class TypeRoomServiceTest {

    @InjectMocks
    TypeRoomService typeRoomService;

    @Mock
    TypeRoomRepository typeRoomRepository;

    @Mock
    TypeRoomMapper typeRoomMapper;

    TypeRoomRequest typeRoomRequest;
    TypeRoomResponse typeRoomResponse;
    TypeRoom typeRoom;

    @BeforeEach
    void init() {
        typeRoomRequest = TypeRoomRequest.builder().name("Động bàn tơ").build();

        typeRoomResponse = TypeRoomResponse.builder().name("Động bàn tơ").build();

        typeRoom = TypeRoom.builder().name("Động bàn tơ").build();
    }

    @Test
    void createTypeRoom_success() {
        when(typeRoomRepository.findByName(typeRoomRequest.getName())).thenReturn(Optional.empty());
        when(typeRoomMapper.toTypeRoom(typeRoomRequest)).thenReturn(typeRoom);
        when(typeRoomRepository.save(typeRoom)).thenReturn(typeRoom);
        when(typeRoomMapper.toTypeRoomResponse(typeRoom)).thenReturn(typeRoomResponse);

        var response = typeRoomService.createTypeRoom(typeRoomRequest);

        assertEquals(typeRoomResponse.getName(), response.getName());

        verify(typeRoomRepository).findByName(typeRoomRequest.getName());
        verify(typeRoomMapper).toTypeRoom(typeRoomRequest);
        verify(typeRoomRepository).save(typeRoom);
        verify(typeRoomMapper).toTypeRoomResponse(typeRoom);
    }

    @Test
    void createTypeRoom_whenTypeRoomExists_throwsException() {
        when(typeRoomRepository.findByName(typeRoomRequest.getName())).thenReturn(Optional.of(typeRoom));

        AppException exception = assertThrows(AppException.class, () -> {
            typeRoomService.createTypeRoom(typeRoomRequest);
        });

        assertEquals(ErrorCode.TYPE_ROOM_EXIST, exception.getErrorCode());
    }
}
