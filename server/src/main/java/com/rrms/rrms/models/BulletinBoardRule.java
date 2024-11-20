package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bulletin_board_rules")
@Builder
@JsonIgnoreProperties({"bulletinBoard"})
public class BulletinBoardRule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bulletinBoardRuleId;

    @ManyToOne
    @JoinColumn(name = "bulletin_board_id")
    private BulletinBoard bulletinBoard;

    @ManyToOne
    @JoinColumn(columnDefinition = "rule_id")
    private Rule rule;
}
