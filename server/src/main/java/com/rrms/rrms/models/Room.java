package com.rrms.rrms.models;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JoinColumn(name = "motel_id", nullable = false)
    private Motel motel;

    @ManyToOne
    @JoinColumn(name = "type_room_id", nullable = false)
    private TypeRoom typeRoom;

    @Column(name = "name_room", columnDefinition = "VARCHAR(255)", nullable = false)
    private String nameRoom;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double price;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private Double deposit;

    @Column(name = "room_area", columnDefinition = "INT")
    private Integer roomArea;

    @Column(name = "max_person", columnDefinition = "INT")
    private Integer maxPerson;

    @Column(name = "rental_start_time", columnDefinition = "DATE")
    private LocalDate rentalStartTime;

    @Column(name = "available", columnDefinition = "BOOLEAN")
    private Boolean available;

    @Column(name = "hours", columnDefinition = "NVARCHAR(255)")
    private String hours;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Thêm @JsonIgnore để bỏ qua ánh xạ này khi tuần tự hóa
    private List<RoomService> roomServices;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Thêm @JsonIgnore để bỏ qua ánh xạ này khi tuần tự hóa
    private List<RoomImage> roomImages;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Thêm @JsonIgnore để bỏ qua ánh xạ này khi tuần tự hóa
    private List<RoomReview> roomReviews;
}
