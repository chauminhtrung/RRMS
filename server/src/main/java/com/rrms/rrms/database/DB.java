package com.rrms.rrms.database;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;

import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;

@Configuration
@Slf4j
public class DB {
    @Bean
    CommandLineRunner initDatabase(
            AccountRepository accountRepository,
            RoomRepository roomRepository,
            MotelRepository motelRepository,
            TypeRoomRepository typeRoomRepository,
            RoomImageRepository roomImageRepository,
            RoomReviewRepository roomReviewRepository,
            ServiceRepository serviceRepository,
            RoomServiceRepository roomServiceRepository) {
        return args -> {
            int roomsLength = 20;

            if (accountRepository.findByUsername("admin").isEmpty()) {
                // create admin account
                accountRepository.save(Account.builder()
                        .username("admin")
                        .password("admin")
                        .fullname("admin")
                        .email("admin@gmail.com")
                        .phone("0333333333")
                        .cccd("admin")
                        .gender(Gender.MALE)
                        .avatar(
                                "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
                        .birthday(LocalDate.now())
                        .build());
                log.info("Admin user created");
            }
            if (accountRepository.findByUsername("user5").isEmpty()) {
                // create admin account
                accountRepository.save(Account.builder()
                        .username("user5")
                        .password("user5")
                        .fullname("Minh Trung")
                        .email("minhtrung@gmail.com")
                        .phone("03333345553")
                        .cccd("012345678900")
                        .gender(Gender.OTHER)
                        .avatar(
                                "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
                        .birthday(LocalDate.now())
                        .build());
                log.info("User1 created");
            }
            if (roomRepository.findAll().isEmpty()) {
                String[] typeRoomNames = {
                        "Phòng đơn",
                        "Phòng đôi",
                        "Phòng gia đình",
                        "Phòng tập thể",
                        "Phòng VIP",
                        "Phòng Superior",
                        "Phòng Deluxe",
                        "Phòng Suite"
                };

                Motel motel;
                TypeRoom typeRoom;
                Room room = null;

                for (int i = 0; i < roomsLength; i++) {
                    Faker faker = new Faker(new Locale("vi"));

                    // Create and populate Motel entity
                    motel = new Motel();
                    motel.setAccount(accountRepository.findByUsername("admin").get());
                    motel.setMotelName(faker.address().cityName());
                    motel.setAddress(faker.address().fullAddress());
                    motel.setArea((double) faker.number().numberBetween(50, 200));
                    motel.setAveragePrice((long) faker.number().numberBetween(500000, 5000000));

                    // Create and populate TypeRoom entity with realistic names
                    typeRoom = new TypeRoom();
                    typeRoom.setName(faker.options().option(typeRoomNames)); // Select a realistic name

                    // Create and populate Room entity
                    room = new Room();
                    room.setDeposit(faker.number().randomDouble(2, 500000, 5000000));
                    room.setHours(faker.options().option("Tự do", "6:00 AM - 12:00 PM", "1:00 PM - 6:00 PM"));
                    room.setRentalStartTime(LocalDate.now());
                    room.setMotel(motel);
                    room.setTypeRoom(typeRoom);
                    room.setNameRoom(faker.address().city());
                    room.setDescription(faker.lorem().paragraph());
                    room.setAvailable(faker.bool().bool());
                    room.setRoomArea(faker.number().numberBetween(50, 200));
                    room.setPrice(faker.number().randomDouble(2, 500000, 5000000));
                    room.setMaxPerson(faker.number().numberBetween(1, 5));

                    // Save motel, typeRoom, and room
                    typeRoomRepository.save(typeRoom);
                    motelRepository.save(motel);
                    roomRepository.save(room);
                    log.info("Room created");

                    // Tạo RoomReview
                    RoomReview roomReview = new RoomReview();
                    roomReview.setAccount(accountRepository.findByUsername("admin").get());
                    roomReview.setComment(faker.lorem().sentence());
                    roomReview.setRating(faker.number().numberBetween(1, 5));
                    roomReview.setRoom(room);
                    roomReviewRepository.save(roomReview);
                    log.info("Room review created");

                    // Tạo Service
                    Service service1 = serviceRepository.save(Service.builder()
                            .typeService("Dịch vụ")
                            .nameService(faker.options().option("Có chuồng chó", "Wifi miễn phí", "Hồ bơi", "Gym"))
                            .build());
                    Service service2 = serviceRepository.save(Service.builder()
                            .typeService("Điện nước")
                            .nameService(faker.options().option("Điện"))
                            .price((long) faker.number().randomDouble(2, 50000, 100000))
                            .build());
                    Service service3 = serviceRepository.save(Service.builder()
                            .typeService("Điện nước")
                            .nameService(faker.options().option("Nước"))
                            .price((long) faker.number().randomDouble(2, 50000, 100000))
                            .build());
                    log.info("Service created");

                    // Tạo RoomService
                    roomServiceRepository.save(RoomService.builder()
                                    .room(room)
                                    .service(service1)
                            .build());
                    roomServiceRepository.save(RoomService.builder()
                            .room(room)
                            .service(service2)
                            .build());
                    roomServiceRepository.save(RoomService.builder()
                            .room(room)
                            .service(service3)
                            .build());
                    log.info("Room service created");

                    // Tạo các RoomImage
                    RoomImage roomImage1 = new RoomImage(UUID.randomUUID(), room, faker.internet().image());
                    RoomImage roomImage2 = new RoomImage(UUID.randomUUID(), room, faker.internet().image());
                    RoomImage roomImage3 = new RoomImage(UUID.randomUUID(), room, faker.internet().image());
                    RoomImage roomImage4 = new RoomImage(UUID.randomUUID(), room, faker.internet().image());
                    RoomImage roomImage5 = new RoomImage(UUID.randomUUID(), room, faker.internet().image());

                    // Lưu tất cả ảnh phòng
                    roomImageRepository.saveAll(List.of(roomImage1, roomImage2, roomImage3, roomImage4, roomImage5));
                    log.info("Room images created");
                }

            }
        };
    }
}
