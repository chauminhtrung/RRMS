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
@Table(name = "type_rooms")
public class TypeRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID typeRoomId;

    @Column(columnDefinition = "VARCHAR(50)")
    private String name;
}
