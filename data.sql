CREATE DATABASE rrms;

USE rrms;

DROP DATABASE rrms;

CREATE TABLE Roles (  
    Role_id BINARY(16) PRIMARY KEY,  
    RoleName VARCHAR(255),  
    Description TEXT  
);  

CREATE TABLE Accounts (  
    Username VARCHAR(255) NOT NULL PRIMARY KEY,  
    Password VARCHAR(255),  
    Fullname VARCHAR(255),  
    Phone VARCHAR(20),  
    Email VARCHAR(255),  
    Birthday DATE,  
    Gender VARCHAR(10),  
    CCCD INT  
);  

CREATE TABLE Motels (  
    Motel_id BINARY(16) PRIMARY KEY,  
    MotelName VARCHAR(255),  
    Area DOUBLE,  
    AveragePrice DECIMAL(10,2),  
    Address NVARCHAR(255),  
    Username VARCHAR(255),  
    FOREIGN KEY (Username) REFERENCES Accounts(Username)  
);  

CREATE TABLE Rules (  
    Rule_id BINARY(16) PRIMARY KEY,  
    RuleName NVARCHAR(255),  
    Price DECIMAL(10,2)  
);  

CREATE TABLE NameMotelServices (  
    NameMotelServices_id BINARY(16) PRIMARY KEY,  
    TypeService NVARCHAR(255),  
    NameService NVARCHAR(255),  
    Price DECIMAL(10,2)  
);  

CREATE TABLE Auths (  
    Auth_id BINARY(16) PRIMARY KEY,  
    Username VARCHAR(50),  
    Role_id BINARY(16),  
    FOREIGN KEY (Username) REFERENCES Accounts(Username),  
    FOREIGN KEY (Role_id) REFERENCES Roles(Role_id)  
);  

CREATE TABLE Searchs (  
    Search_id BINARY(16) PRIMARY KEY,  
    Username VARCHAR(100) NOT NULL,  
    Content TEXT,  
    FOREIGN KEY (Username) REFERENCES Accounts(Username)  
);  

CREATE TABLE MotelRules (  
    MotelRule_id BINARY(16) PRIMARY KEY,  
    Motel_id BINARY(16),  
    Rule_id BINARY(16),  
    FOREIGN KEY (Motel_id) REFERENCES Motels(Motel_id),  
    FOREIGN KEY (Rule_id) REFERENCES Rules(Rule_id)  
);  

CREATE TABLE MotelServices (  
    MotelService_id BINARY(16) PRIMARY KEY,  
    Motel_id BINARY(16),  
    NameMotelService_id BINARY(16),  
    FOREIGN KEY (Motel_id) REFERENCES Motels(Motel_id),  
    FOREIGN KEY (NameMotelService_id) REFERENCES NameMotelServices(NameMotelServices_id)  
);  

CREATE TABLE Supports (  
    Support_id BINARY(16) NOT NULL PRIMARY KEY,  
    Username VARCHAR(255),  
    DateOfStay DATE,  
    CreateDate DATE,  
    Price DECIMAL(10,2),  
    FOREIGN KEY (Username) REFERENCES Accounts(Username)  
);  



CREATE TABLE TypeRooms (  
    TypeRoom_id BINARY(16) PRIMARY KEY,  
    Name VARCHAR(50)  
);  

CREATE TABLE Devices (  
    Device_id BINARY(16) PRIMARY KEY,  
    DeviceName VARCHAR(255),  
    Available BOOLEAN  
);  

CREATE TABLE Services (  
    Service_id BINARY(16) PRIMARY KEY,  
    TypeService VARCHAR(255),  
    NameService VARCHAR(255),  
    Price DECIMAL(10,2)  
);  

CREATE TABLE Payments (  
    Payment_id BINARY(16) PRIMARY KEY,  
    Payment_name VARCHAR(255),  
    Description TEXT  
);  

