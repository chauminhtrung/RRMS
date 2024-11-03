package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Broker;

public interface BrokerRepository extends JpaRepository<Broker, UUID> {

    List<Broker> findByMotelId(UUID motelId);
}
