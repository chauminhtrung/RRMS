package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Heart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

public interface HeartRepository extends JpaRepository<Heart, UUID> {
}
