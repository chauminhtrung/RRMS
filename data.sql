CREATE DATABASE rrms;

USE rrms;

DROP DATABASE rrms;

CREATE TABLE Roles (
    roleId BINARY(16) PRIMARY KEY,
    roleName VARCHAR(255),
    description TEXT
);

CREATE TABLE Accounts (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255),
    fullname VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    birthday DATE,
    gender ENUM('Male', 'Female'),
    cccd VARCHAR(15)
);

CREATE TABLE Motels (
    motelId BINARY(16) PRIMARY KEY,
    motelName VARCHAR(255),
    area DOUBLE,
    averagePrice DECIMAL(10, 2),
    address NVARCHAR (255),
    username VARCHAR(255),
    FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE Rules (
    ruleId BINARY(16) PRIMARY KEY,
    ruleName NVARCHAR (255),
    price DECIMAL(10, 2)
);

CREATE TABLE NameMotelServices (
    nameMotelServicesId BINARY(16) PRIMARY KEY,
    typeService NVARCHAR (255),
    nameService NVARCHAR (255),
    price DECIMAL(10, 2)
);

CREATE TABLE Auths (
    authId BINARY(16) PRIMARY KEY,
    username VARCHAR(50),
    roleId BINARY(16),
    FOREIGN KEY (username) REFERENCES Accounts (username),
    FOREIGN KEY (roleId) REFERENCES Roles (roleId)
);

CREATE TABLE Searchs (
    searchId BINARY(16) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    content TEXT,
    FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE MotelRules (
    motelRuleId BINARY(16) PRIMARY KEY,
    motelId BINARY(16),
    ruleId BINARY(16),
    FOREIGN KEY (motelId) REFERENCES Motels (motelId),
    FOREIGN KEY (ruleId) REFERENCES Rules (ruleId)
);

CREATE TABLE MotelServices (
    motelServiceId BINARY(16) PRIMARY KEY,
    motelId BINARY(16),
    nameMotelServiceId BINARY(16),
    FOREIGN KEY (motelId) REFERENCES Motels (motelId),
    FOREIGN KEY (nameMotelServiceId) REFERENCES NameMotelServices (nameMotelServicesId)
);

CREATE TABLE Supports (
    supportId BINARY(16) NOT NULL PRIMARY KEY,
    username VARCHAR(255),
    dateOfStay DATE,
    createDate DATE,
    price DECIMAL(10, 2),
    FOREIGN KEY (username) REFERENCES Accounts (username)
);

CREATE TABLE TypeRooms (
    typeRoomId BINARY(16) PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE Devices (
    deviceId BINARY(16) PRIMARY KEY,
    deviceName VARCHAR(255),
    available BOOLEAN
);

CREATE TABLE Services (
    serviceId BINARY(16) PRIMARY KEY,
    typeService VARCHAR(255),
    nameService VARCHAR(255),
    price DECIMAL(10, 2)
);

CREATE TABLE Payments (
    paymentId BINARY(16) PRIMARY KEY,
    paymentName VARCHAR(255),
    description TEXT
);

CREATE TABLE Rooms (
    roomId BINARY(16) PRIMARY KEY,
    motelId BINARY(16),
    typeRoomId BINARY(16),
    price DECIMAL(10, 2),
    roomArea DECIMAL(10, 2),
    available BOOLEAN,
    description TEXT,
    FOREIGN KEY (motelId) REFERENCES Motels (motelId),
    FOREIGN KEY (typeRoomId) REFERENCES TypeRooms (typeRoomId)
);

CREATE TABLE RoomImages (
    roomImageId BINARY(16) PRIMARY KEY,
    roomId BINARY(16),
    fileName VARCHAR(255),
    linkImg TEXT,
    mainImg BOOLEAN,
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId)
);

CREATE TABLE RoomReviews (
    roomReviewId BINARY(16) PRIMARY KEY,
    username VARCHAR(255),
    roomId BINARY(16),
    content TEXT,
    rating INT,
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId)
);

CREATE TABLE Invoices (
    invoiceId BINARY(16) PRIMARY KEY,
    username VARCHAR(255),
    roomId BINARY(16),
    paymentId BINARY(16),
    status VARCHAR(50),
    createDate DATE,
    FOREIGN KEY (username) REFERENCES Accounts (username),
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId),
    FOREIGN KEY (paymentId) REFERENCES Payments (paymentId)
);

