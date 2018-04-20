CREATE DATABASE
IF NOT EXISTS `skeletone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `skeletone`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: skeletone
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.14-MariaDB-10.2.14+maria~jessie

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `T_USER`
--

DROP TABLE IF EXISTS `T_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `T_USER`
(
  `ID` int
(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar
(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EMAIL` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PASSWD` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CRTE_DT` datetime DEFAULT current_timestamp
(),
  PRIMARY KEY
(`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `T_USER`
--

LOCK TABLES `T_USER` WRITE;
/*!40000 ALTER TABLE `T_USER` DISABLE KEYS */;
INSERT INTO `
T_USER`
VALUES
  (1, '박재훈', 'setyourmindpark@gmail.com', '4a7d1ed414474e4033ac29ccb8653d9b', '2018-04-09 14:30:33');
/*!40000 ALTER TABLE `T_USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample`
--

DROP TABLE IF EXISTS `sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sample`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `col1` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col2` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col3` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col4` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col5` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample`
--

LOCK TABLES `sample` WRITE;
/*!40000 ALTER TABLE `sample` DISABLE KEYS */;
INSERT INTO `
sample`
VALUES
  (1, 'row1_col1', 'row1_col2', 'row1_col3', 'row1_col4', 'a'),
  (2, 'row2_col1', 'row2_col2', 'row2_col3', 'row2_col4', 'a'),
  (3, 'row3_col1', 'row3_col2', 'row3_col3', 'row3_col4', 'b'),
  (4, 'row4_col1', 'row4_col2', 'row4_col3', 'row4_col4', 'b'),
  (43, 'a', 'b', 'c', 'd', 'e'),
  (44, 'a', 'b', 'c', 'd', 'e'),
  (45, 'a', 'b', 'c', 'd', 'e'),
  (46, 'a', 'b', 'c', 'd', 'e'),
  (47, 'a', 'b', 'c', 'd', 'e'),
  (48, 'a', 'b', 'c', 'd', 'e'),
  (49, 'a', 'b', 'c', 'd', 'e'),
  (50, 'a', 'b', 'c', 'd', 'e'),
  (51, 'a', 'b', 'c', 'd', 'e'),
  (52, 'a', 'b', 'c', 'd', 'e'),
  (53, 'a', 'b', 'c', 'd', 'e'),
  (54, 'a', 'b', 'c', 'd', 'e'),
  (55, 'a', 'b', 'c', 'd', 'e'),
  (56, 'a', 'b', 'c', 'd', 'e'),
  (57, 'a', 'b', 'c', 'd', 'e'),
  (58, 'a', 'b', 'c', 'd', 'e'),
  (59, 'a', 'b', 'c', 'd', 'e'),
  (60, 'a', 'b', 'c', 'd', 'e'),
  (61, 'a', 'b', 'c', 'd', 'e'),
  (62, 'a', 'b', 'c', 'd', 'e'),
  (63, 'a', 'b', 'c', 'd', 'e'),
  (64, 'a', 'b', 'c', 'd', 'e'),
  (65, 'a', 'b', 'c', 'd', 'e'),
  (66, 'a', 'b', 'c', 'd', 'e'),
  (67, 'a', 'b', 'c', 'd', 'e'),
  (68, 'a', 'b', 'c', 'd', 'e'),
  (69, 'a', 'b', 'c', 'd', 'e'),
  (70, 'a', 'b', 'c', 'd', 'e'),
  (71, 'a', 'b', 'c', 'd', 'e'),
  (72, 'a', 'b', 'c', 'd', 'e'),
  (73, 'a', 'b', 'c', 'd', 'e'),
  (74, 'a', 'b', 'c', 'd', 'e'),
  (75, 'a', 'b', 'c', 'd', 'e'),
  (76, 'a', 'b', 'c', 'd', 'e'),
  (77, 'a', 'b', 'c', 'd', 'e'),
  (78, 'a', 'b', 'c', 'd', 'e'),
  (79, 'a', 'b', 'c', 'd', 'e'),
  (80, 'a', 'b', 'c', 'd', 'e'),
  (81, 'a', 'b', 'c', 'd', 'e'),
  (82, 'a', 'b', 'c', 'd', 'e'),
  (83, 'a', 'b', 'c', 'd', 'e'),
  (84, 'a', 'b', 'c', 'd', 'e'),
  (85, 'a', 'b', 'c', 'd', 'e'),
  (86, 'a', 'b', 'c', 'd', 'e'),
  (87, 'a', 'b', 'c', 'd', 'e'),
  (88, 'a', 'b', 'c', 'd', 'e'),
  (89, 'a', 'b', 'c', 'd', 'e'),
  (90, 'a', 'b', 'c', 'd', 'e'),
  (91, 'a', 'b', 'c', 'd', 'e'),
  (92, 'a', 'b', 'c', 'd', 'e'),
  (93, 'a', 'b', 'c', 'd', 'e'),
  (94, 'a', 'b', 'c', 'd', 'e'),
  (95, 'a', 'b', 'c', 'd', 'e'),
  (96, 'a', 'b', 'c', 'd', 'e'),
  (97, 'a', 'b', 'c', 'd', 'e'),
  (98, 'a', 'b', 'c', 'd', 'e'),
  (99, 'a', 'b', 'c', 'd', 'e'),
  (100, 'a', 'b', 'c', 'd', 'e'),
  (101, 'a', 'b', 'c', 'd', 'e'),
  (102, 'a', 'b', 'c', 'd', 'e'),
  (103, 'a', 'b', 'c', 'd', 'e'),
  (104, 'a', 'b', 'c', 'd', 'e'),
  (105, 'a', 'b', 'c', 'd', 'e'),
  (106, 'a', 'b', 'c', 'd', 'e'),
  (107, 'a', 'b', 'c', 'd', 'e'),
  (108, 'a', 'b', 'c', 'd', 'e'),
  (109, 'a', 'b', 'c', 'd', 'e'),
  (110, 'a', 'b', 'c', 'd', 'e'),
  (111, 'a', 'b', 'c', 'd', 'e'),
  (112, 'a', 'b', 'c', 'd', 'e'),
  (113, 'a', 'b', 'c', 'd', 'e'),
  (114, 'a', 'b', 'c', 'd', 'e'),
  (115, 'a', 'b', 'c', 'd', 'e'),
  (116, 'a', 'b', 'c', 'd', 'e'),
  (117, 'a', 'b', 'c', 'd', 'e');
/*!40000 ALTER TABLE `sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_rel`
--

DROP TABLE IF EXISTS `sample_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sample_rel`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `sample_id` int
(11) DEFAULT NULL,
  `col1` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col2` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col3` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col4` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `col5` varchar
(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_rel`
--

LOCK TABLES `sample_rel` WRITE;
/*!40000 ALTER TABLE `sample_rel` DISABLE KEYS */;
INSERT INTO `
sample_rel`
VALUES
  (1, 1, 'row1_col1', 'row1_col2', 'row1_col3', 'row1_row4', 'row1_row5'),
  (2, 1, 'row2_col1', 'row2_col2', 'row2_col3', 'row2_col4', 'row2_col5'),
  (3, 1, 'row3_col1', 'row3_col2', 'row3_col3', 'row3_col4', 'row3_col5'),
  (4, 1, 'row4_col1', 'row4_col2', 'row4_col3', 'row4_col4', 'row4_col5'),
  (5, 2, 'row5_col1', 'row5_col2', 'row5_col3', 'row5_col4', 'row5_col5'),
  (6, 2, 'row6_col1', 'row5_col2', 'row5_col3', 'row5_col4', 'row5_col5');
/*!40000 ALTER TABLE `sample_rel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-17 16:35:59
