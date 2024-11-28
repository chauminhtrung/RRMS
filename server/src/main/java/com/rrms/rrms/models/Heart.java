package com.rrms.rrms.models;

import java.util.ArrayList;
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
@Builder
@Table(name = "hearts")
public class Heart {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID heartId;

    @OneToOne
    @JoinColumn(name = "username")
    private Account account;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "heart_room",
            joinColumns = @JoinColumn(name = "heart_id"),
            inverseJoinColumns = @JoinColumn(name = "bulletinBoard_id"))
    private List<BulletinBoard> rooms = new ArrayList<>();
}
