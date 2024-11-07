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
@Table(name = "contracttemplates")
public class ContractTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contracttemplateId;

    @ManyToOne
    @JoinColumn(name = "motel_id")
    private Motel motel;

    @Column(columnDefinition = "TEXT")
    private String namecontract;

    @Column(columnDefinition = "TEXT")
    private String templatename;

    @Column(columnDefinition = "INT")
    private int sortorder;

    @Column(columnDefinition = "TEXT") // Để lưu nội dung lớn
    private String content;
}
