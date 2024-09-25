CREATE DATABASE rrms;

USE rrms;

DROP DATABASE rrms;

CREATE TABLE Roles (
    roleId BINARY(16) PRIMARY KEY,
    roleName VARCHAR(255),
    description TEXT
);

CREATE TABLE Rules (
    ruleId BINARY(16) PRIMARY KEY,
    ruleName NVARCHAR (255),
    price DECIMAL(10, 2)
);

CREATE TABLE Searchs (
    searchId BINARY(16) PRIMARY KEY,
    userName VARCHAR(100) not null,
    content TEXT
);

CREATE TABLE Motels (
    motelId BINARY(16) PRIMARY KEY,
    motelName VARCHAR(255),
    area DOUBLE,
    averagePrice DECIMAL(10, 2),
    address NVARCHAR (255)
);

CREATE TABLE Rooms (
    Room_id BINARY(16) PRIMARY KEY,
    Motel_id BINARY(16),
    TypeRoom_id BINARY(16),
    Image_id BINARY(16),
    Price DECIMAL(10, 2),
    RoomArea DECIMAL(10, 2),
    Available BOOLEAN,
    Description TEXT
);

CREATE TABLE Supports (
    SupportId BINARY(16) NOT NULL,
    Username VARCHAR(255),
    DateOfStay DATE,
    CreateDate DATE,
    Price DECIMAL(10, 2)
);

CREATE TABLE Notifications (
    NotificationId BINARY(16) NOT NULL,
    RoomId BINARY(16),
    UsernameLandlord VARCHAR(255),
    UsernameTenant VARCHAR(255),
    Title VARCHAR(255),
    Content TEXT,
    NumberOfRecipients INT
);

CREATE TABLE NotificationRooms (
    NotificationRoomId BINARY(16) NOT NULL,
    RoomId BINARY(16),
    NotificationId BINARY(16)
);

CREATE TABLE Accounts (
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255),
    Fullname VARCHAR(255),
    Phone VARCHAR(20),
    Email VARCHAR(255),
    Birthday DATE,
    Gender VARCHAR(10),
    OID INT
);

CREATE TABLE BulletinBoards (
    BulletinBoardId BINARY(16) NOT NULL,
    RoomId BINARY(16),
    Username VARCHAR(255),
    Title VARCHAR(255),
    DateOfCity DATE
);

CREATE TABLE Devices (
    DeviceId BINARY(16) NOT NULL,
    DeviceName VARCHAR(255),
    Available BOOLEAN
);

CREATE TABLE RoomDevices (
    RoomDeviceId BINARY(16) NOT NULL,
    RoomId BINARY(16),
    DeviceId BINARY(16),
    Quantity INT
);

CREATE TABLE RoomServices (
    RoomServiceId INBINARY (16) T NOT NULL,
    RoomId BINARY(16),
    ServiceId BINARY(16)
);

CREATE TABLE Services (
    ServiceId BINARY(16) NOT NULL,
    TypeService VARCHAR(255),
    NameService VARCHAR(255),
    Price DECIMAL(10, 2)
);

CREATE TABLE Detail_invoices (
    Detail_invoice_id BINARY(16) PRIMARY KEY,
    Invoice_id BINARY(16),
    RoomService_id BINARY(16),
    RoomDevice_id BINARY(16)
);

CREATE TABLE Invoices (
    Invoice_id BINARY(16) PRIMARY KEY,
    Username VARCHAR(255),
    Room_id BINARY(16),
    Payment_id BINARY(16),
    Status VARCHAR(50),
    CreateDate DATE
);

CREATE TABLE Payments (
    Payment_id BINARY(16) PRIMARY KEY,
    Payment_name VARCHAR(255),
    Description TEXT
);

CREATE TABLE RoomReviews (
    RoomReview_id BINARY(16) PRIMARY KEY,
    Content TEXT,
    Rating INT
);

CREATE TABLE TypeRooms (
    TypeRoom_id BINARY(16) PRIMARY KEY,
    Name VARCHAR(50)
);

CREATE TABLE RoomImages (
    RoomImage_id BINARY(16) PRIMARY KEY,
    Room_id BINARY(16),
    File_name VARCHAR(255),
    linkimg TEXT,
    MainImg BOOLEAN,
);

CREATE TABLE Contracts (
    Contract_Id IBINARY (16) PRIMARY KEY,
    Room_id BINARY(16),
    Username_Tenant VARCHAR(50),
    Username_Landlord VARCHAR(50),
    FirstTime DATE,
    Leaseterm INT,
    Description TEXT,
    Deposit DECIMAL(10, 2),
    Status ENUM('ACTIVE', 'ENDED'),
);

CREATE TABLE MotelServices (
    MotelRule_id BINARY(16) PRIMARY KEY,
    Motel_id BINARY(16),
    NameMTService_id BINARY(16)
);

CREATE TABLE MotelRules (
    MotelRule_id IBINARY (16) PRIMARY KEY,
    Motel_id BINARY(16),
    Rule_id BINARY(16)
);

CREATE TABLE NameMTServices (
    NameMTService_id BINARY(16) PRIMARY KEY,
    Type_Service VARCHAR(50),
    Name_Service VARCHAR(100),
    Price DECIMAL(10, 2)
);

CREATE TABLE Auths (
    Auth_id BINARY(16) PRIMARY KEY,
    Username VARCHAR(50),
    Role_id BINARY(16)
);