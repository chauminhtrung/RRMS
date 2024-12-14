package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Support;

public interface SupportRepository extends JpaRepository<Support, UUID> {
    List<Support> findAllByOrderByCreateDateDesc();
}
