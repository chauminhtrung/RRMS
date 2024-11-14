package com.rrms.rrms.models;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(columnDefinition = "VARCHAR(255)")
    private String maxPerson;

    @Column(name = "move_in_date", columnDefinition = "Date")
    private Date moveInDate;

    @Column(columnDefinition = "Date")
    private Date createdDate = new Date();

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

    @Column(columnDefinition = "BOOLEAN")
    private Boolean status;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean isActive;

    @OneToMany(mappedBy = "bulletinBoard", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonIgnore
    private List<BulletinBoardImage> bulletinBoardImages;

    @OneToMany(mappedBy = "bulletinBoard", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonIgnore
    private List<BulletinBoardReviews> bulletinBoardReviews;

    @OneToMany(mappedBy = "bulletinBoard", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonIgnore
    private List<BulletinBoardRule> bulletinBoardRules;

    @OneToMany(mappedBy = "bulletinBoard", cascade = CascadeType.MERGE, orphanRemoval = true)
    @JsonIgnore
    private List<BulletinBoards_RentalAm> bulletinBoards_RentalAm;
}
