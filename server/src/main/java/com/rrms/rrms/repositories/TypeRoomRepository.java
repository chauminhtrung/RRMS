package com.rrms.rrms.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.TypeRoom;

public interface TypeRoomRepository extends JpaRepository<TypeRoom, UUID> {
    Optional<TypeRoom> findByName(String name);

    List<TypeRoom> findAllByName(String name);

}
