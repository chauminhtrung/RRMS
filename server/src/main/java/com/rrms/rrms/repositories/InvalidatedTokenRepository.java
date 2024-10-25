package com.rrms.rrms.repositories;

import com.rrms.rrms.models.InvalidatedToken;
import com.rrms.rrms.models.Permission;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
