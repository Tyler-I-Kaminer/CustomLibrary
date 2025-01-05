CREATE DATABASE LibraryDB;
USE LibraryDB;

CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Author VARCHAR(255),
    Series VARCHAR(255),
    Genre VARCHAR(100),
    Format VARCHAR(50)
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50),
    PasswordHash VARCHAR(255),
    Name VARCHAR(255),
    Email VARCHAR(255)
);

CREATE TABLE DownloadHistory (
    DownloadID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    BookID INT,
    DownloadDate DATE,
    Format VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

INSERT INTO Books (Title, Author, Series, Genre, Format)
VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', NULL, 'Fiction', 'ePub'),
('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 'Harry Potter', 'Fantasy', 'PDF'),
('To Kill a Mockingbird', 'Harper Lee', NULL, 'Classic', 'PDF');


INSERT INTO Users (Username, PasswordHash, Name, Email)
VALUES 
('Alka_Kaminer', SHA2('Lib3912!', 256), 'Alka Kaminer', 'Alka@livehappywithin.com'),
('Brian_Kaminer', SHA2('Lib3911!', 256), 'Brian Kaminer', 'Brian@livehappywithin.com'),
('Tyler_Kaminer', SHA2('Lib2836!', 256), 'Tyler Kaminer', 'Tyler@livehappywithin.com');

INSERT INTO DownloadHistory (UserID, BookID, DownloadDate, Format)
VALUES 
(1, 1, '2025-01-01', 'ePub'),
(2, 2, '2025-01-02', 'PDF');
