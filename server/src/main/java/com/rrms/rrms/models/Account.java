package com.rrms.rrms.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "accounts")
public class Account {

    @Id
    @Column(columnDefinition = "VARCHAR(255)", nullable = false)
    private String username;

    @Column(columnDefinition = "VARCHAR(255)")
    private String password;

    @Column(columnDefinition = "VARCHAR(255)")
    private String fullname;

    @Column(columnDefinition = "VARCHAR(20)", unique = true)
    private String phone;

    @Column(columnDefinition = "VARCHAR(255)", unique = true) // unique = true để trường này là duy nhất
    private String email;

    @Column(columnDefinition = "VARCHAR(255)")
    private String avatar;

    @Column(columnDefinition = "DATE")
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('MALE', 'FEMALE','OTHER')")
    private Gender gender;

    @Column(columnDefinition = "VARCHAR(15)")
    private String cccd;

    @Column(columnDefinition = "INT")
    private Integer commissionRate;

    @OneToMany(mappedBy = "account", fetch = FetchType.EAGER)
    @JsonManagedReference(value = "Auth-Acc") // Đặt tên cho tham chiếu quản lý
    List<Auth> authorities;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "heart_id")
    private Heart heart;

    // Thêm trường ngày tạo
    @Column(name = "created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdDate = LocalDateTime.now();

    public List<String> getRoles() {
        return authorities.stream()
                .map(auth -> auth.getRole().getRoleName().name())
                .collect(Collectors.toList());
    }

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "Account-Contract") // Đặt tên cho tham chiếu quản lý
    private List<Contract> contracts;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "account-motel") // Đặt tên cho tham chiếu quản lý
    private List<Motel> motels;


}
