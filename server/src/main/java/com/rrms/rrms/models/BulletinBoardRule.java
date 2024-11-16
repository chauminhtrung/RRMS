package com.rrms.rrms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

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
