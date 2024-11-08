package com.rrms.rrms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bulletin_board_images")
@JsonIgnoreProperties({"bulletinBoard"})
public class BulletinBoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bulletinBoardImageId;

    @ManyToOne
    @JoinColumn(name = "bulletin_board_id", nullable = false)
    private BulletinBoard bulletinBoard;

    @Column(columnDefinition = "VARCHAR(255)")
    private String imageLink;

}
