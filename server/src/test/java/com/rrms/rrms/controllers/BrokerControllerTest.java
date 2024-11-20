package com.rrms.rrms.controllers;

import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.dto.request.BrokerCreateRequest;
import com.rrms.rrms.dto.response.BrokerResponse;
import com.rrms.rrms.services.IBroker;

@WebMvcTest(BrokerController.class)
@TestPropertySource("/test.properties")
@Import(SecurityConfigTest.class) // Bỏ qua bảo mật
public class BrokerControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    IBroker brokerService;

    BrokerCreateRequest brokerCreateRequest;
    BrokerResponse brokerResponse;
    List<BrokerResponse> brokerResponseList;
    ObjectMapper objectMapper;
    UUID motelId = UUID.randomUUID();

    @BeforeEach
    void init() {

        brokerCreateRequest = BrokerCreateRequest.builder().name("Broker 1").build();
        brokerResponse = BrokerResponse.builder().name("Broker 1").build();
        brokerResponseList = Collections.singletonList(brokerResponse);

        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void createBrokerSuccess() throws Exception {
        String content = objectMapper.writeValueAsString(brokerCreateRequest);

        when(brokerService.createBroker(ArgumentMatchers.any())).thenReturn(brokerResponse);

        mockMvc.perform(MockMvcRequestBuilders.post("/broker")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Create broker successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result.name").value("Broker 1"));
    }

    @Test
    void getAllBrokerSuccess() throws Exception {
        when(brokerService.getAllBroker(ArgumentMatchers.any())).thenReturn(brokerResponseList);

        mockMvc.perform(MockMvcRequestBuilders.get("/broker/{motelId}", motelId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("get all broker successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result[0].name").value("Broker 1"));
    }

    @Test
    void getAllBrokerNotFound() throws Exception {
        when(brokerService.getAllBroker(ArgumentMatchers.any())).thenReturn(Collections.emptyList());

        mockMvc.perform(MockMvcRequestBuilders.get("/broker/{motelId}", motelId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("get all broker successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result").isEmpty());
    }
}
