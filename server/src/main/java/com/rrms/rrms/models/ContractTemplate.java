package com.rrms.rrms.models;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JsonBackReference(value = "motel-ContractTemplate") // Đặt tên cho tham chiếu ngược
    private Motel motel;

    @Column(columnDefinition = "TEXT")
    private String namecontract;

    @Column(columnDefinition = "TEXT")
    private String templatename;

    @Column(columnDefinition = "INT")
    private int sortorder;

    @Column(columnDefinition = "TEXT") // Để lưu nội dung lớn
    private String content;

    @OneToMany(mappedBy = "contract_template", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "ContractTemplate-Contract") // Đặt tên cho tham chiếu quản lý
    private List<Contract> contracts;
}