CREATE TABLE RoomDevices (
    roomDeviceId BINARY(16) PRIMARY KEY,
    roomId BINARY(16),
    deviceId BINARY(16),
    quantity INT,
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId),
    FOREIGN KEY (deviceId) REFERENCES Devices (deviceId)
);

CREATE TABLE RoomServices (
    roomServiceId BINARY(16) PRIMARY KEY,
    roomId BINARY(16),
    serviceId BINARY(16),
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId),
    FOREIGN KEY (serviceId) REFERENCES Services (serviceId)
);

CREATE TABLE DetailInvoices (
    detailInvoiceId BINARY(16) PRIMARY KEY,
    invoiceId BINARY(16),
    roomServiceId BINARY(16),
    roomDeviceId BINARY(16),
    FOREIGN KEY (invoiceId) REFERENCES Invoices (invoiceId),
    FOREIGN KEY (roomServiceId) REFERENCES RoomServices (roomServiceId),
    FOREIGN KEY (roomDeviceId) REFERENCES RoomDevices (roomDeviceId)
);

CREATE TABLE Notifications (
    notificationId BINARY(16) NOT NULL PRIMARY KEY,
    usernameLandlord VARCHAR(255),
    usernameTenant VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    numberOfRecipients INT,
    FOREIGN KEY (usernameLandlord) REFERENCES Accounts (username)
);

CREATE TABLE NotificationRooms (
    notificationRoomId BINARY(16) PRIMARY KEY,
    roomId BINARY(16),
    notificationId BINARY(16),
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId),
    FOREIGN KEY (notificationId) REFERENCES Notifications (notificationId)
);

CREATE TABLE BulletinBoards (
    bulletinBoardId BINARY(16) PRIMARY KEY,
    roomId BINARY(16),
    username VARCHAR(255),
    title VARCHAR(255),
    dateOfStay DATE,
    -- FOREIGN KEY (username) REFERENCES Accounts (username),
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId)
);

CREATE TABLE Contracts (
    contractId BINARY(16) PRIMARY KEY,
    roomId BINARY(16),
    usernameTenant VARCHAR(50),
    usernameLandlord VARCHAR(50),
    firstTime DATE,
    leaseTerm INT,
    description TEXT,
    deposit DECIMAL(10, 2),
    status ENUM('ACTIVE', 'ENDED'),
    -- FOREIGN KEY (usernameLandlord) REFERENCES Accounts (username),
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId)
);

INSERT INTO Roles (roleId, roleName, description) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Admin', 'Administrator role'),
(UNHEX(REPLACE(UUID(), '-', '')), 'User', 'Regular user role'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Landlord', 'Landlord role'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Tenant', 'Tenant role');

INSERT INTO Accounts (username, password, fullname, phone, email, birthday, gender, cccd) VALUES
('user1', 'password1', 'User One', '1234567890', 'user1@example.com', '1990-01-01', 'Male', '123456789'),
('user2', 'password2', 'User Two', '0987654321', 'user2@example.com', '1992-02-02', 'Female', '987654321'),
('landlord1', 'password3', 'Landlord One', '1112223333', 'landlord1@example.com', '1985-03-03', 'Male', '123123123'),
('tenant1', 'password4', 'Tenant One', '4445556666', 'tenant1@example.com', '1995-04-04', 'Female', '321321321'),
('user3', 'password5', 'User Three', '7778889999', 'user3@example.com', '1988-05-05', 'Male', '456456456');

INSERT INTO Motels (motelId, motelName, area, averagePrice, address, username) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Motel A', 150.0, 100.00, 'Address A', 'landlord1'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Motel B', 200.0, 150.00, 'Address B', 'landlord1'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Motel C', 120.0, 80.00, 'Address C', 'landlord1'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Motel D', 180.0, 120.00, 'Address D', 'landlord1'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Motel E', 220.0, 200.00, 'Address E', 'landlord1');

