package com.rrms.rrms.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rrms.rrms.dto.response.BulletinBoardSearchResponse;
import com.rrms.rrms.enums.ErrorCode;
import com.rrms.rrms.exceptions.AppException;
import com.rrms.rrms.mapper.BulletinBoardMapper;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.repositories.BulletinBoardRepository;
import com.rrms.rrms.repositories.SearchRepository;
import com.rrms.rrms.services.servicesImp.SearchService;

import lombok.extern.slf4j.Slf4j;

@ExtendWith(MockitoExtension.class)
@Slf4j
public class SearchServiceTest {

    @InjectMocks
    SearchService bulletinBoardService;

    @Mock
    BulletinBoardRepository bulletinBoardRepository;

    @Mock
    BulletinBoardMapper bulletinBoardMapper;

    BulletinBoard bulletinBoard;
    BulletinBoardSearchResponse bulletinBoardSearchResponse;

    @Mock
    SearchRepository searchRepository;

    @BeforeEach
    void init() {
        bulletinBoard = BulletinBoard.builder()
                .isActive(true)
                .title("Board 1")
                .address("123 Main St")
                .build();
        bulletinBoardSearchResponse = BulletinBoardSearchResponse.builder()
                .title("Board 1")
                .address("123 Main St")
                .build();
    }

    @Test
    void getRooms_success() {
        // Given
        List<BulletinBoard> bulletinBoards = List.of(bulletinBoard);
        when(bulletinBoardRepository.findAllByIsActive(true)).thenReturn(bulletinBoards);
        when(bulletinBoardMapper.toBulletinBoardSearchResponse(bulletinBoard)).thenReturn(bulletinBoardSearchResponse);

        // When
        List<BulletinBoardSearchResponse> response = bulletinBoardService.getRooms();

        // Then
        log.info(response.toString());
        assertEquals(1, response.size());
        assertEquals("Board 1", response.get(0).getTitle());

        verify(bulletinBoardRepository).findAllByIsActive(true);
        verify(bulletinBoardMapper).toBulletinBoardSearchResponse(bulletinBoard);
    }

    @Test
    void getRooms_whenNoActiveBulletinBoards_returnsEmptyList() {
        // Given
        when(bulletinBoardRepository.findAllByIsActive(true)).thenReturn(List.of());

        // When
        List<BulletinBoardSearchResponse> response = bulletinBoardService.getRooms();

        // Then
        assertTrue(response.isEmpty());

        verify(bulletinBoardRepository).findAllByIsActive(true);
        verifyNoInteractions(bulletinBoardMapper);
    }

    @Test
    void listRoomByAddress_foundRooms_returnsBulletinBoardSearchResponseList() {
        // Mocking the repository and mapper
        when(bulletinBoardRepository.findByAddress("123 Main St")).thenReturn(List.of(bulletinBoard));
        when(bulletinBoardMapper.toBulletinBoardSearchResponse(bulletinBoard)).thenReturn(bulletinBoardSearchResponse);

        // Call the method
        List<BulletinBoardSearchResponse> response = bulletinBoardService.listRoomByAddress("123 Main St");

        // Verify results
        assertNotNull(response);
        assertEquals(1, response.size());

        assertEquals("123 Main St", response.get(0).getAddress());

        // Verify interactions
        verify(bulletinBoardRepository).findByAddress("123 Main St");
        verify(bulletinBoardMapper).toBulletinBoardSearchResponse(bulletinBoard);
    }

    @Test
    void listRoomByAddress_noRooms_found_throwsAppException() {
        // Mocking the repository to return an empty list
        when(bulletinBoardRepository.findByAddress("123 Main St")).thenReturn(List.of());

        // Call the method and verify the exception
        AppException exception = assertThrows(AppException.class, () -> {
            bulletinBoardService.listRoomByAddress("123 Main St");
        });

        // Verify exception details
        assertEquals(ErrorCode.SEARCH_NOT_FOUND, exception.getErrorCode());

        // Verify repository interaction
        verify(bulletinBoardRepository).findByAddress("123 Main St");
    }

    @Test
    void findAllByDatenew_returnsListOfBulletinBoardSearchResponse() {
        // Arrange: Mock repository to return a list of BulletinBoard objects
        when(searchRepository.findAllByDatenew()).thenReturn(List.of(bulletinBoard));

        // Mock the mapper to convert BulletinBoard to BulletinBoardSearchResponse
        when(bulletinBoardMapper.toBulletinBoardSearchResponse(bulletinBoard)).thenReturn(bulletinBoardSearchResponse);

        // Act: Call the method under test
        List<BulletinBoardSearchResponse> result = bulletinBoardService.findAllByDatenew();

        // Assert: Check that the result is not null and contains the expected data
        assertNotNull(result);
        assertEquals(1, result.size()); // Ensure there's exactly 1 item
        assertEquals("123 Main St", result.get(0).getAddress()); // Ensure the address is correctly mapped

        // Verify the interactions with the repository and mapper
        verify(searchRepository).findAllByDatenew();
        verify(bulletinBoardMapper).toBulletinBoardSearchResponse(bulletinBoard);
    }

    @Test
    void findAllByDatenew_whenNoData_returnsEmptyList() {
        // Arrange: Mock repository to return an empty list
        when(searchRepository.findAllByDatenew()).thenReturn(List.of());

        // Act: Call the method under test
        List<BulletinBoardSearchResponse> result = bulletinBoardService.findAllByDatenew();

        // Assert: Check that the result is an empty list
        assertNotNull(result);
        assertTrue(result.isEmpty()); // Ensure the list is empty

        // Verify the interaction with the repository
        verify(searchRepository).findAllByDatenew();
    }

    @Test
    void findAllByDateVieux_returnsListOfBulletinBoardSearchResponse() {
        // Arrange: Mock repository to return a list of BulletinBoard objects
        when(searchRepository.findAllByDateVieux()).thenReturn(List.of(bulletinBoard));

        // Mock the mapper to convert BulletinBoard to BulletinBoardSearchResponse
        when(bulletinBoardMapper.toBulletinBoardSearchResponse(bulletinBoard)).thenReturn(bulletinBoardSearchResponse);

        // Act: Call the method under test
        List<BulletinBoardSearchResponse> result = bulletinBoardService.findAllByDateVieux();

        // Assert: Check that the result is not null and contains the expected data
        assertNotNull(result);
        assertEquals(1, result.size()); // Ensure there's exactly 1 item
        assertEquals("123 Main St", result.get(0).getAddress()); // Ensure the address is correctly mapped

        // Verify the interactions with the repository and mapper
        verify(searchRepository).findAllByDateVieux();
        verify(bulletinBoardMapper).toBulletinBoardSearchResponse(bulletinBoard);
    }

    @Test
    void findAllByDateVieux_whenNoData_returnsEmptyList() {
        // Arrange: Mock repository to return an empty list
        when(searchRepository.findAllByDateVieux()).thenReturn(List.of());

        // Act: Call the method under test
        List<BulletinBoardSearchResponse> result = bulletinBoardService.findAllByDateVieux();

        // Assert: Check that the result is an empty list
        assertNotNull(result);
        assertTrue(result.isEmpty()); // Ensure the list is empty

        // Verify the interaction with the repository
        verify(searchRepository).findAllByDateVieux();
    }
}
