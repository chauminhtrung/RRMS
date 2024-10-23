package com.rrms.rrms.database;

import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.ISearchService;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Configuration
@Slf4j
@Transactional
public class DB {
    int imageIndex = 0;

    @Bean
    CommandLineRunner initDatabase(
            AccountRepository accountRepository,
            AuthRepository authRepository,
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
            int roomsLength = 20;

            BCryptPasswordEncoder pe = new BCryptPasswordEncoder();

            // Tạo dữ liệu mẫu cho các vai trò
            createSampleRoles(roleRepository);

            // Tạo tài khoản admin nếu chưa tồn tại
            createAdminAccount(accountRepository, pe,roleRepository,authRepository);
            createEmployAccount(accountRepository, pe,roleRepository,authRepository);
            createCustomerAccount(accountRepository, pe,roleRepository,authRepository);
            createHostAccount(accountRepository, pe,roleRepository,authRepository);

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

    private void createAdminAccount(AccountRepository accountRepository, BCryptPasswordEncoder pe, RoleRepository roleRepository, AuthRepository authRepository) {
        if (accountRepository.findByUsername("admin").isEmpty()) {
            // Create admin account
            Account adminAccount = Account.builder()
                .username("admin")
                .password(pe.encode("123"))
                .fullname("Administrator")
                .email("admin@example.com")
                .phone("0123456789")
                .cccd("012345678901")
                .gender(Gender.MALE)
                .avatar("AVT_ADMIN.jpg")
                .birthday(LocalDate.now())
                .build();

            accountRepository.save(adminAccount);

            // Fetch the admin role by name
            Optional<Role> adminRoleOpt = roleRepository.findByRoleName(Roles.ADMIN);
            if (adminRoleOpt.isPresent()) {
                Role adminRole = adminRoleOpt.get();

                // Create the auth entry for the admin account
                Auth adminAuth = new Auth();
                adminAuth.setAccount(adminAccount);
                adminAuth.setRole(adminRole);
                authRepository.save(adminAuth);
            }
        }
    }

    private void createEmployAccount(AccountRepository accountRepository, BCryptPasswordEncoder pe, RoleRepository roleRepository, AuthRepository authRepository) {
        if (accountRepository.findByUsername("employee").isEmpty()) {
            // Create user account
            Account userAccount = Account.builder()
                .username("employee")
                .password(pe.encode("123")) // Encode the password
                .fullname("Minh Trung")
                .email("minhtrung@gmail.com")
                .phone("03333345553")
                .cccd("012345678900")
                .gender(Gender.FEMALE)
                .avatar("https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
                .birthday(LocalDate.now())
                .build();

            accountRepository.save(userAccount);

            // Fetch the customer role by name
            Optional<Role> customerRoleOpt = roleRepository.findByRoleName(Roles.CUSTOMER);
            if (customerRoleOpt.isPresent()) {
                Role customerRole = customerRoleOpt.get();

                // Create the auth entry for the user account
                Auth userAuth = new Auth();
                userAuth.setAccount(userAccount);
                userAuth.setRole(customerRole);
                authRepository.save(userAuth);
            }
        }
    }
    private void createHostAccount(AccountRepository accountRepository, BCryptPasswordEncoder pe, RoleRepository roleRepository, AuthRepository authRepository) {
        if (accountRepository.findByUsername("host").isEmpty()) {
            // Create user account
            Account userAccount = Account.builder()
                .username("host")
                .password(pe.encode("123")) // Encode the password
                .fullname("KienQuoc")
                .email("quoc@gmail.com")
                .phone("0919925302")
                .cccd("012345678900")
                .gender(Gender.FEMALE)
                .avatar("https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
                .birthday(LocalDate.now())
                .build();

            accountRepository.save(userAccount);

            // Fetch the customer role by name
            Optional<Role> customerRoleOpt = roleRepository.findByRoleName(Roles.HOST);
            if (customerRoleOpt.isPresent()) {
                Role customerRole = customerRoleOpt.get();

                // Create the auth entry for the user account
                Auth userAuth = new Auth();
                userAuth.setAccount(userAccount);
                userAuth.setRole(customerRole);
                authRepository.save(userAuth);
            }
        }
    }
    private void createCustomerAccount(AccountRepository accountRepository, BCryptPasswordEncoder pe, RoleRepository roleRepository, AuthRepository authRepository) {
        if (accountRepository.findByUsername("customer").isEmpty()) {
            // Create user account
            Account userAccount = Account.builder()
                .username("customer")
                .password(pe.encode("123"))
                .fullname("Thuan")
                .email("thuan@gmail.com")
                .phone("0829280927")
                .cccd("012345678900")
                .gender(Gender.FEMALE)
                .avatar("https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
                .birthday(LocalDate.now())
                .build();

            accountRepository.save(userAccount);

            // Fetch the customer role by name
            Optional<Role> customerRoleOpt = roleRepository.findByRoleName(Roles.CUSTOMER);
            if (customerRoleOpt.isPresent()) {
                Role customerRole = customerRoleOpt.get();

                // Create the auth entry for the user account
                Auth userAuth = new Auth();
                userAuth.setAccount(userAccount);
                userAuth.setRole(customerRole);
                authRepository.save(userAuth);
            }
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
            imageIndex++;
            String imageUrl = "https://picsum.photos/1280/720?random=" + imageIndex;
            roomImages.add(new RoomImage(UUID.randomUUID(), room, imageUrl));
        }
    }
}
