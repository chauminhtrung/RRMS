CREATE DATABASE rrms;

USE rrms;

DROP DATABASE rrms;

CREATE TABLE accounts (
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NULL,
    fullname VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(255) NULL,
    avatar VARCHAR(255) NULL,
    birthday date NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    cccd VARCHAR(15) NULL,
    heart_id BINARY(16) NULL,
    CONSTRAINT pk_accounts PRIMARY KEY (username)
);

CREATE TABLE auths (
    auth_id BINARY(16) NOT NULL,
    username VARCHAR(255) NULL,
    role_id BINARY(16) NULL,
    CONSTRAINT pk_auths PRIMARY KEY (auth_id)
);

CREATE TABLE bulletin_boards (
    bulletin_board_id BINARY(16) NOT NULL,
    room_id BINARY(16) NULL,
    username VARCHAR(255) NULL,
    title VARCHAR(255) NULL,
    date_of_stay date NULL,
    CONSTRAINT pk_bulletin_boards PRIMARY KEY (bulletin_board_id)
);

CREATE TABLE contracts (
    contract_id BINARY(16) NOT NULL,
    room_id BINARY(16) NULL,
    username_tenant VARCHAR(255) NULL,
    username_landlord VARCHAR(255) NULL,
    first_time date NULL,
    lease_term INT NULL,
    `description` TEXT NULL,
    deposit DECIMAL(10, 2) NULL,
    status ENUM('ACTIVE', 'ENDED') NULL,
    CONSTRAINT pk_contracts PRIMARY KEY (contract_id)
);

CREATE TABLE detail_invoices (
    detail_invoice_id BINARY(16) NOT NULL,
    invoice_id BINARY(16) NULL,
    room_service_id BINARY(16) NULL,
    room_device_id BINARY(16) NULL,
    CONSTRAINT pk_detail_invoices PRIMARY KEY (detail_invoice_id)
);

CREATE TABLE devices (
    device_id BINARY(16) NOT NULL,
    device_name VARCHAR(255) NULL,
    available BIT(1) NULL,
    CONSTRAINT pk_devices PRIMARY KEY (device_id)
);

CREATE TABLE heart_room (
    heart_id BINARY(16) NOT NULL,
    room_id BINARY(16) NOT NULL
);

CREATE TABLE hearts (
    heart_id BINARY(16) NOT NULL,
    username VARCHAR(255) NULL,
    CONSTRAINT pk_hearts PRIMARY KEY (heart_id)
);

CREATE TABLE invoices (
    invoice_id BINARY(16) NOT NULL,
    username VARCHAR(255) NULL,
    room_id BINARY(16) NULL,
    payment_id BINARY(16) NULL,
    status VARCHAR(50) NULL,
    create_date date NULL,
    CONSTRAINT pk_invoices PRIMARY KEY (invoice_id)
);

CREATE TABLE motels (
    motel_id BINARY(16) NOT NULL,
    motel_name VARCHAR(255) NULL,
    area DOUBLE NULL,
    average_price DECIMAL(10, 2) NULL,
    address NVARCHAR (255) NULL,
    username VARCHAR(255) NULL,
    CONSTRAINT pk_motels PRIMARY KEY (motel_id)
);

CREATE TABLE motel_rules (
    motel_rule_id BINARY(16) NOT NULL,
    motel_id BINARY(16) NULL,
    rule_id BINARY(16) NULL,
    CONSTRAINT pk_motel_rules PRIMARY KEY (motel_rule_id)
);

CREATE TABLE motel_services (
    motel_service_id BINARY(16) NOT NULL,
    motel_id BINARY(16) NULL,
    name_motel_service_id BINARY(16) NULL,
    CONSTRAINT pk_motel_services PRIMARY KEY (motel_service_id)
);

