package com.rrms.rrms.controllers;

import static org.mockito.Mockito.doNothing;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.rrms.rrms.configs.SecurityConfigTest;
import com.rrms.rrms.services.IBulletinBoardImage;

@WebMvcTest(BulletinBoardImageController.class)
@TestPropertySource("/test.properties")
@Import(SecurityConfigTest.class) // Bỏ qua bảo mật
public class BulletinBoardImageControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    IBulletinBoardImage bulletinBoardImageService;

    @Test
    void deleteBulletinBoardImageSuccess() throws Exception {
        UUID bulletinBoardImageId = UUID.randomUUID(); // Tạo một ID ngẫu nhiên

        // Giả lập việc xóa hình ảnh thành công
        doNothing().when(bulletinBoardImageService).deleteBulletinBoardImage(bulletinBoardImageId);

        mockMvc.perform(MockMvcRequestBuilders.delete(
                                "/bulletin-board-image/{bulletinBoardImageId}", bulletinBoardImageId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent()); // Kiểm tra mã trạng thái là 204 No Content
    }
}
