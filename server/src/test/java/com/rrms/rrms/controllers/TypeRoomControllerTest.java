package com.rrms.rrms.controllers;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rrms.rrms.dto.request.TypeRoomRequest;
import com.rrms.rrms.dto.response.TypeRoomResponse;
import com.rrms.rrms.services.ITypeRoom;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/test.properties")
public class TypeRoomControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ITypeRoom typeRoomService;

    TypeRoomRequest typeRoomRequest;
    TypeRoomResponse typeRoomResponse;
    ObjectMapper objectMapper;

    @BeforeEach
    void init() {
        typeRoomRequest = TypeRoomRequest.builder().name("Phòng đơn").build();

        typeRoomResponse = TypeRoomResponse.builder().name("Phòng đơn").build();

        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void createTypeRoomNotAuthorized() throws Exception {
        String content = objectMapper.writeValueAsString(typeRoomRequest);

        when(typeRoomService.createTypeRoom(ArgumentMatchers.any())).thenReturn(typeRoomResponse);

        mockMvc.perform(MockMvcRequestBuilders.post("/type-rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.UNAUTHORIZED.value()));
    }
}