CREATE TABLE name_motel_services (
    name_motel_services_id BINARY(16) NOT NULL,
    type_service NVARCHAR (255) NULL,
    name_service NVARCHAR (255) NULL,
    price DECIMAL(10, 2) NULL,
    CONSTRAINT pk_name_motel_services PRIMARY KEY (name_motel_services_id)
);

CREATE TABLE notifications (
    notification_id BINARY(16) NOT NULL,
    username_landlord VARCHAR(255) NULL,
    username_tenant VARCHAR(255) NULL,
    title VARCHAR(255) NULL,
    content TEXT NULL,
    number_of_recipients INT NULL,
    CONSTRAINT pk_notifications PRIMARY KEY (notification_id)
);

CREATE TABLE notification_rooms (
    notification_room_id BINARY(16) NOT NULL,
    room_id BINARY(16) NULL,
    notification_id BINARY(16) NULL,
    CONSTRAINT pk_notification_rooms PRIMARY KEY (notification_room_id)
);

CREATE TABLE payments (
    payment_id BINARY(16) NOT NULL,
    payment_name VARCHAR(255) NULL,
    `description` TEXT NULL,
    CONSTRAINT pk_payments PRIMARY KEY (payment_id)
);

CREATE TABLE roles (
    role_id BINARY(16) NOT NULL,
    role_name VARCHAR(255) NULL,
    `description` TEXT NULL,
    CONSTRAINT pk_roles PRIMARY KEY (role_id)
);

CREATE TABLE rooms (
    room_id BINARY(16) NOT NULL,
    motel_id BINARY(16) NOT NULL,
    type_room_id BINARY(16) NOT NULL,
    name_room VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NULL,
    deposit DECIMAL(10, 2) NULL,
    room_area INT NULL,
    max_person INT NULL,
    rental_start_time date NULL,
    available BIT(1) NULL,
    censor BIT(1) NULL,
    hours NVARCHAR (255) NULL,
    `description` TEXT NULL,
    CONSTRAINT pk_rooms PRIMARY KEY (room_id)
);

CREATE TABLE room_devices (
    room_device_id BINARY(16) NOT NULL,
    room_id BINARY(16) NULL,
    device_id BINARY(16) NULL,
    quantity INT NULL,
    CONSTRAINT pk_room_devices PRIMARY KEY (room_device_id)
);

CREATE TABLE room_images (
    room_image_id BINARY(16) NOT NULL,
    room_id BINARY(16) NULL,
    image VARCHAR(255) NULL,
    CONSTRAINT pk_room_images PRIMARY KEY (room_image_id)
);

CREATE TABLE room_reviews (
    room_review_id BINARY(16) NOT NULL,
    room_id BINARY(16) NULL,
    username VARCHAR(255) NULL,
    rating INT NULL,
    comment TEXT NULL,
    CONSTRAINT pk_room_reviews PRIMARY KEY (room_review_id)
);

CREATE TABLE room_services (
    room_service_id BINARY(16) NOT NULL,
    room_id BINARY(16) NOT NULL,
    service_id BINARY(16) NULL,
    CONSTRAINT pk_room_services PRIMARY KEY (room_service_id)
);

CREATE TABLE rules (
    rule_id BINARY(16) NOT NULL,
    rule_name NVARCHAR (255) NULL,
    price DECIMAL(10, 2) NULL,
    CONSTRAINT pk_rules PRIMARY KEY (rule_id)
);

CREATE TABLE searchs (
    search_id BINARY(16) NOT NULL,
    username VARCHAR(255) NULL,
    content TEXT NULL,
    CONSTRAINT pk_searchs PRIMARY KEY (search_id)
);

CREATE TABLE services (
    service_id BINARY(16) NOT NULL,
    type_service VARCHAR(255) NULL,
    name_service VARCHAR(255) NULL,
    price DECIMAL(10, 2) NULL,
    CONSTRAINT pk_services PRIMARY KEY (service_id)
);

