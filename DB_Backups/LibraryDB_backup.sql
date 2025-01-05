-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: LibraryDB
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `BookID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL,
  `Series` varchar(255) DEFAULT NULL,
  `Genre` varchar(100) DEFAULT NULL,
  `Format` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'The Great Gatsby','F. Scott Fitzgerald',NULL,'Fiction','ePub'),(2,'Harry Potter and the Philosopher\'s Stone','J.K. Rowling','Harry Potter','Fantasy','PDF'),(3,'To Kill a Mockingbird','Harper Lee',NULL,'Classic','PDF');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `downloadhistory`
--

DROP TABLE IF EXISTS `downloadhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `downloadhistory` (
  `DownloadID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `BookID` int DEFAULT NULL,
  `DownloadDate` date DEFAULT NULL,
  `Format` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`DownloadID`),
  KEY `UserID` (`UserID`),
  KEY `BookID` (`BookID`),
  CONSTRAINT `downloadhistory_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  CONSTRAINT `downloadhistory_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `books` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `downloadhistory`
--

LOCK TABLES `downloadhistory` WRITE;
/*!40000 ALTER TABLE `downloadhistory` DISABLE KEYS */;
INSERT INTO `downloadhistory` VALUES (1,1,1,'2025-01-01','ePub'),(2,2,2,'2025-01-02','PDF');
/*!40000 ALTER TABLE `downloadhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alka_Kaminer','4245d01535871323159eef2df0e9afc32cc2d250db68030e37104a556a2f6876','Alka Kaminer','Alka@livehappywithin.com'),(2,'Brian_Kaminer','c1f70dbbfbbef097b3cc1e41a616210960a8687bf35f52454f2909ad433b1770','Brian Kaminer','Brian@livehappywithin.com'),(3,'Tyler_Kaminer','c8107835c8f1d8731361da2c660726cb197d9d1502cffdbe39e3a6ffe79b6dcc','Tyler Kaminer','Tyler@livehappywithin.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-05 11:32:25
