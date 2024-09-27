package com.rrms.rrms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rrms.rrms.models.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {}
