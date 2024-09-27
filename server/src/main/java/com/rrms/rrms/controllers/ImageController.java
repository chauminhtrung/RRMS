package com.rrms.rrms.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rrms.rrms.models.Image;
import com.rrms.rrms.repositories.ImageRepository;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/images")
@Slf4j
@CrossOrigin("*")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping
    public ResponseEntity<Image> saveImage(@RequestBody Image image) {
        Image savedImage = imageRepository.save(image);
        log.info("Image saved: {}", savedImage);
        return new ResponseEntity<>(savedImage, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Image>> getAllImages() {
        List<Image> images = imageRepository.findAll();
        images.forEach(image -> log.info("Image: {}", image));
        return new ResponseEntity<>(images, HttpStatus.OK);
    }
}
