package com.rrms.rrms.database;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;

import lombok.extern.slf4j.Slf4j;

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
                // create admin account

                Motel motel = new Motel();
                System.out.println("--------------day la id truoc khi tao -------------: " + motel.getMotelId());
                motel.setAccount(accountRepository.findByUsername("admin").get());
                motel.setMotelName("Hà nội");
                motelRepository.save(motel);
                TypeRoom typeRoom = new TypeRoom();
                typeRoom.setName("Tình yêu");
                typeRoomRepository.save(typeRoom);

                Room room = null;
                for (int i = 0; i < roomsLength; i++) {
                    Faker faker = new Faker(new Locale("vi"));
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
                    roomRepository.save(room);
                    log.info("Search room created");
                }

                RoomReview roomReview = new RoomReview();
                roomReview.setAccount(accountRepository.findByUsername("admin").get());
                roomReview.setComment("Phòng này đẹp ghê");
                roomReview.setRating(3);
                roomReview.setRoom(room);
                roomReviewRepository.save(roomReview);
                log.info("Room review created");

                Service service = new Service();
                service.setNameService("Có chuồng chó");
                service.setTypeService("Dịch vụ");
                serviceRepository.save(service);
                log.info("Service created");

                RoomService roomService = new RoomService();
                roomService.setRoom(room);
                roomService.setService(service);
                roomServiceRepository.save(roomService);
                log.info("Room service created");

                RoomImage roomImage1 =
                        new RoomImage(UUID.randomUUID(), room, "https://picsum.photos/1000/700?random=1");
                RoomImage roomImage2 =
                        new RoomImage(UUID.randomUUID(), room, "https://picsum.photos/1000/700?random=2");
                RoomImage roomImage3 =
                        new RoomImage(UUID.randomUUID(), room, "https://picsum.photos/1000/700?random=3");
                RoomImage roomImage4 =
                        new RoomImage(UUID.randomUUID(), room, "https://picsum.photos/1000/700?random=4");
                RoomImage roomImage5 =
                        new RoomImage(UUID.randomUUID(), room, "https://picsum.photos/1000/700?random=5");
                roomImageRepository.saveAll(List.of(roomImage1, roomImage2, roomImage3, roomImage4, roomImage5));
                log.info("Room image created");
            }
        };
    }
}
