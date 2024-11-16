package com.rrms.rrms.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bulletin_board_images")
@JsonIgnoreProperties({"bulletinBoard"})
@Builder
public class BulletinBoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID bulletinBoardImageId;

    @ManyToOne
    @JoinColumn(name = "bulletin_board_id")
    private BulletinBoard bulletinBoard;

    @Column(columnDefinition = "VARCHAR(255)")
    private String imageLink;
}
