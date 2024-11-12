package com.rrms.rrms.models;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.*;

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

    @Column(name = "relationship",columnDefinition = "VARCHAR(255)")
    private String relationship;

    @Column(name = "Type_of_tenant", columnDefinition = "VARCHAR(255)")
    private String  type_of_tenant;


    @Column(name = "temporary_residence", columnDefinition = "BOOLEAN")
    private Boolean temporaryResidence;

    @Column(name = "information_verify", columnDefinition = "BOOLEAN")
    private Boolean informationVerify;
}
