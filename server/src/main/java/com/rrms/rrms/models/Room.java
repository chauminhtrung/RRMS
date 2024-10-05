package com.rrms.rrms.models;

import java.time.LocalDate;
import java.util.List;
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
@Table(name = "rooms")
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomId;

    @ManyToOne
    @JoinColumn(name = "motel_id")
    private Motel motel;

    @ManyToOne
    @JoinColumn(name = "type_room_id")
    private TypeRoom typeRoom;

    @Column(columnDefinition = "VARCHAR(255)")
    private String nameRoom;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double price;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    @Column(columnDefinition = "INT")
    private Integer roomArea;

    @Column(columnDefinition = "INT")
    private Integer maxPerson;

    @Column(columnDefinition = "DATE")
    private LocalDate rentalStartTime;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean available;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String hours;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany
    @JoinColumn(name = "room_id")
    private List<RoomService> roomServices;

    @OneToMany
    @JoinColumn(name = "room_id")
    private List<RoomImage> roomImages;

    @OneToMany()
    @JoinColumn(name = "room_id")
    private List<RoomReview> roomReviews;
}
