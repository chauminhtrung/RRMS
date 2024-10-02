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
@Table(name = "searchs")
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID searchId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    @Column(columnDefinition = "TEXT")
    private String content;
}
