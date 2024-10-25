package com.rrms.rrms.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Service;

public interface ServiceRepository extends JpaRepository<Service, UUID> {
    Optional<Service> findByNameService(String serviceName);
}
