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
@Table(name = "room_reviews")
public class RoomReview {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomReviewId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "INT")
    private int rating;
}
