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
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
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
    FOREIGN KEY (usernameLandlord) REFERENCES Accounts (username),
    FOREIGN KEY (usernameTenant) REFERENCES Accounts (username)
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
    FOREIGN KEY (username) REFERENCES Accounts (username),
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
    FOREIGN KEY (usernameTenant) REFERENCES Accounts (username),
    FOREIGN KEY (usernameLandlord) REFERENCES Accounts (username),
    FOREIGN KEY (roomId) REFERENCES Rooms (roomId)
);