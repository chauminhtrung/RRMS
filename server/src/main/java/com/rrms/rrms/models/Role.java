package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import com.rrms.rrms.enums.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roleId;

    @Enumerated(EnumType.STRING)
    private Roles roleName;

    @Column(columnDefinition = "TEXT")
    private String description;
}
