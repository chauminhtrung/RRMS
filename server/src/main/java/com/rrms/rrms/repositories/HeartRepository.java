package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Heart;

public interface HeartRepository extends JpaRepository<Heart, UUID> {}
