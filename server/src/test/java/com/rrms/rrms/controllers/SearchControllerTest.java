package com.rrms.rrms.controllers;

import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.services.ISearchService;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/test.properties")
public class SearchControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ISearchService searchService;

    ObjectMapper objectMapper;

    @BeforeEach
    void init() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void getRoom_returnsListOfBulletinBoardSearchResponse() throws Exception {
        // Arrange: Mock service to return a list of BulletinBoardSearchResponse
        BulletinBoardSearchResponse room =
                BulletinBoardSearchResponse.builder().address("123 Main St").build();
        when(searchService.getRooms()).thenReturn(List.of(room));

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result[0].address")
                        .value("123 Main St")); // Ensure the correct address is returned
    }

    @Test
    void getRoom_whenNoRooms_returnsEmptyList() throws Exception {
        // Arrange: Mock service to return an empty list
        when(searchService.getRooms()).thenReturn(List.of());

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result").isEmpty()); // Ensure the result is an empty list
    }

    @Test
    void getRoomHomeDateNew_returnsListOfBulletinBoardSearchResponse() throws Exception {
        // Arrange: Mock service to return a list of BulletinBoardSearchResponse
        BulletinBoardSearchResponse room = BulletinBoardSearchResponse.builder()
                .address("123 Main St")
                .createdDate(new Date())
                .build();
        when(searchService.findAllByDatenew()).thenReturn(List.of(room));

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs/roomNews").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result[0].address").value("123 Main St"));
    }

    @Test
    void getRoomHomeDateNew_whenNoRooms_returnsEmptyList() throws Exception {
        // Arrange: Mock service to return an empty list
        when(searchService.findAllByDatenew()).thenReturn(List.of());

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs/roomNews").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result").isEmpty()); // Ensure the result is an empty list
    }

    @Test
    void getRoomHomeDateNewVieux_returnsListOfBulletinBoardSearchResponse() throws Exception {
        // Arrange: Mock service to return a list of BulletinBoardSearchResponse
        BulletinBoardSearchResponse room = BulletinBoardSearchResponse.builder()
                .address("456 Old St")
                .createdDate(new Date())
                .build();
        when(searchService.findAllByIsActive()).thenReturn(List.of(room));

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs/roomVieux").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result[0].address").value("456 Old St"));
    }

    @Test
    void getRoomHomeDateNewVieux_whenNoRooms_returnsEmptyList() throws Exception {
        // Arrange: Mock service to return an empty list
        when(searchService.findAllByIsActive()).thenReturn(List.of());

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs/roomVieux").contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result").isEmpty()); // Ensure the result is an empty list
    }

    @Test
    void searchAddress_returnsListOfBulletinBoardSearchResponse() throws Exception {
        // Arrange: Mock service to return a list of BulletinBoardSearchResponse
        BulletinBoardSearchResponse room = BulletinBoardSearchResponse.builder()
                .address("123 Main St")
                .createdDate(new Date())
                .build();
        when(searchService.listRoomByAddress("123 Main St")).thenReturn(List.of(room));

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs/addressBullet")
                        .param("address", "123 Main St")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Tìm kiếm thành công"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result[0].address")
                        .value("123 Main St")); // Ensure the correct address is returned
    }

    @Test
    void searchAddress_whenNoRoomsFound_returnsEmptyList() throws Exception {
        // Arrange: Mock service to return an empty list
        when(searchService.listRoomByAddress("Nonexistent Address")).thenReturn(List.of());

        // Act & Assert: Perform the GET request and verify the response
        mockMvc.perform(MockMvcRequestBuilders.get("/searchs/addressBullet")
                        .param("address", "Nonexistent Address")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk()) // Expecting HTTP 200 OK
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Không tìm thấy kết quả"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.result").isEmpty()); // Ensure the result is an empty list
    }
}