CREATE TABLE Rooms (  
    Room_id BINARY(16) PRIMARY KEY,  
    Motel_id BINARY(16),  
    TypeRoom_id BINARY(16),  
    Price DECIMAL(10,2),  
    RoomArea DECIMAL(10,2),  
    Available BOOLEAN,  
    Description TEXT,  
    FOREIGN KEY (Motel_id) REFERENCES Motels(Motel_id),  
    FOREIGN KEY (TypeRoom_id) REFERENCES TypeRooms(TypeRoom_id)
);  

CREATE TABLE RoomImages (  
    RoomImage_id BINARY(16) PRIMARY KEY,  
    Room_id BINARY(16),
    File_name VARCHAR(255),  
    Linkimg TEXT,  
    MainImg BOOLEAN ,
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id)  
);  

CREATE TABLE RoomReviews (  
    RoomReview_id BINARY(16) PRIMARY KEY,  
    Username VARCHAR(255),  
    Room_id BINARY(16),  
    Content TEXT,  
    Rating INT,  
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id)  
);  

CREATE TABLE Invoices (  
    Invoice_id BINARY(16) PRIMARY KEY,  
    Username VARCHAR(255),  
    Room_id BINARY(16),  
    Payment_id BINARY(16),  
    Status VARCHAR(50),  
    CreateDate DATE,  
    FOREIGN KEY (Username) REFERENCES Accounts(Username),  
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id),  
    FOREIGN KEY (Payment_id) REFERENCES Payments(Payment_id)  
);  

CREATE TABLE RoomDevices (  
    RoomDevice_id BINARY(16) PRIMARY KEY,  
    Room_id BINARY(16),  
    Device_id BINARY(16),  
    Quantity INT,  
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id),  
    FOREIGN KEY (Device_id) REFERENCES Devices(Device_id)  
);  

CREATE TABLE RoomServices (  
    RoomService_id BINARY(16) PRIMARY KEY,  
    Room_id BINARY(16),  
    Service_id BINARY(16),  
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id),  
    FOREIGN KEY (Service_id) REFERENCES Services(Service_id)  
);  

CREATE TABLE Detail_invoices (  
    Detail_invoice_id BINARY(16) PRIMARY KEY,  
    Invoice_id BINARY(16),  
    RoomService_id BINARY(16),  
    RoomDevice_id BINARY(16),  
    FOREIGN KEY (Invoice_id) REFERENCES Invoices(Invoice_id),  
    FOREIGN KEY (RoomService_id) REFERENCES RoomServices(RoomService_id),  
    FOREIGN KEY (RoomDevice_id) REFERENCES RoomDevices(RoomDevice_id)  
);

CREATE TABLE Notifications (  
    Notification_id BINARY(16) NOT NULL PRIMARY KEY,  
    Username_Landlord VARCHAR(255),  
    Username_Tenant VARCHAR(255),  
    Title VARCHAR(255),  
    Content TEXT,  
    NumberOfRecipients INT,  
    FOREIGN KEY (Username_Landlord) REFERENCES Accounts(Username)  
);  

CREATE TABLE NotificationRooms (  
    NotificationRoom_id BINARY(16) PRIMARY KEY,  
    Room_id BINARY(16),  
    Notification_id BINARY(16),  
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id), 
    FOREIGN KEY (Notification_id) REFERENCES Notifications(Notification_id) 
);  

CREATE TABLE BulletinBoards (  
    BulletinBoard_id BINARY(16) PRIMARY KEY,  
    Room_id BINARY(16),  
    Username VARCHAR(255),  
    Title VARCHAR(255),  
    DateOfStay DATE,  
    -- FOREIGN KEY (Username) REFERENCES Accounts(Username),
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id)  
);  

CREATE TABLE Contracts (  
    Contract_id BINARY(16) PRIMARY KEY,  
    Room_id BINARY(16),  
    Username_Tenant VARCHAR(50),  
    Username_Landlord VARCHAR(50),  
    FirstTime DATE,  
    LeaseTerm INT,  
    Description TEXT,  
    Deposit DECIMAL(10, 2),  
    Status ENUM('ACTIVE', 'ENDED'),  
    -- FOREIGN KEY (Username_Landlord) REFERENCES Accounts(Username),
    FOREIGN KEY (Room_id) REFERENCES Rooms(Room_id)  
);


