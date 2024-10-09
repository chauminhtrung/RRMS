//package com.rrms.rrms.models;
//
//import java.util.UUID;
//
//import jakarta.persistence.*;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "hearts")
//@Builder
//public class Heart {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private Account account; // Giả sử bạn đã có mô hình User
//
//    @ManyToOne
//    @JoinColumn(name = "room_id", nullable = false)
//    private Room room;
//
//    @Column(nullable = false)
//    private Integer count; // Số lần yêu thích
//}
