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
import com.rrms.rrms.services.IBulletinBoard;

import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;

@Configuration
@Slf4j
@Transactional
public class DB {
    private final BulletinBoardRuleRepository bulletinBoardRuleRepository;

    private final PaymentRepository paymentsRepository;

    public DB(BulletinBoardRuleRepository bulletinBoardRuleRepository, PaymentRepository paymentRepository) {
        this.bulletinBoardRuleRepository = bulletinBoardRuleRepository;
        this.paymentsRepository = paymentRepository;
    }

    int imageIndex = 0;

    @Bean
    CommandLineRunner initDatabase(
            AccountRepository accountRepository,
            AuthRepository authRepository,
            RoomRepository roomRepository,
            MotelRepository motelRepository,
            TypeRoomRepository typeRoomRepository,
            RoomImageRepository roomImageRepository,
            ServiceRepository serviceRepository,
            RoomServiceRepository roomServiceRepository,
            IBulletinBoard bulletinBoardService,
            RoleRepository roleRepository,
            PermissionRepository permissionRepository,
            NameMotelServiceRepository nameMotelServiceRepository,
            BulletinBoardRepository bulletinBoardRepository,
            RuleRepository ruleRepository,
            RentalAmenitiesRepository rentalAmenitiesRepository,
            BulletinBoardReviewsRepository bulletinBoardReviewsRepository,
            BulletinBoardImageRepository bulletinBoardImageRepository,
            BulletinBoards_RentalAmRepository bulletinBoards_rentalAmRepository,
            ContractTemplateRepository contractTemplateRepository,
            TenantRepository tenantRepository) {
        return args -> {
            int roomsLength = 50;
            int bulletinBoardsLength = 50;
            log.info("Starting to create data... length: {}", roomsLength);

            BCryptPasswordEncoder pe = new BCryptPasswordEncoder();

            // Tạo dữ liệu mẫu cho các vai trò
            createSampleRolesAndPermissions(roleRepository, permissionRepository);
            // Tạo tài khoản admin nếu chưa tồn tại
            createAdminAccount(accountRepository, pe, roleRepository, authRepository);
            createEmployAccount(accountRepository, pe, roleRepository, authRepository);
            createCustomerAccount(accountRepository, pe, roleRepository, authRepository);
            createHostAccount(accountRepository, pe, roleRepository, authRepository);

            if (roomRepository.findAll().isEmpty()) {
                TypeRoom typeRoom = new TypeRoom();
                typeRoom.setName("Trọ");
                typeRoomRepository.save(typeRoom);

                // Khởi tạo Faker một lần
                Faker faker = new Faker(new Locale("vi"));
                List<Motel> motels = new ArrayList<>();
                List<Room> rooms = new ArrayList<>();
                List<RoomService> roomServices = new ArrayList<>();
                List<RoomImage> roomImages = new ArrayList<>();

                // Tạo và lưu dịch vụ
                createServices(faker, serviceRepository);

                createNameMotelService(nameMotelServiceRepository);

                for (int i = 0; i < roomsLength; i++) {
                    // Tạo và lưu motel
                    Motel motel = createMotel(faker, accountRepository, typeRoom);
                    motels.add(motel);

                    // Tạo và lưu phòng
                    Room room = createRoom(faker, roomRepository, motel);
                    rooms.add(room);

                    // Tạo và lưu dịch vụ Room
                    // createServicesRoom(faker, roomServices, room, serviceRepository);

                    // Tạo hình ảnh cho phòng
                    createRoomImages(faker, roomImages, room);
                }

                // Lưu tất cả motels, rooms, roomServices và roomImages trong một lần
                List<Motel> savedMotels = motelRepository.saveAll(motels);
                createTemplateContract(contractTemplateRepository, savedMotels);
                roomRepository.saveAll(rooms);
                roomServiceRepository.saveAll(roomServices);
                roomImageRepository.saveAll(roomImages);
            }

            if (bulletinBoardRepository.findAll().isEmpty()) {

                // Khởi tạo Faker một lần
                Faker faker = new Faker(new Locale("vi"));
                List<RentalAmenities> rentalAmenities = new ArrayList<>();
                List<BulletinBoard> bulletinBoards = new ArrayList<>();
                List<BulletinBoardImage> bulletinBoardImages = new ArrayList<>();
                List<BulletinBoardRule> bulletinBoardRule = new ArrayList<>();
                List<BulletinBoardReviews> bulletinBoardReviews = new ArrayList<>();

                createNameMotelService(nameMotelServiceRepository);

                BulletinBoard bulletinBoard = null;
                for (int i = 0; i < bulletinBoardsLength; i++) {

                    // Tạo và lưu BulletinBoard
                    bulletinBoard = createBulletinBoard(faker, accountRepository);
                    bulletinBoardRepository.save(bulletinBoard);

                    for (int j = 0; j < 5; j++) {
                        imageIndex++;
                        String imageUrl = "https://picsum.photos/1280/720?random=" + imageIndex;
                        BulletinBoardImage bulletinBoardImage = new BulletinBoardImage();
                        bulletinBoardImage.setBulletinBoard(bulletinBoard);
                        bulletinBoardImage.setImageLink(imageUrl);
                        bulletinBoardImages.add(bulletinBoardImage);
                    }
                    bulletinBoardRule(faker, bulletinBoardRule, ruleRepository, bulletinBoard);
                    createRentalAmenities(
                            faker, rentalAmenitiesRepository, bulletinBoard, bulletinBoards_rentalAmRepository);
                    bulletinBoardImageRepository.saveAll(bulletinBoardImages);
                }
                bulletinBoardReviews(
                        faker,
                        bulletinBoardReviews,
                        bulletinBoard,
                        accountRepository.findByUsername("admin").get(),
                        bulletinBoardReviewsRepository);
            }
            // Tạo dữ liệu mẫu cho thanh toán
            if (paymentsRepository.count() == 0) {
                // Tạo dữ liệu mẫu cho thanh toán
                createSamplePayments(new Faker(new Locale("vi")), paymentsRepository);
            }
            Tenant tenant = generateFakeTenant();
            tenantRepository.save(tenant);
            log.info("All data created");
        };
    }

