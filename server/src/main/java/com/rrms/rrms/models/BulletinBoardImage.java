package com.rrms.rrms.models;

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
public class BulletinBoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bulletinBoardImageId;

    @ManyToOne
    @JoinColumn(name = "bulletInBoardId")
    private BulletinBoard bulletInBoard;

    @Column(columnDefinition = "VARCHAR(255)")
    private String imageLink;
    
}
