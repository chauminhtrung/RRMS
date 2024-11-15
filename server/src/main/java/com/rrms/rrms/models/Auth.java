package com.rrms.rrms.models;

import java.util.UUID;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "auths")
public class Auth {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID authId;

    @ManyToOne
    @JoinColumn(name = "username")
    @JsonBackReference(value = "Auth-Acc") // Đặt tên cho tham chiếu ngược
    private Account account;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
