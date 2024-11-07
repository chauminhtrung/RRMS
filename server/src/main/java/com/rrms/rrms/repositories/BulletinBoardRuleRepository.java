package com.rrms.rrms.repositories;

import com.rrms.rrms.models.BulletinBoardRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BulletinBoardRuleRepository extends JpaRepository<BulletinBoardRule, UUID> {
}