INSERT INTO Rules (ruleId, ruleName, price) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'No Pets', 0.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'No Smoking', 0.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Quiet Hours', 0.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Visitor Policy', 0.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Cleaning Fee', 50.00);

INSERT INTO NameMotelServices (nameMotelServicesId, typeService, nameService, price) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Cleaning', 'Room Cleaning', 30.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Laundry', 'Laundry Service', 20.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Internet', 'High-Speed Internet', 15.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Food', 'Meal Service', 50.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Parking', 'Parking Service', 10.00);

INSERT INTO Auths (authId, username, roleId) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'user1', (SELECT roleId FROM Roles WHERE roleName = 'User')),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', (SELECT roleId FROM Roles WHERE roleName = 'Landlord')),
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', (SELECT roleId FROM Roles WHERE roleName = 'Tenant')),
(UNHEX(REPLACE(UUID(), '-', '')), 'user2', (SELECT roleId FROM Roles WHERE roleName = 'User')),
(UNHEX(REPLACE(UUID(), '-', '')), 'user3', (SELECT roleId FROM Roles WHERE roleName = 'User'));

INSERT INTO Searchs (searchId, username, content) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'user1', 'Looking for a room in the city center.'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user2', 'Searching for pet-friendly accommodations.'),
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', 'Need a room with kitchen facilities.'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user3', 'Looking for shared rooms.'),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', 'Available rooms for rent.');

INSERT INTO MotelRules (motelRuleId, motelId, ruleId) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel A'), (SELECT ruleId FROM Rules WHERE ruleName = 'No Pets')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel B'), (SELECT ruleId FROM Rules WHERE ruleName = 'No Smoking')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel C'), (SELECT ruleId FROM Rules WHERE ruleName = 'Quiet Hours')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel D'), (SELECT ruleId FROM Rules WHERE ruleName = 'Visitor Policy')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel E'), (SELECT ruleId FROM Rules WHERE ruleName = 'Cleaning Fee'));

INSERT INTO MotelServices (motelServiceId, motelId, nameMotelServiceId) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel A'), (SELECT nameMotelServicesId FROM NameMotelServices WHERE nameService = 'Room Cleaning')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel B'), (SELECT nameMotelServicesId FROM NameMotelServices WHERE nameService = 'Laundry Service')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel C'), (SELECT nameMotelServicesId FROM NameMotelServices WHERE nameService = 'High-Speed Internet')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel D'), (SELECT nameMotelServicesId FROM NameMotelServices WHERE nameService = 'Meal Service')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel E'), (SELECT nameMotelServicesId FROM NameMotelServices WHERE nameService = 'Parking Service'));

INSERT INTO Supports (supportId, username, dateOfStay, createDate, price) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', '2024-09-01', '2024-08-25', 150.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', '2024-10-01', '2024-09-25', 200.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'user1', '2024-09-15', '2024-09-10', 100.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'user2', '2024-09-20', '2024-09-15', 120.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'user3', '2024-09-30', '2024-09-28', 180.00);

INSERT INTO TypeRooms (typeRoomId, name) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Single Room'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Double Room'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Suite'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Dormitory'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Family Room');

INSERT INTO Devices (deviceId, deviceName, available) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Air Conditioner', TRUE),
(UNHEX(REPLACE(UUID(), '-', '')), 'Television', TRUE),
(UNHEX(REPLACE(UUID(), '-', '')), 'Refrigerator', TRUE),
(UNHEX(REPLACE(UUID(), '-', '')), 'Microwave', TRUE),
(UNHEX(REPLACE(UUID(), '-', '')), 'Wi-Fi Router', TRUE);

INSERT INTO Services (serviceId, typeService, nameService, price) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Cleaning', 'Daily Cleaning', 25.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Laundry', 'Laundry Service', 15.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Food', 'Breakfast Service', 10.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Transportation', 'Airport Shuttle', 50.00),
(UNHEX(REPLACE(UUID(), '-', '')), 'Leisure', 'Spa Services', 100.00);

