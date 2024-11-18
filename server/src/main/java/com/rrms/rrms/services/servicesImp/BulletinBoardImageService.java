package com.rrms.rrms.services.servicesImp;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.rrms.rrms.repositories.BulletinBoardImageRepository;
import com.rrms.rrms.services.IBulletinBoardImage;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BulletinBoardImageService implements IBulletinBoardImage {
    BulletinBoardImageRepository bulletinBoardImageRepository;

    @Override
    public void deleteBulletinBoardImage(UUID bulletinBoardImageId) {
        bulletinBoardImageRepository.deleteById(bulletinBoardImageId);
    }
}
