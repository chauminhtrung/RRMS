package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "type_rooms")
public class TypeRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID typeRoomId;

    @Column(columnDefinition = "VARCHAR(50)", unique = true)
    private String name;
}