INSERT INTO Payments (paymentId, paymentName, description) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'Credit Card', 'Payment via credit card'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Cash', 'Payment in cash'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Bank Transfer', 'Payment via bank transfer'),
(UNHEX(REPLACE(UUID(), '-', '')), 'PayPal', 'Payment via PayPal'),
(UNHEX(REPLACE(UUID(), '-', '')), 'Bitcoin', 'Payment via Bitcoin');

INSERT INTO Rooms (roomId, motelId, typeRoomId, price, roomArea, available, description) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel A'), (SELECT typeRoomId FROM TypeRooms WHERE name = 'Single Room'), 100.00, 20.0, TRUE, 'Cozy single room.'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel B'), (SELECT typeRoomId FROM TypeRooms WHERE name = 'Double Room'), 150.00, 25.0, TRUE, 'Spacious double room.'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel C'), (SELECT typeRoomId FROM TypeRooms WHERE name = 'Suite'), 200.00, 30.0, TRUE, 'Luxury suite with a view.'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel D'), (SELECT typeRoomId FROM TypeRooms WHERE name = 'Dormitory'), 50.00, 15.0, TRUE, 'Shared dormitory room.'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT motelId FROM Motels WHERE motelName = 'Motel E'), (SELECT typeRoomId FROM TypeRooms WHERE name = 'Family Room'), 250.00, 40.0, TRUE, 'Ideal for families.');

INSERT INTO RoomImages (roomImageId, roomId, fileName, linkImg, mainImg) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), 'room1_a.jpg', 'http://example.com/room1_a.jpg', TRUE),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), 'room1_b.jpg', 'http://example.com/room1_b.jpg', FALSE),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), 'room2_a.jpg', 'http://example.com/room2_a.jpg', TRUE),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), 'room2_b.jpg', 'http://example.com/room2_b.jpg', FALSE),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), 'room3_a.jpg', 'http://example.com/room3_a.jpg', TRUE);

INSERT INTO RoomReviews (roomReviewId, username, roomId, content, rating) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'user1', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), 'Great stay!', 5),
(UNHEX(REPLACE(UUID(), '-', '')), 'user2', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), 'Average experience.', 3),
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), 'Loved the amenities!', 4),
(UNHEX(REPLACE(UUID(), '-', '')), 'user3', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), 'Not clean enough.', 2),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), 'Very comfortable stay.', 5);

INSERT INTO Invoices (invoiceId, username, roomId, paymentId, status, createDate) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), (SELECT paymentId FROM Payments WHERE paymentName = 'Credit Card'), 'PAID', '2024-09-01'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user1', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), (SELECT paymentId FROM Payments WHERE paymentName = 'Cash'), 'UNPAID', '2024-09-05'),
(UNHEX(REPLACE(UUID(), '-', '')), 'tenant1', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), (SELECT paymentId FROM Payments WHERE paymentName = 'Bank Transfer'), 'PAID', '2024-09-10'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user2', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), (SELECT paymentId FROM Payments WHERE paymentName = 'PayPal'), 'PAID', '2024-09-12'),
(UNHEX(REPLACE(UUID(), '-', '')), 'user3', (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), (SELECT paymentId FROM Payments WHERE paymentName = 'Bitcoin'), 'UNPAID', '2024-09-15');

INSERT INTO RoomDevices (roomDeviceId, roomId, deviceId, quantity) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), (SELECT deviceId FROM Devices WHERE deviceName = 'Air Conditioner'), 1),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), (SELECT deviceId FROM Devices WHERE deviceName = 'Television'), 1),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), (SELECT deviceId FROM Devices WHERE deviceName = 'Refrigerator'), 1),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), (SELECT deviceId FROM Devices WHERE deviceName = 'Microwave'), 1),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), (SELECT deviceId FROM Devices WHERE deviceName = 'Wi-Fi Router'), 1);

INSERT INTO RoomServices (roomServiceId, roomId, serviceId) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), (SELECT serviceId FROM Services WHERE nameService = 'Daily Cleaning')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), (SELECT serviceId FROM Services WHERE nameService = 'Laundry Service')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), (SELECT serviceId FROM Services WHERE nameService = 'Breakfast Service')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), (SELECT serviceId FROM Services WHERE nameService = 'Airport Shuttle')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), (SELECT serviceId FROM Services WHERE nameService = 'Spa Services'));

