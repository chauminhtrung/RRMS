package com.rrms.rrms.repositories;

import com.rrms.rrms.models.Broker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BrokerRepository extends JpaRepository<Broker, UUID> {

    List<Broker> findByMotelId(UUID motelId);
}
