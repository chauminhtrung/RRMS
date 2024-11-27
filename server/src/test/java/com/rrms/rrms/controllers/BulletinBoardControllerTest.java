package com.rrms.rrms.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.dto.request.BulletinBoardRequest;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.services.IBulletinBoard;

@WebMvcTest(BulletinBoardController.class)
@TestPropertySource("/test.properties")
@Import(SecurityConfigTest.class) // Bỏ qua bảo mật
class BulletinBoardControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    IBulletinBoard bulletinBoardService;

    ObjectMapper objectMapper;

    @BeforeEach
    void init() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    // Test lấy tất cả các bulletin board
    @Test
    void getAllBulletinBoards() throws Exception {
        List<BulletinBoardResponse> bulletinBoardList = Arrays.asList(
                BulletinBoardResponse.builder()
                        .bulletinBoardId(UUID.randomUUID())
                        .title("Board 1")
                        .build(),
                BulletinBoardResponse.builder()
                        .bulletinBoardId(UUID.randomUUID())
                        .title("Board 2")
                        .build());

        when(bulletinBoardService.getAllBulletinBoards()).thenReturn(bulletinBoardList);

        mockMvc.perform(MockMvcRequestBuilders.get("/bulletin-board").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Get all bulletin board successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.size()").value(2));
    }

    // Test lấy bulletin board theo ID
    @Test
    void getBulletinBoardById() throws Exception {
        UUID boardId = UUID.randomUUID();
        BulletinBoardResponse bulletinBoardResponse = BulletinBoardResponse.builder()
                .bulletinBoardId(boardId)
                .title("Board 1")
                .build();

        when(bulletinBoardService.getBulletinBoardById(boardId)).thenReturn(bulletinBoardResponse);

        mockMvc.perform(MockMvcRequestBuilders.get("/bulletin-board/{id}", boardId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Get bulletin board by id successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.title").value("Board 1"));
    }

    // Test tạo bulletin board
    @Test
    void createBulletinBoard() throws Exception {
        BulletinBoardRequest request =
                BulletinBoardRequest.builder().title("New Board").build();
        BulletinBoardResponse response = BulletinBoardResponse.builder()
                .bulletinBoardId(UUID.randomUUID())
                .title("New Board")
                .build();

        when(bulletinBoardService.createBulletinBoard(any(BulletinBoardRequest.class)))
                .thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.post("/bulletin-board")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(jsonPath("$.message").value("Create bulletin board successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.CREATED.value()))
                .andExpect(jsonPath("$.result.title").value("New Board"));
    }

    // Test cập nhật bulletin board
    @Test
    void updateBulletinBoard() throws Exception {
        UUID boardId = UUID.randomUUID();
        BulletinBoardRequest request =
                BulletinBoardRequest.builder().title("Updated Board").build();
        BulletinBoardResponse response = BulletinBoardResponse.builder()
                .bulletinBoardId(boardId)
                .title("Updated Board")
                .build();

        when(bulletinBoardService.updateBulletinBoard(eq(boardId), any(BulletinBoardRequest.class)))
                .thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.put("/bulletin-board/{id}", boardId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Update bulletin board successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.title").value("Updated Board"));
    }

    // Test xóa bulletin board
    @Test
    void deleteBulletinBoard() throws Exception {
        UUID boardId = UUID.randomUUID();

        doNothing().when(bulletinBoardService).deleteBulletinBoard(boardId);

        mockMvc.perform(MockMvcRequestBuilders.delete("/bulletin-board/{id}", boardId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent()); // Mã trạng thái 204 khi xóa thành công
    }

    // Test tìm kiếm bulletin board
    @Test
    void searchBulletinBoards() throws Exception {
        String address = "Some Address";
        List<BulletinBoardSearchResponse> searchResults = Arrays.asList(
                BulletinBoardSearchResponse.builder()
                        .bulletinBoardId(UUID.randomUUID())
                        .title("Board 1")
                        .address(address)
                        .build(),
                BulletinBoardSearchResponse.builder()
                        .bulletinBoardId(UUID.randomUUID())
                        .title("Board 2")
                        .address(address)
                        .build());

        when(bulletinBoardService.searchBulletinBoards(address)).thenReturn(searchResults);

        mockMvc.perform(MockMvcRequestBuilders.get("/bulletin-board/search")
                        .param("address", address)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Search bulletin board successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.size()").value(2));
    }


}
