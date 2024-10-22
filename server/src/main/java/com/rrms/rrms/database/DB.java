package com.rrms.rrms.database;

import com.rrms.rrms.enums.Roles;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.ISearchService;

import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;

@Configuration
@Slf4j
@Transactional
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
            RoomServiceRepository roomServiceRepository,
            ISearchService searchService,
            RoleRepository roleRepository) {
        return args -> {
            int roomsLength = 5;
            BCryptPasswordEncoder pe = new BCryptPasswordEncoder();

            // Tạo dữ liệu mẫu cho các vai trò
            createSampleRoles(roleRepository);

            // Tạo tài khoản admin nếu chưa tồn tại
            createAdminAccount(accountRepository, pe);
            createUserAccount(accountRepository, pe);

            if (roomRepository.findAll().isEmpty()) {
                log.info("Starting to create data...");
                TypeRoom typeRoom = new TypeRoom();
                typeRoom.setName("Trọ");
                typeRoomRepository.save(typeRoom);

                // Khởi tạo Faker một lần
                Faker faker = new Faker(new Locale("vi"));
                List<Motel> motels = new ArrayList<>();
                List<Room> rooms = new ArrayList<>();
                List<RoomService> roomServices = new ArrayList<>();
                List<RoomImage> roomImages = new ArrayList<>();

                for (int i = 0; i < roomsLength; i++) {
                    log.info("Creating data: {}/{}", i + 1, roomsLength);
                    // Tạo và lưu motel
                    Motel motel = createMotel(faker, accountRepository);
                    motels.add(motel);

                    // Tạo và lưu phòng
                    Room room = createRoom(faker, roomRepository, motel, typeRoom);
                    rooms.add(room);

                    // Tạo và lưu dịch vụ
                    createServices(faker, roomServices, room, serviceRepository);

                    // Tạo hình ảnh cho phòng
                    createRoomImages(faker, roomImages, room);
                }

                // Lưu tất cả motels, rooms, roomServices và roomImages trong một lần
                motelRepository.saveAll(motels);
                roomRepository.saveAll(rooms);
                roomServiceRepository.saveAll(roomServices);
                roomImageRepository.saveAll(roomImages);
            }

            log.info("All data created");
            log.info(searchService.syncRoom(roomRepository.findAll()));
        };
    }

    // Phương thức để tạo dữ liệu mẫu cho roles
    private void createSampleRoles(RoleRepository roleRepository) {
        if (roleRepository.count() == 0) { // Kiểm tra nếu chưa có vai trò nào trong cơ sở dữ liệu
            log.info("Creating sample roles...");
            Role adminRole = new Role();
            adminRole.setRoleName(Roles.ADMIN);
            adminRole.setDescription("Administrator with full access.");
            roleRepository.save(adminRole);

            Role customerRole = new Role();
            customerRole.setRoleName(Roles.CUSTOMER);
            customerRole.setDescription("Regular customer role.");
            roleRepository.save(customerRole);

            Role employeeRole = new Role();
            employeeRole.setRoleName(Roles.EMPLOYEE);
            employeeRole.setDescription("Employee role with limited access.");
            roleRepository.save(employeeRole);

            Role guestRole = new Role();
            guestRole.setRoleName(Roles.GUEST);
            guestRole.setDescription("Guest user without account.");
            roleRepository.save(guestRole);

            Role hostRole = new Role();
            hostRole.setRoleName(Roles.HOST);
            hostRole.setDescription("Host for organizing events.");
            roleRepository.save(hostRole);

            log.info("Sample roles created.");
        }
    }

    private void createAdminAccount(AccountRepository accountRepository, BCryptPasswordEncoder pe) {
        if (accountRepository.findByUsername("admin").isEmpty()) {
            accountRepository.save(Account.builder()
                    .username("admin")
                    .password(pe.encode("adminPassword"))
                    .fullname("Administrator")
                    .email("admin@example.com")
                    .phone("0123456789")
                    .cccd("012345678901")
                    .gender(Gender.MALE)
                    .avatar("AVT_ADMIN.jpg")
                    .birthday(LocalDate.now())
                    .build());
        }
    }

    private void createUserAccount(AccountRepository accountRepository, BCryptPasswordEncoder pe) {
        if (accountRepository.findByUsername("user5").isEmpty()) {
            accountRepository.save(Account.builder()
                    .username("user5")
                    .password(pe.encode("user5")) // Mã hóa mật khẩu
                    .fullname("Minh Trung")
                    .email("minhtrung@gmail.com")
                    .phone("03333345553")
                    .cccd("012345678900")
                    .gender(Gender.OTHER)
                    .avatar("https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
                    .birthday(LocalDate.now())
                    .build());
        }
    }

    private Motel createMotel(Faker faker, AccountRepository accountRepository) {
        Motel motel = new Motel();
        motel.setAccount(accountRepository.findByUsername("admin").get());
        motel.setMotelName(faker.address().cityName());
        motel.setAddress(faker.address().fullAddress());
        motel.setArea((double) faker.number().numberBetween(50, 200));
        motel.setAveragePrice((long) faker.number().numberBetween(500000, 5000000));
        return motel;
    }

    private Room createRoom(Faker faker, RoomRepository roomRepository, Motel motel, TypeRoom typeRoom) {
        Room room = new Room();
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
        return room;
    }

    private void createServices(Faker faker, List<RoomService> roomServices, Room room, ServiceRepository serviceRepository) {
        Service service1 = Service.builder()
                .typeService("Tiện nghi")
                .nameService(faker.options().option("Có chuồng chó", "Wifi miễn phí", "Hồ bơi", "Gym"))
                .build();

        Service service2 = Service.builder()
                .typeService("Điện nước")
                .nameService("Điện")
                .price((long) faker.number().randomDouble(2, 50000, 100000))
                .build();

        Service service3 = Service.builder()
                .typeService("Điện nước")
                .nameService("Nước")
                .price((long) faker.number().randomDouble(2, 50000, 100000))
                .build();

        serviceRepository.saveAll(List.of(service1, service2, service3));

        roomServices.add(RoomService.builder().room(room).service(service1).build());
        roomServices.add(RoomService.builder().room(room).service(service2).build());
        roomServices.add(RoomService.builder().room(room).service(service3).build());
    }

    private void createRoomImages(Faker faker, List<RoomImage> roomImages, Room room) {
        for (int j = 0; j < 5; j++) {
            roomImages.add(new RoomImage(UUID.randomUUID(), room, faker.internet().image()));
        }
    }
}