CREATE TABLE supports (
    support_id BINARY(16) NOT NULL,
    username VARCHAR(255) NULL,
    date_of_stay date NULL,
    create_date date NULL,
    price DECIMAL(10, 2) NULL,
    CONSTRAINT pk_supports PRIMARY KEY (support_id)
);

CREATE TABLE type_rooms (
    type_room_id BINARY(16) NOT NULL,
    name VARCHAR(50) NULL,
    CONSTRAINT pk_type_rooms PRIMARY KEY (type_room_id)
);

ALTER TABLE type_rooms
ADD CONSTRAINT uc_type_rooms_name UNIQUE (name);

-- Relationships
ALTER TABLE accounts
ADD CONSTRAINT uc_accounts_heart UNIQUE (heart_id);

ALTER TABLE accounts ADD CONSTRAINT uc_accounts_phone UNIQUE (phone);

ALTER TABLE accounts
ADD CONSTRAINT FK_ACCOUNTS_ON_HEART FOREIGN KEY (heart_id) REFERENCES hearts (heart_id);

ALTER TABLE auths
ADD CONSTRAINT FK_AUTHS_ON_ROLE FOREIGN KEY (role_id) REFERENCES roles (role_id);

ALTER TABLE auths
ADD CONSTRAINT FK_AUTHS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE bulletin_boards
ADD CONSTRAINT FK_BULLETIN_BOARDS_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE bulletin_boards
ADD CONSTRAINT FK_BULLETIN_BOARDS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE contracts
ADD CONSTRAINT FK_CONTRACTS_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE contracts
ADD CONSTRAINT FK_CONTRACTS_ON_USERNAME_LANDLORD FOREIGN KEY (username_landlord) REFERENCES accounts (username);

ALTER TABLE contracts
ADD CONSTRAINT FK_CONTRACTS_ON_USERNAME_TENANT FOREIGN KEY (username_tenant) REFERENCES accounts (username);

ALTER TABLE detail_invoices
ADD CONSTRAINT FK_DETAIL_INVOICES_ON_INVOICE FOREIGN KEY (invoice_id) REFERENCES invoices (invoice_id);

ALTER TABLE detail_invoices
ADD CONSTRAINT FK_DETAIL_INVOICES_ON_ROOM_DEVICE FOREIGN KEY (room_device_id) REFERENCES room_devices (room_device_id);

ALTER TABLE detail_invoices
ADD CONSTRAINT FK_DETAIL_INVOICES_ON_ROOM_SERVICE FOREIGN KEY (room_service_id) REFERENCES room_services (room_service_id);

ALTER TABLE hearts
ADD CONSTRAINT uc_hearts_username UNIQUE (username);

ALTER TABLE hearts
ADD CONSTRAINT FK_HEARTS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE heart_room
ADD CONSTRAINT fk_hearoo_on_heart FOREIGN KEY (heart_id) REFERENCES hearts (heart_id);

ALTER TABLE heart_room
ADD CONSTRAINT fk_hearoo_on_room FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE invoices
ADD CONSTRAINT FK_INVOICES_ON_PAYMENT FOREIGN KEY (payment_id) REFERENCES payments (payment_id);

ALTER TABLE invoices
ADD CONSTRAINT FK_INVOICES_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE invoices
ADD CONSTRAINT FK_INVOICES_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE motels
ADD CONSTRAINT FK_MOTELS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE motel_rules
ADD CONSTRAINT FK_MOTEL_RULES_ON_MOTEL FOREIGN KEY (motel_id) REFERENCES motels (motel_id);

ALTER TABLE motel_rules
ADD CONSTRAINT FK_MOTEL_RULES_ON_RULE FOREIGN KEY (rule_id) REFERENCES rules (rule_id);

ALTER TABLE motel_services
ADD CONSTRAINT FK_MOTEL_SERVICES_ON_MOTEL FOREIGN KEY (motel_id) REFERENCES motels (motel_id);

