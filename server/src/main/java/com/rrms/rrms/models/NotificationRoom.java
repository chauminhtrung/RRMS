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
@Table(name = "notification_rooms")
public class NotificationRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID notificationRoomId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;
}
