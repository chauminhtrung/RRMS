package com.rrms.rrms.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Motel;

public interface MotelRepository extends JpaRepository<Motel, UUID> {}
