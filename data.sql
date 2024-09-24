use rrms;

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
    RoomId INT NOT NULL,
    MobileId INT,
    InvoiceId INT,
    RoomServiceId INT,
    RoomDeviceId INT
);

CREATE TABLE Supports (
    SupportId INT NOT NULL,
    Username VARCHAR(255),
    DateOfStay DATE,
    CreateDate DATE,
    Price DECIMAL(10, 2)
);

CREATE TABLE Notifications (
    NotificationId INT NOT NULL,
    RoomId INT,
    UsernameLandlord VARCHAR(255),
    UsernameTenant VARCHAR(255),
    Title VARCHAR(255),
    Content TEXT,
    NumberOfRecipients INT
);

CREATE TABLE NotificationRoom (
    NotificationRoomId INT NOT NULL,
    RoomId INT,
    NotificationId INT
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
    BulletinBoardId INT NOT NULL,
    RoomId INT,
    Username VARCHAR(255),
    Title VARCHAR(255),
    DateOfCity DATE
);

CREATE TABLE Devices (
    DeviceId INT NOT NULL,
    DeviceName VARCHAR(255),
    Available BOOLEAN
);

CREATE TABLE RoomDevices (
    RoomDeviceId INT NOT NULL,
    RoomId INT,
    DeviceId INT,
    Quantity INT
);

CREATE TABLE RoomServices (
    RoomServiceId INT NOT NULL,
    RoomId INT,
    ServiceId INT
);

CREATE TABLE Services (
    ServiceId INT NOT NULL,
    TypeService VARCHAR(255),
    NameService VARCHAR(255),
    Price DECIMAL(10, 2)
);