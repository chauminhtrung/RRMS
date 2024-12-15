package com.rrms.rrms.models;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supports")
public class Support {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID supportId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    private String nameContact;

    private String phoneContact;

    @Column(columnDefinition = "DATE")
    private Date dateOfStay;


    @Column(columnDefinition = "TIMESTAMP", nullable = false, updatable = false)
    private LocalDateTime createDate;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long priceFirst;

    @Column(columnDefinition = "DECIMAL(10, 2)")
    private long priceEnd;

    @PrePersist
    protected void onCreate() {
        this.createDate = LocalDateTime.now();
    }
}
