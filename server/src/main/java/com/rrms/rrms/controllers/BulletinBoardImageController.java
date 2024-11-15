package com.rrms.rrms.controllers;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rrms.rrms.services.IBulletinBoardImage;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/bulletin-board-image")
public class BulletinBoardImageController {
    IBulletinBoardImage bulletinBoardImageService;

    @DeleteMapping("/{bulletinBoardImageId}")
    public ResponseEntity<Void> deleteBulletinBoardImage(@PathVariable UUID bulletinBoardImageId) {
        try {
            bulletinBoardImageService.deleteBulletinBoardImage(bulletinBoardImageId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
