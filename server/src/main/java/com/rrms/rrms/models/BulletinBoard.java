package com.rrms.rrms.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bulletin_boards")
public class BulletinBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bulletinBoardId;

    @ManyToOne
    @JoinColumn(name = "username")
    private Account account;

    @Column(columnDefinition = "VARCHAR(255)")
    private String title;

    @Column(columnDefinition = "VARCHAR(255)")
    private String rentalCategory;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "DOUBLE")
    private Double rentPrice;

    @Column(columnDefinition = "DOUBLE")
    private Double promotionalRentalPrice;

    @Column(columnDefinition = "DOUBLE")
    private Double deposit;

    @Column(columnDefinition = "INT")
    private Integer area;

    @Column(columnDefinition = "DOUBLE")
    private Double electricityPrice;

    @Column(columnDefinition = "DOUBLE")
    private Double waterPrice;

    @Column(columnDefinition = "INT")
    private Integer maxPerson;

    @Column(columnDefinition = "Date")
    private Date moveInDate;

    @Column(columnDefinition = "VARCHAR(255)")
    private String openingHours;

    @Column(columnDefinition = "VARCHAR(255)")
    private String closeHours;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "DOUBLE")
    private Double longitude;

    @Column(columnDefinition = "DOUBLE")
    private Double latitude;

    @OneToMany(mappedBy = "bulletInBoard", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<BulletinBoardImage> bulletinBoardImages;

    @OneToMany(mappedBy = "bulletInBoard", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<BulletinBoardReviews> bulletinBoardReviews;
}
