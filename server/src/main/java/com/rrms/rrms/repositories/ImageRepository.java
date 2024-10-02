package com.rrms.rrms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {}