ALTER TABLE motel_services
ADD CONSTRAINT FK_MOTEL_SERVICES_ON_NAME_MOTEL_SERVICE FOREIGN KEY (name_motel_service_id) REFERENCES name_motel_services (name_motel_services_id);

ALTER TABLE notifications
ADD CONSTRAINT FK_NOTIFICATIONS_ON_USERNAME_LANDLORD FOREIGN KEY (username_landlord) REFERENCES accounts (username);

ALTER TABLE notifications
ADD CONSTRAINT FK_NOTIFICATIONS_ON_USERNAME_TENANT FOREIGN KEY (username_tenant) REFERENCES accounts (username);

ALTER TABLE notification_rooms
ADD CONSTRAINT FK_NOTIFICATION_ROOMS_ON_NOTIFICATION FOREIGN KEY (notification_id) REFERENCES notifications (notification_id);

ALTER TABLE notification_rooms
ADD CONSTRAINT FK_NOTIFICATION_ROOMS_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE rooms
ADD CONSTRAINT FK_ROOMS_ON_MOTEL FOREIGN KEY (motel_id) REFERENCES motels (motel_id);

ALTER TABLE rooms
ADD CONSTRAINT FK_ROOMS_ON_TYPE_ROOM FOREIGN KEY (type_room_id) REFERENCES type_rooms (type_room_id);

ALTER TABLE room_devices
ADD CONSTRAINT FK_ROOM_DEVICES_ON_DEVICE FOREIGN KEY (device_id) REFERENCES devices (device_id);

ALTER TABLE room_devices
ADD CONSTRAINT FK_ROOM_DEVICES_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE room_images
ADD CONSTRAINT FK_ROOM_IMAGES_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE room_reviews
ADD CONSTRAINT FK_ROOM_REVIEWS_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE room_reviews
ADD CONSTRAINT FK_ROOM_REVIEWS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE room_services
ADD CONSTRAINT FK_ROOM_SERVICES_ON_ROOM FOREIGN KEY (room_id) REFERENCES rooms (room_id);

ALTER TABLE room_services
ADD CONSTRAINT FK_ROOM_SERVICES_ON_SERVICE FOREIGN KEY (service_id) REFERENCES services (service_id);

ALTER TABLE searchs
ADD CONSTRAINT FK_SEARCHS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);

ALTER TABLE supports
ADD CONSTRAINT FK_SUPPORTS_ON_USERNAME FOREIGN KEY (username) REFERENCES accounts (username);






-- hợp đồng đã hết hạn
DELIMITER //

