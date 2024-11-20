package com.rrms.rrms.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
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
import com.rrms.rrms.dto.request.BulletinBoardReviewsRequest;
import com.rrms.rrms.dto.response.BulletinBoardReviewsResponse;
import com.rrms.rrms.dto.response.RatingHistoryResponse;
import com.rrms.rrms.services.IBulletinBoardReviews;

@WebMvcTest(BulletinBoardReviewsController.class)
@TestPropertySource("/test.properties")
@Import(SecurityConfigTest.class) // Bỏ qua bảo mật
public class BulletinBoardReviewsControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    IBulletinBoardReviews bulletinBoardReviewsService;

    ObjectMapper objectMapper;

    @BeforeEach
    void init() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void createBulletinBoardReviews() throws Exception {
        BulletinBoardReviewsRequest request = BulletinBoardReviewsRequest.builder()
                .bulletinBoardId(UUID.randomUUID())
                .username("user123")
                .rating(5)
                .content("Excellent board!")
                .build();

        BulletinBoardReviewsResponse response = BulletinBoardReviewsResponse.builder()
                .bulletinBoardReviewsId(UUID.randomUUID())
                .rating(request.getRating())
                .content(request.getContent())
                .build();

        when(bulletinBoardReviewsService.createOrUpdateBulletinBoardReviews(any(BulletinBoardReviewsRequest.class)))
                .thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.post("/bulletin-board-reviews")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Create Bulletin Board Reviews successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.CREATED.value()))
                .andExpect(jsonPath("$.result.rating").value(5));
    }

    @Test
    void getBulletinBoardReviewsByBulletinBoardIdAndUsername() throws Exception {
        UUID bulletinBoardId = UUID.randomUUID();
        String username = "user123";
        BulletinBoardReviewsResponse response = BulletinBoardReviewsResponse.builder()
                .bulletinBoardReviewsId(UUID.randomUUID())
                .rating(5)
                .content("Excellent board!")
                .build();

        when(bulletinBoardReviewsService.getBulletinBoardReviewsByBulletinBoardIdAndUsername(bulletinBoardId, username))
                .thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.get("/bulletin-board-reviews")
                        .param("bulletinBoardId", bulletinBoardId.toString())
                        .param("username", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Get Bulletin Board Reviews successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result.rating").value(5));
    }

    @Test
    void getRatingHistoryByBulletinBoardIdAndUsername() throws Exception {
        String username = "user123";
        List<RatingHistoryResponse> response = new ArrayList<>();
        response.add(RatingHistoryResponse.builder()
                .rating(5)
                .content("Excellent board!")
                .build());
        response.add(
                RatingHistoryResponse.builder().rating(4).content("Good board").build());

        when(bulletinBoardReviewsService.getRatingHistoryByBulletinBoardIdAndUsername(username))
                .thenReturn(response);

        mockMvc.perform(MockMvcRequestBuilders.get("/bulletin-board-reviews/rating-history")
                        .param("username", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Get Rating History successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result[0].rating").value(5))
                .andExpect(jsonPath("$.result[1].rating").value(4));
    }

    @Test
    void deleteBulletinBoardReviewsByBulletinBoardReviewsId() throws Exception {
        UUID bulletinBoardReviewsId = UUID.randomUUID();
        when(bulletinBoardReviewsService.deleteBulletinBoardReviewsByBulletinBoardReviewsId(bulletinBoardReviewsId))
                .thenReturn(1);

        mockMvc.perform(MockMvcRequestBuilders.delete(
                        "/bulletin-board-reviews/{bulletinBoardReviewsId}", bulletinBoardReviewsId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Delete Bulletin Board Reviews successfully"))
                .andExpect(jsonPath("$.code").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.result").value(1));
    }
}