    private void createSamplePayments(Faker faker, PaymentRepository paymentRepository) {
        List<Payment> payments = new ArrayList<>();

        // Tạo giao dịch thanh toán tiền mặt
        Payment cashPayment = new Payment();
        cashPayment.setPaymentName("Thanh toán tiền mặt");
        cashPayment.setDescription("Thanh toán bằng tiền mặt cho dịch vụ");
        cashPayment.setPaymentDate(LocalDate.now());
        payments.add(cashPayment);

        // Tạo giao dịch thanh toán chuyển khoản
        Payment transferPayment = new Payment();
        transferPayment.setPaymentName("Thanh toán chuyển khoản");
        transferPayment.setDescription("Thanh toán qua chuyển khoản ngân hàng");
        transferPayment.setPaymentDate(LocalDate.now());
        payments.add(transferPayment);

        // Lưu tất cả giao dịch vào cơ sở dữ liệu
        paymentRepository.saveAll(payments);
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
            customerPermissions.add(createPermission("REVIEWS", "Reviews bulletin board", permissionRepository));
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
                    .fullname("Dương Trí Dũng")
                    .email("dungdtps31407@fpt.edu.vn")
                    .phone("0123456789")
                    .cccd("012345678901")
                    .gender(Gender.MALE)
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2Fz5151390778103_9e97d57d023943d670d62148a0d5b7bd.jpg?alt=media&token=ff7703e2-7e90-48b7-b565-1c4993795b6d")
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
                    .fullname("Châu Minh Trung")
                    .email("trungcmps31761@fpt.edu.vn")
                    .phone("03333345553")
                    .cccd("012345678900")
                    .gender(Gender.FEMALE)
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2Fz6133716559940_7c9350d11192987a3023cbab04233243.jpg?alt=media&token=53e9681c-70fa-4786-a131-d6e5c5989b13")
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
                    .fullname("Kiều Kiến Quốc")
                    .email("quockkps31817@fpt.edu.vn")
                    .phone("0919925302")
                    .cccd("012345678900")
                    .gender(Gender.FEMALE)
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2Fz5257432427901_de429dc26db211ec1dec296bdb854176.jpg?alt=media&token=93e85ab2-1eab-4ad5-9a2d-5c82237f7554")
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
                    .fullname("Trần Quốc Thuận")
                    .email("thuantqps31471@fpt.edu.vn")
                    .phone("0829280927")
                    .cccd("012345678900")
                    .gender(Gender.FEMALE)
                    .avatar(
                            "https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Faccount-avatar%2Fz6133716570498_6c5d5fc93027da36707542b837c41f88.jpg?alt=media&token=f6f0290d-0197-4a97-91b4-13fad8bc7eea")
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

    private Motel createMotel(Faker faker, AccountRepository accountRepository, TypeRoom typeRoom) {

        Motel motel = new Motel();
        motel.setAccount(accountRepository.findByUsername("admin").get());
        motel.setMotelName(faker.address().cityName());
        motel.setAddress(faker.address().fullAddress());
        motel.setArea((double) faker.number().numberBetween(50, 200));
        motel.setAveragePrice((long) faker.number().numberBetween(500000, 5000000));
        motel.setMethodofcreation("thủ công");
        motel.setMaxperson((int) faker.number().numberBetween(1, 8));
        motel.setInvoicedate((int) faker.number().numberBetween(1, 31));
        motel.setPaymentdeadline((int) faker.number().numberBetween(1, 20));
        motel.setTypeRoom(typeRoom);
        return motel;
    }

    private void createTemplateContract(ContractTemplateRepository contractTemplateRepository, List<Motel> motels) {
        List<ContractTemplate> contractTemplates = new ArrayList<>();

        for (Motel motel : motels) {
            ContractTemplate contractTemplate = new ContractTemplate();
            contractTemplate.setMotel(motel); // Tham chiếu đến Motel đã lưu
            contractTemplate.setTemplatename("Mẫu mặc định");
            contractTemplate.setNamecontract("Mẫu mặc định");
            contractTemplate.setSortorder(1);
            contractTemplate.setContent("Mẫu mặc định");
            contractTemplates.add(contractTemplate);
        }

        // Lưu tất cả các ContractTemplate
        contractTemplateRepository.saveAll(contractTemplates);
    }

    private void createNameMotelService(NameMotelServiceRepository nameMotelServiceRepository) {
        NameMotelService NameMotelservice1 = new NameMotelService();
        NameMotelservice1.setTypeService("Điện");
        NameMotelservice1.setNameService("Tiền điện");

        NameMotelService NameMotelservice2 = new NameMotelService();
        NameMotelservice2.setTypeService("Nước");
        NameMotelservice2.setNameService("Tiền nước");

        NameMotelService NameMotelservice3 = new NameMotelService();
        NameMotelservice3.setTypeService("Rác");
        NameMotelservice3.setNameService("Tiền rác");

        NameMotelService NameMotelservice4 = new NameMotelService();
        NameMotelservice4.setTypeService("Wifi/Internet");
        NameMotelservice4.setNameService("Tiền wifi");

        nameMotelServiceRepository.saveAll(
                List.of(NameMotelservice1, NameMotelservice2, NameMotelservice3, NameMotelservice4));
    }

    private Room createRoom(Faker faker, RoomRepository roomRepository, Motel motel) {
        Room room = new Room();
        Date randomDate = faker.date()
                .between(
                        new Date(System.currentTimeMillis() - 30L * 24 * 60 * 60 * 1000), // 30
                        // ngày
                        // trước
                        new Date() // Ngày hiện tại
                        );
        room.setDeposit(faker.number().randomDouble(2, 500000, 5000000));
        room.setMotel(motel);
        room.setPrice(faker.number().randomDouble(2, 500000, 5000000));
        return room;
    }

    //    private void createServicesRoom(
    //            Faker faker, List<RoomService> roomServices, Room room, ServiceRepository serviceRepository) {
    //
    //        List<Service> ListService = serviceRepository.findAll();
    //
    //        roomServices.add(RoomService.builder()
    //                .room(room)
    //                .service(ListService.get(0))
    //                .quantity(1)
    //                .build());
    //        roomServices.add(RoomService.builder()
    //                .room(room)
    //                .service(ListService.get(1))
    //                .quantity(1)
    //                .build());
    //        roomServices.add(RoomService.builder()
    //                .room(room)
    //                .service(ListService.get(2))
    //                .quantity(1)
    //                .build());
    //        roomServices.add(RoomService.builder()
    //                .room(room)
    //                .service(ListService.get(3))
    //                .quantity(1)
    //                .build());
    //    }

    private void createServices(Faker faker, ServiceRepository serviceRepository) {
        Service service1 = Service.builder()
                .typeService("rác")
                .nameService(faker.options().option("rác"))
                .build();

        Service service2 =
                Service.builder().typeService("điện").nameService("điện").build();

        Service service3 =
                Service.builder().typeService("nước").nameService("nước").build();

        Service service4 = Service.builder()
                .typeService("wifi/internet")
                .nameService("wifi/internet")
                .build();

        serviceRepository.saveAll(List.of(service1, service2, service3, service4));
    }

    private void createRoomImages(Faker faker, List<RoomImage> roomImages, Room room) {
        for (int j = 0; j < 5; j++) {
            imageIndex++;
            String imageUrl = "https://picsum.photos/1280/720?random=" + imageIndex;
            roomImages.add(new RoomImage(UUID.randomUUID(), room, imageUrl));
        }
    }

    private void createRentalAmenities(
            Faker faker,
            RentalAmenitiesRepository rentalAmenitiesRepository,
            BulletinBoard bulletinBoard,
            BulletinBoards_RentalAmRepository bulletinBoards_RentalAmRepository) {

        for (int i = 0; i < 5; i++) {
            String name = faker.options()
                    .option(
                            "Có gác lửng",
                            "Có chỗ giữ xe",
                            "Toilet riêng",
                            "Riêng với chủ",
                            "Có wifi",
                            "Có camera an ninh",
                            "Được nuôi thú cưng",
                            "Có ban công",
                            "Có nơi sinh hoạt");

            Optional<RentalAmenities> existingRentalAmenities = rentalAmenitiesRepository.findByName(name);

            RentalAmenities rentalAmenities;
            rentalAmenities = existingRentalAmenities.orElseGet(() -> rentalAmenitiesRepository.save(
                    RentalAmenities.builder().name(name).build()));

            bulletinBoards_RentalAmRepository.save(createBulletinBoards_RentalAm(bulletinBoard, rentalAmenities));
        }
    }

    private void bulletinBoardRule(
            Faker faker,
            List<BulletinBoardRule> bulletinBoardRuleList,
            RuleRepository ruleRepository,
            BulletinBoard bulletinBoard) {
        for (int j = 0; j < 5; j++) {
            Rule rule = ruleRepository.save(Rule.builder()
                    .ruleName(faker.options()
                            .option(
                                    "Nhà trọ có giờ giấc không về quá khuya",
                                    "Đóng tiền trọ đúng ngày",
                                    "Không hút thuốc, say xỉn",
                                    "Không chứa chấp tội phạm",
                                    "Không hát karaoke, nhậu nhặt ảnh hưởng tới phòng kế bên",
                                    "Cư xử văn hóa"))
                    .build());
            bulletinBoardRuleList = new ArrayList<>();
            bulletinBoardRuleList.add(bulletinBoardRuleRepository.save(BulletinBoardRule.builder()
                    .rule(rule)
                    .bulletinBoard(bulletinBoard)
                    .build()));
        }
        bulletinBoardRuleRepository.saveAll(bulletinBoardRuleList);
    }

    private void bulletinBoardReviews(
            Faker faker,
            List<BulletinBoardReviews> bulletinBoardReviewList,
            BulletinBoard bulletinBoard,
            Account account,
            BulletinBoardReviewsRepository bulletinBoardReviewsRepository) {

        BulletinBoardReviews bulletinBoardReviews = new BulletinBoardReviews();
        bulletinBoardReviewList.add(bulletinBoardReviewsRepository.save(bulletinBoardReviews
                .builder()
                .account(account)
                .bulletinBoard(bulletinBoard)
                .rating(faker.number().numberBetween(1, 5))
                .content(faker.lorem().paragraph())
                .build()));

        bulletinBoardReviewsRepository.saveAll(bulletinBoardReviewList);
    }

    private BulletinBoard createBulletinBoard(Faker faker, AccountRepository accountRepository) {
        BulletinBoard bulletinBoard = new BulletinBoard();
        bulletinBoard.setAccount(accountRepository.findByUsername("admin").get());
        bulletinBoard.setTitle(faker.address().city());
        bulletinBoard.setRentalCategory(faker.options()
                .option(
                        "Nhà trọ",
                        "Chung cư mini",
                        "Ký túc xá",
                        "Căn hộ dịch vụ",
                        "Phòng trọ có gác lửng",
                        "Nhà nguyên căn",
                        "Biệt thự",
                        "Homestay",
                        "Căn hộ studio",
                        "Officetel"));
        bulletinBoard.setDescription(faker.lorem().paragraph());
        bulletinBoard.setRentPrice(faker.number().randomDouble(2, 500000, 5000000));
        bulletinBoard.setPromotionalRentalPrice(faker.number().randomDouble(2, 500000, 5000000));
        bulletinBoard.setDeposit(faker.number().randomDouble(2, 500000, 5000000));
        bulletinBoard.setArea(faker.number().numberBetween(50, 200));
        bulletinBoard.setElectricityPrice(faker.number().randomDouble(2, 500000, 5000000));
        bulletinBoard.setWaterPrice(faker.number().randomDouble(2, 500000, 5000000));
        bulletinBoard.setMaxPerson(faker.options()
                .option(
                        "1 người ở",
                        "2 người ở",
                        "3 người ở",
                        "4 người ở",
                        "5-6 người ở",
                        "7-10 người ở",
                        "Không giới hạn"));
        bulletinBoard.setMoveInDate(new Date());
        bulletinBoard.setOpeningHours(faker.options().option("4 SA", "5 SA", "6 SA"));
        bulletinBoard.setCloseHours(faker.options().option("22 CH", "23 CH", "24 SA"));
        bulletinBoard.setAddress(faker.address().fullAddress());
        bulletinBoard.setLongitude(faker.number().randomDouble(2, 50, 50000));
        bulletinBoard.setLatitude(faker.number().randomDouble(2, 50, 5000));
        bulletinBoard.setStatus(faker.random().nextBoolean());
        bulletinBoard.setIsActive(faker.random().nextBoolean());
        return bulletinBoard;
    }

    private BulletinBoards_RentalAm createBulletinBoards_RentalAm(
            BulletinBoard bulletinBoard, RentalAmenities rentalAmenities) {
        BulletinBoards_RentalAm bulletinBoards_RentalAm = new BulletinBoards_RentalAm();
        bulletinBoards_RentalAm.setBulletinBoard(bulletinBoard);
        bulletinBoards_RentalAm.setRentalAmenities(rentalAmenities);
        return bulletinBoards_RentalAm;
    }

    private Tenant generateFakeTenant() {
        Faker faker = new Faker();

        // Tạo giá trị giả cho các trường
        String fullname = faker.name().fullName();
        String phone = faker.phoneNumber().cellPhone();

        // Đảm bảo phone không vượt quá độ dài 12 ký tự
        if (phone.length() > 10) {
            phone = phone.substring(0, 10);
        }

        String CCCD = faker.idNumber().valid();
        String email = faker.internet().emailAddress();
        LocalDate birthday = faker.date()
                .birthday()
                .toInstant()
                .atZone(java.time.ZoneId.systemDefault())
                .toLocalDate();
        Gender gender = faker.bool().bool() ? Gender.MALE : Gender.FEMALE;
        String address = faker.address().fullAddress();
        String job = faker.job().title();
        LocalDate licenseDate = faker.date()
                .birthday()
                .toInstant()
                .atZone(java.time.ZoneId.systemDefault())
                .toLocalDate();
        String placeOfLicense = faker.address().city();
        String frontPhoto = "front_" + faker.internet().uuid() + ".jpg";
        String backPhoto = "back_" + faker.internet().uuid() + ".jpg";
        Boolean role = faker.bool().bool();
        String relationship = faker.options().option("Chủ hộ", "Bạn bè", "Người thân");
        Boolean typeOfTenant = faker.bool().bool();
        Boolean temporaryResidence = faker.bool().bool(); // 2 option: true (Đã đầy đủ) hoặc false (Chưa đầy đủ)
        Boolean informationVerify = faker.bool().bool(); // 2 option: true (Đã có tạm trú) hoặc false (Chưa có tạm trú)

        // Tạo đối tượng Tenant
        Tenant tenant = Tenant.builder()
                .tenantId(UUID.randomUUID())
                .fullname(fullname)
                .phone(phone) // Đảm bảo phone không vượt quá 12 ký tự
                .cccd(CCCD)
                .email(email)
                .birthday(birthday)
                .gender(gender)
                .address(address)
                .job(job)
                .licenseDate(licenseDate)
                .placeOfLicense(placeOfLicense)
                .frontPhoto(frontPhoto)
                .backPhoto(backPhoto)
                .role(role)
                .relationship(relationship)
                .type_of_tenant(typeOfTenant)
                .temporaryResidence(temporaryResidence)
                .informationVerify(informationVerify)
                .build();

        return tenant;
    }
}
