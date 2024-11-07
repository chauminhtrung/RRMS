package com.rrms.rrms.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
    @Column(columnDefinition = "VARCHAR(255)", nullable = false)
    private String fullname;

    @Column(columnDefinition = "VARCHAR(12)")
    private String phone;

    @Column(columnDefinition = "VARCHAR(20)", unique = true)
    private String CCCD;

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

    @Column(columnDefinition = "DATE")
    private LocalDate License_date;

    @Column(columnDefinition = "VARCHAR(255)")
    private String Place_of_license;

    @Column(columnDefinition = "VARCHAR(255)")
    private String front_photo;

    @Column(columnDefinition = "VARCHAR(255)")
    private String back_photo;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean role;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean temporary_residence;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean information_verify;
}
