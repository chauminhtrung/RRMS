package com.rrms.rrms.services;

import com.rrms.rrms.repositories.BulletinBoardImageRepository;
import com.rrms.rrms.services.servicesImp.BulletinBoardImageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BulletinBoardImageServiceTest {

    @Mock
    private BulletinBoardImageRepository bulletinBoardImageRepository;

    @InjectMocks
    private BulletinBoardImageService bulletinBoardImageService;

    @Test
    void testDeleteBulletinBoardImage() {
        UUID bulletinBoardImageId = UUID.randomUUID();

        doNothing().when(bulletinBoardImageRepository).deleteById(bulletinBoardImageId);

        bulletinBoardImageService.deleteBulletinBoardImage(bulletinBoardImageId);

        verify(bulletinBoardImageRepository, times(1)).deleteById(bulletinBoardImageId);
    }

    @Test
    void testDeleteBulletinBoardImageNotFound() {
        UUID bulletinBoardImageId = UUID.randomUUID();

        doNothing().when(bulletinBoardImageRepository).deleteById(bulletinBoardImageId);

        bulletinBoardImageService.deleteBulletinBoardImage(bulletinBoardImageId);

        verify(bulletinBoardImageRepository, times(1)).deleteById(bulletinBoardImageId);
    }

    @Test
    void testDeleteBulletinBoardImageThrowsException() {
        UUID bulletinBoardImageId = UUID.randomUUID();

        doThrow(new RuntimeException("Database Error")).when(bulletinBoardImageRepository).deleteById(bulletinBoardImageId);

        assertThrows(RuntimeException.class, () -> bulletinBoardImageService.deleteBulletinBoardImage(bulletinBoardImageId));
    }


}
