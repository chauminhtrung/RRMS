package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "motel_rules")
public class MotelRule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID motelRuleId;

    @ManyToOne
    @JoinColumn(name = "motelId")
    private Motel motel;

    @ManyToOne
    @JoinColumn(name = "ruleId")
    private Rule rule;
}
