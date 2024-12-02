package com.rrms.rrms.models;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.rrms.rrms.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "tenant")
public class Tenant {
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID tenantId;

    @Column(columnDefinition = "VARCHAR(255)")
    private String avata;

    @Column(columnDefinition = "VARCHAR(255)", nullable = false)
    private String fullname;

    @Column(columnDefinition = "VARCHAR(12)")
    private String phone;

    @Column(name = "CCCD", columnDefinition = "VARCHAR(20)", unique = true)
    private String cccd;

    @Column(columnDefinition = "VARCHAR(255)")
    private String email;

    @Column(columnDefinition = "DATE")
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('MALE', 'FEMALE','OTHER')")
    private Gender gender;

    @Column(columnDefinition = "VARCHAR(255)")
    private String address;

    @Column(columnDefinition = "VARCHAR(255)")
    private String job;

    @Column(name = "license_date", columnDefinition = "DATE")
    private LocalDate licenseDate;

    @Column(name = "place_of_license", columnDefinition = "VARCHAR(255)")
    private String placeOfLicense;

    @Column(name = "front_photo", columnDefinition = "VARCHAR(255)")
    private String frontPhoto;

    @Column(name = "back_photo", columnDefinition = "VARCHAR(255)")
    private String backPhoto;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean role;

    @Column(name = "relationship", columnDefinition = "VARCHAR(255)")
    private String relationship;

    @Column(name = "type_of_tenant", columnDefinition = "BOOLEAN")
    private Boolean type_of_tenant;

    @Column(name = "temporary_residence", columnDefinition = "BOOLEAN")
    private Boolean temporaryResidence;

    @Column(name = "information_verify", columnDefinition = "BOOLEAN")
    private Boolean informationVerify;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roomId")
    @JsonBackReference(value = "Room-Tenant") // Đặt tên cho tham chiếu ngược
    private Room room;

    @OneToMany(mappedBy = "tenant", orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "Tenant-Contract") // Đặt tên cho tham chiếu quản lý
    private List<Contract> contracts; // Một người thuê có nhiều hợp đồng
}
