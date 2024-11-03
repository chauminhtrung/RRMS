package com.rrms.rrms.database;

import java.time.LocalDate;
import java.util.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.rrms.rrms.enums.Gender;
import com.rrms.rrms.enums.Roles;
import com.rrms.rrms.models.*;
import com.rrms.rrms.repositories.*;
import com.rrms.rrms.services.ISearchService;

import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;

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
            RoleRepository roleRepository,
            PermissionRepository permissionRepository) {
        return args -> {
            int roomsLength = 100;

            BCryptPasswordEncoder pe = new BCryptPasswordEncoder();

            // Tạo dữ liệu mẫu cho các vai trò
            createSampleRolesAndPermissions(roleRepository, permissionRepository);
            // Tạo tài khoản admin nếu chưa tồn tại
            createAdminAccount(accountRepository, pe, roleRepository, authRepository);
            createEmployAccount(accountRepository, pe, roleRepository, authRepository);
            createCustomerAccount(accountRepository, pe, roleRepository, authRepository);
            createHostAccount(accountRepository, pe, roleRepository, authRepository);

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
    private void createSampleRolesAndPermissions(
            RoleRepository roleRepository, PermissionRepository permissionRepository) {
        if (roleRepository.count() == 0) {
            log.info("Creating sample roles and permissions...");
            // Define ADMIN permissions
            Set<Permission> adminPermissions = new HashSet<>();
            adminPermissions.add(createPermission("CREATE_HOST_ACCOUNT", "Create host accounts", permissionRepository));
            adminPermissions.add(createPermission("UPDATE_HOST_ACCOUNT", "Update host accounts", permissionRepository));
            adminPermissions.add(createPermission("DELETE_HOST_ACCOUNT", "Delete host accounts", permissionRepository));
            adminPermissions.add(createPermission("SEARCH_HOST_ACCOUNT", "Search host accounts", permissionRepository));
            adminPermissions.add(createPermission("APPROVED_POST", "Approve posts", permissionRepository));
            // Define HOST permissions
            Set<Permission> hostPermissions = new HashSet<>();
            hostPermissions.add(
                    createPermission("CREATE_EMPLOYEE_ACCOUNT", "Create employee accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("UPDATE_EMPLOYEE_ACCOUNT", "Update employee accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("DELETE_EMPLOYEE_ACCOUNT", "Delete employee accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("SEARCH_EMPLOYEE_ACCOUNT", "Search employee accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("CREATE_CUSTOMER_ACCOUNT", "Create customer accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("UPDATE_CUSTOMER_ACCOUNT", "Update customer accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("DELETE_CUSTOMER_ACCOUNT", "Delete customer accounts", permissionRepository));
            hostPermissions.add(
                    createPermission("SEARCH_CUSTOMER_ACCOUNT", "Search customer accounts", permissionRepository));
            hostPermissions.add(createPermission("CREATE_POST", "Create posts", permissionRepository));
            hostPermissions.add(createPermission("CREATE_MOTEL", "Create motels", permissionRepository));
            hostPermissions.add(createPermission("UPDATE_MOTEL", "Update motels", permissionRepository));
            hostPermissions.add(createPermission("DELETE_MOTEL", "Delete motels", permissionRepository));
            hostPermissions.add(createPermission("CREATE_ROOM", "Create rooms", permissionRepository));
            hostPermissions.add(createPermission("UPDATE_ROOM", "Update rooms", permissionRepository));
            hostPermissions.add(createPermission("DELETE_ROOM", "Delete rooms", permissionRepository));
            hostPermissions.add(createPermission("CREATE_CONTRACT", "Create contracts", permissionRepository));
            hostPermissions.add(createPermission("UPDATE_CONTRACT", "Update contracts", permissionRepository));
            hostPermissions.add(createPermission("DELETE_CONTRACT", "Delete contracts", permissionRepository));
            // Define EMPLOYEE permissions
            Set<Permission> employeePermissions = new HashSet<>();
            employeePermissions.add(
                    createPermission("UPDATE_EMPLOYEE_ACCOUNT", "Update employee accounts", permissionRepository));
            employeePermissions.add(
                    createPermission("UPDATE_CUSTOMER_ACCOUNT", "Update customer accounts", permissionRepository));
            employeePermissions.add(
                    createPermission("SEARCH_CUSTOMER_ACCOUNT", "Search customer accounts", permissionRepository));
            employeePermissions.add(createPermission("UPDATE_MOTEL", "Update motels", permissionRepository));
            employeePermissions.add(createPermission("UPDATE_ROOM", "Update rooms", permissionRepository));
            Set<Permission> customerPermissions = new HashSet<>();
            customerPermissions.add(
                    createPermission("VIEW_SEARCH_MOTEL", "View and search motels", permissionRepository));
            customerPermissions.add(
                    createPermission("VIEW_SEARCH_ROOM", "View and search rooms", permissionRepository));
            customerPermissions.add(
                    createPermission("UPDATE_ACCOUNT", "Update account information", permissionRepository));
            customerPermissions.add(createPermission("VIEW_CONTRACT", "View contracts", permissionRepository));
            customerPermissions.add(createPermission("SUPPORT", "Support requests", permissionRepository));
            customerPermissions.add(createPermission("PAYMENT", "Handle payments", permissionRepository));
            // Define GUEST permissions
            Set<Permission> guestPermissions = new HashSet<>();
            guestPermissions.add(createPermission("VIEW_SEARCH_MOTEL", "View and search motels", permissionRepository));
            guestPermissions.add(createPermission("VIEW_SEARCH_ROOM", "View and search rooms", permissionRepository));
            guestPermissions.add(createPermission("CREATE_ACCOUNT", "Create a user account", permissionRepository));
            // Create roles and assign permissions
            createRoleWithPermissions(roleRepository, "ADMIN", "Administrator with full access.", adminPermissions);
            createRoleWithPermissions(roleRepository, "HOST", "Host for organizing events.", hostPermissions);
            createRoleWithPermissions(
                    roleRepository, "EMPLOYEE", "Employee role with limited access.", employeePermissions);
            createRoleWithPermissions(roleRepository, "CUSTOMER", "Regular customer role.", customerPermissions);
            createRoleWithPermissions(roleRepository, "GUEST", "Guest user without account.", guestPermissions);
            log.info("Sample roles and permissions created.");
        }
    }

    private Permission createPermission(String name, String description, PermissionRepository permissionRepository) {
        Permission permission = new Permission();
        permission.setName(name);
        permission.setDescription(description);
        return permissionRepository.save(permission);
    }

    private void createRoleWithPermissions(
            RoleRepository roleRepository, String roleName, String description, Set<Permission> permissions) {
        Role role = new Role();
        role.setRoleName(Roles.valueOf(roleName));
        role.setDescription(description);
        role.setPermissions(permissions);
        roleRepository.save(role);
    }

    private void createAdminAccount(
            AccountRepository accountRepository,
            BCryptPasswordEncoder pe,
            RoleRepository roleRepository,
            AuthRepository authRepository) {
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

    private void createEmployAccount(
            AccountRepository accountRepository,
            BCryptPasswordEncoder pe,
            RoleRepository roleRepository,
            AuthRepository authRepository) {
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
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
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

    private void createHostAccount(
            AccountRepository accountRepository,
            BCryptPasswordEncoder pe,
            RoleRepository roleRepository,
            AuthRepository authRepository) {
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
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
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

    private void createCustomerAccount(
            AccountRepository accountRepository,
            BCryptPasswordEncoder pe,
            RoleRepository roleRepository,
            AuthRepository authRepository) {
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
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2F1493af7e-ba1f-48d8-b2c8-f4e88b55e07f?alt=media&token=9e82b5f9-3f49-4856-b009-bfd09fa474c9")
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
        Date randomDate = faker.date()
                .between(
                        new Date(System.currentTimeMillis() - 30L * 24 * 60 * 60 * 1000), // 30 ngày trước
                        new Date() // Ngày hiện tại
                        );
        room.setDeposit(faker.number().randomDouble(2, 500000, 5000000));
        room.setHours(faker.options().option("Tự do", "6:00 AM - 12:00 PM", "1:00 PM - 6:00 PM"));
        room.setRentalStartTime(LocalDate.now());
        room.setMotel(motel);
        room.setAuthen(faker.options().option(true, false));
        room.setDatenew(randomDate);
        room.setTypeRoom(typeRoom);
        room.setNameRoom(faker.address().city());
        room.setDescription(faker.lorem().paragraph());
        room.setAvailable(faker.bool().bool());
        room.setRoomArea(faker.number().numberBetween(50, 200));
        room.setPrice(faker.number().randomDouble(2, 500000, 5000000));
        room.setMaxPerson(faker.number().numberBetween(1, 5));
        return room;
    }

    private void createServices(
            Faker faker, List<RoomService> roomServices, Room room, ServiceRepository serviceRepository) {
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
