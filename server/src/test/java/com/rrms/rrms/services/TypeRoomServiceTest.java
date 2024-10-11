package com.rrms.rrms.services;

// Các import cần thiết cho việc kiểm thử

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;

import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.TypeRoomMapper;
import com.rrms.rrms.models.TypeRoom;
import com.rrms.rrms.repositories.TypeRoomRepository;

import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Slf4j
@AutoConfigureMockMvc
@FieldDefaults(level = AccessLevel.PRIVATE)
@TestPropertySource("/test.properties")
public class TypeRoomServiceTest {

    @Autowired
    ITypeRoom typeRoomService;

    @MockBean
    TypeRoomRepository typeRoomRepository;

    @MockBean
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