CREATE FUNCTION GetTotalExpiredContracts(username VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_expired INT;

    SELECT COUNT(*) INTO total_expired
    FROM Contracts
    WHERE DATE_ADD(first_time, INTERVAL lease_term MONTH) <= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    AND username_landlord = username;

    RETURN total_expired;
END //

DELIMITER ;
-- hợp đồng da hết hạn
DELIMITER //
SHOW PROCEDURE STATUS WHERE Name = 'GetTotalExpiredContracts';
CREATE PROCEDURE GetTotalExpiredContracts(IN username VARCHAR(255))
BEGIN
    DECLARE total_expired INT;

    -- Gọi hàm để lấy tổng số hợp đồng sắp hết hạn
    SET total_expired = GetTotalExpiredContracts(username);

    -- Trả về tổng số hợp đồng sắp hết hạn
    SELECT total_expired AS total_expired_contracts;
END //

DELIMITER ;
-- hợp đồng sắp hết hạn
DELIMITER //

CREATE FUNCTION GetTotalExpiringContracts(username VARCHAR(255))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_expiring INT;

    SELECT COUNT(*) INTO total_expiring
    FROM Contracts
    WHERE DATE_ADD(first_time, INTERVAL lease_term MONTH) <= CURDATE() + INTERVAL 30 DAY
    AND DATE_ADD(first_time, INTERVAL lease_term MONTH) >= CURDATE()
    AND username_landlord = username;

    RETURN total_expiring;
END //

DELIMITER ;

-- hợp đồng sắp hết hạn
DELIMITER //
SHOW PROCEDURE STATUS WHERE Name = 'GetTotalExpiringContractsProcedure';
CREATE PROCEDURE GetTotalExpiringContractsProcedure(IN username VARCHAR(255))
BEGIN
    DECLARE total_expiring INT;

    -- Gọi hàm để lấy tổng số hợp đồng sắp hết hạn
    SET total_expiring = GetTotalExpiringContracts(username);

    -- Trả về tổng số hợp đồng sắp hết hạn
    SELECT total_expiring AS total_expiring_contracts;
END //

DELIMITER ;

-- funtion
-- tong tien phong
DELIMITER //

CREATE FUNCTION GetTotalRoomPrice(username VARCHAR(255))
RETURNS DOUBLE
DETERMINISTIC
BEGIN
    DECLARE total_room_price DOUBLE;

    SELECT SUM(r.price) INTO total_room_price
    FROM Motels m
    JOIN Rooms r ON m.motel_id = r.motel_id
    JOIN Invoices i ON r.room_id = i.room_id
    WHERE i.status = 'Đã thanh toán' AND m.username = username;

    RETURN total_room_price;
END //

DELIMITER ;

-- tong tien dich vu
DELIMITER //

CREATE FUNCTION GetTotalServicePrice(username VARCHAR(255))
RETURNS DOUBLE
DETERMINISTIC
BEGIN
    DECLARE total_service_price DOUBLE;

    SELECT SUM(s.price) INTO total_service_price
    FROM Motels m
    JOIN Rooms r ON m.motel_id = r.motel_id
    JOIN Invoices i ON r.room_id = i.room_id
    LEFT JOIN Room_services rs ON rs.room_id = r.room_id
    LEFT JOIN Services s ON s.service_id = rs.service_id
    WHERE i.status = 'Đã thanh toán' AND m.username = username;

    RETURN total_service_price;
END //

DELIMITER ;

-- tong hoa don
DELIMITER //
SELECT GetTotalRoomPrice('admin') AS total_expiring;
CREATE FUNCTION GetTotalInvoice(username VARCHAR(255))
RETURNS DOUBLE
DETERMINISTIC
BEGIN
    DECLARE total_invoice DOUBLE;

    SELECT (SUM(r.price) + COALESCE(SUM(s.price), 0)) INTO total_invoice
    FROM Motels m
    JOIN Rooms r ON m.motel_id = r.motel_id
    JOIN Invoices i ON r.room_id = i.room_id
    LEFT JOIN Room_services rs ON rs.room_id = r.room_id
    LEFT JOIN Services s ON s.service_id = rs.service_id
    WHERE i.status = 'Đã thanh toán' AND m.username = username;

    RETURN total_invoice;
END //

DELIMITER ;

-- PROCEDURE
-- tien phong
DELIMITER //

CREATE PROCEDURE GetTotalRoomPriceProcedure(IN username VARCHAR(255))
BEGIN
    DECLARE total_room_price DOUBLE;

    SET total_room_price = GetTotalRoomPrice(username);
    
    SELECT total_room_price AS total_room_price;
END //

DELIMITER ;

-- tien dich vu
DELIMITER //

CREATE PROCEDURE GetTotalServicePriceProcedure(IN username VARCHAR(255))
BEGIN
    DECLARE total_service_price DOUBLE;

    SET total_service_price = GetTotalServicePrice(username);
    
    SELECT total_service_price AS total_service_price;
END //

DELIMITER ;

-- tien hoa don
DELIMITER //

CREATE PROCEDURE GetTotalInvoiceProcedure(IN username VARCHAR(255))
BEGIN
    DECLARE total_invoice DOUBLE;

    SET total_invoice = GetTotalInvoice(username);
    
    SELECT total_invoice AS total_invoice;
END //

DELIMITER ;



select  * from accounts