INSERT INTO DetailInvoices (detailInvoiceId, invoiceId, roomServiceId, roomDeviceId) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT invoiceId FROM Invoices WHERE username = 'tenant1'), (SELECT roomServiceId FROM RoomServices WHERE roomId = (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A'))), NULL),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT invoiceId FROM Invoices WHERE username = 'user1'), NULL, (SELECT roomDeviceId FROM RoomDevices WHERE roomId = (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')))),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT invoiceId FROM Invoices WHERE username = 'tenant1'), (SELECT roomServiceId FROM RoomServices WHERE roomId = (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C'))), NULL),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT invoiceId FROM Invoices WHERE username = 'user2'), NULL, (SELECT roomDeviceId FROM RoomDevices WHERE roomId = (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')))),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT invoiceId FROM Invoices WHERE username = 'user3'), (SELECT roomServiceId FROM RoomServices WHERE roomId = (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E'))), NULL);

INSERT INTO Notifications (notificationId, usernameLandlord, usernameTenant, title, content, numberOfRecipients) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', 'tenant1', 'Room Available', 'Your requested room is now available.', 1),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', 'user1', 'Payment Reminder', 'Your payment is due soon.', 1),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', 'user2', 'Lease Ending', 'Your lease is ending next week.', 1),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', 'tenant1', 'New Amenities', 'We have added new amenities to your building.', 1),
(UNHEX(REPLACE(UUID(), '-', '')), 'landlord1', 'user3', 'Feedback Request', 'We would love your feedback.', 1);

INSERT INTO NotificationRooms (notificationRoomId, roomId, notificationId) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), (SELECT notificationId FROM Notifications WHERE title = 'Room Available')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), (SELECT notificationId FROM Notifications WHERE title = 'Payment Reminder')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), (SELECT notificationId FROM Notifications WHERE title = 'Lease Ending')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), (SELECT notificationId FROM Notifications WHERE title = 'New Amenities')),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), (SELECT notificationId FROM Notifications WHERE title = 'Feedback Request'));

INSERT INTO BulletinBoards (bulletinBoardId, roomId, username, title, dateOfStay) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), 'landlord1', 'Room for Rent', 'Room available starting next month.', '2024-10-01'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), 'user1', 'Looking for Roommate', 'Looking for a roommate to share the cost.', '2024-09-15'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), 'user2', 'Available for Rent', 'Room available for immediate rent.', '2024-09-10'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), 'user3', 'Need a place', 'In need of a temporary room.', '2024-09-20'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), 'tenant1', 'Seeking Tenants', 'Looking for tenants for a lovely room.', '2024-09-25');

INSERT INTO Contracts (contractId, roomId, usernameTenant, usernameLandlord, firstTime, leaseTerm, description, deposit, status) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel A')), 'tenant1', 'landlord1', '2024-09-01', 12, 'Lease for one year', 300.00, 'ACTIVE'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel B')), 'user1', 'landlord1', '2024-09-05', 6, 'Lease for six months', 150.00, 'ACTIVE'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel C')), 'user2', 'landlord1', '2024-09-10', 12, 'Lease for one year', 400.00, 'ENDED'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel D')), 'user3', 'landlord1', '2024-09-15', 3, 'Lease for three months', 100.00, 'ACTIVE'),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT roomId FROM Rooms WHERE motelId = (SELECT motelId FROM Motels WHERE motelName = 'Motel E')), 'tenant1', 'landlord1', '2024-09-20', 12, 'Lease for one year', 500.00, 'ACTIVE');

SELECT CONCAT(
    SUBSTRING(HEX(roleId), 1, 8), '-',
    SUBSTRING(HEX(roleId), 9, 4), '-',
    SUBSTRING(HEX(roleId), 13, 4), '-',
    SUBSTRING(HEX(roleId), 17, 4), '-',
    SUBSTRING(HEX(roleId), 21)
) AS uuid, roleName
FROM roles;