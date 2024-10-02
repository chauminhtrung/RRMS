package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Search;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SearchRepository extends JpaRepository<Search, UUID> {
}