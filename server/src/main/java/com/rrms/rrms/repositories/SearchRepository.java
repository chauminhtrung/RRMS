package com.rrms.rrms.repositories;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.models.BulletinBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rrms.rrms.models.Search;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SearchRepository extends JpaRepository<Search, UUID> {
        @Query("SELECT r FROM BulletinBoard r WHERE r.address LIKE %:address%")
        List<BulletinBoard> findAllByNameRoom(@Param("address") String address);
}
