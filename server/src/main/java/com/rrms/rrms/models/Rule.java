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
@Table(name = "rules")
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID ruleId;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String ruleName;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long price;
}
