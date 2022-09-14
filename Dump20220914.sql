-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: web_shop
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `TAIKHOAN` varchar(11) NOT NULL,
  `MATKHAU` varchar(45) NOT NULL,
  `EMAIL` varchar(45) NOT NULL,
  `TEN` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`TAIKHOAN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('123','SS','11','NGUYENTIN'),('923','tin','12','TIN2');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctdonhang`
--

DROP TABLE IF EXISTS `ctdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctdonhang` (
  `MACT` int unsigned NOT NULL AUTO_INCREMENT,
  `MADH` int unsigned NOT NULL,
  `MASP` int unsigned NOT NULL,
  `SL` int NOT NULL,
  `GIA` float NOT NULL,
  PRIMARY KEY (`MACT`),
  KEY `k1_idx` (`MADH`),
  KEY `k2_idx` (`MASP`),
  CONSTRAINT `k1` FOREIGN KEY (`MADH`) REFERENCES `donhang` (`MADH`),
  CONSTRAINT `k2` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctdonhang`
--

LOCK TABLES `ctdonhang` WRITE;
/*!40000 ALTER TABLE `ctdonhang` DISABLE KEYS */;
INSERT INTO `ctdonhang` VALUES (130,36,57,1,11200),(131,36,56,1,12000),(132,36,55,1,15000),(133,36,54,1,17000),(134,37,57,1,11200),(135,37,56,1,12000),(136,37,55,1,15000),(138,38,40,1,10000),(139,39,24,1,5000),(140,39,39,1,8500),(141,40,54,1,17000),(142,41,31,2,15000),(143,42,30,1,9000),(144,42,41,1,12000),(145,42,56,1,12112),(147,43,38,1,7000),(148,43,39,1,8500),(149,44,42,1,6000),(150,44,42,1,6000),(151,45,56,1,12112);
/*!40000 ALTER TABLE `ctdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhgia`
--

DROP TABLE IF EXISTS `danhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhgia` (
  `MASP` int unsigned NOT NULL,
  `MAKH` int unsigned NOT NULL,
  `VOTE` int DEFAULT '0',
  `MADG` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`MADG`),
  KEY `K_idx` (`MAKH`),
  KEY `FK_DG_MSP_idx` (`MASP`),
  CONSTRAINT `FK_DG_MKH` FOREIGN KEY (`MAKH`) REFERENCES `khachhang` (`MAKH`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_DG_MSP` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhgia`
--

LOCK TABLES `danhgia` WRITE;
/*!40000 ALTER TABLE `danhgia` DISABLE KEYS */;
INSERT INTO `danhgia` VALUES (57,17,1,41),(56,17,5,42),(55,17,5,43),(54,17,3,44),(57,73,3,45),(56,73,3,46),(55,73,3,47),(54,73,3,48),(31,19,0,49),(38,20,4,50),(39,20,0,51),(40,17,0,52),(42,17,0,53),(42,17,0,54);
/*!40000 ALTER TABLE `danhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `MADH` int unsigned NOT NULL AUTO_INCREMENT,
  `MAKH` int unsigned NOT NULL,
  `TRANGTHAI` int NOT NULL,
  `DATE` date DEFAULT NULL,
  PRIMARY KEY (`MADH`),
  KEY `FK_DH_MKH_idx` (`MAKH`),
  CONSTRAINT `DH_FK_MKH` FOREIGN KEY (`MAKH`) REFERENCES `khachhang` (`MAKH`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (36,17,2,'2022-08-24'),(37,73,2,'2022-07-25'),(38,17,2,'2022-09-04'),(39,72,0,NULL),(40,73,2,'2022-08-28'),(41,19,2,'2022-08-28'),(42,19,1,'2022-08-28'),(43,20,2,'2022-08-29'),(44,17,2,'2022-09-10'),(45,17,2,'2022-09-10');
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MAKH` int unsigned NOT NULL AUTO_INCREMENT,
  `TEN` varchar(50) NOT NULL,
  `GIOITINH` int NOT NULL,
  `SDT` varchar(11) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `MATKHAU` varchar(15) NOT NULL,
  `DIACHI` varchar(50) NOT NULL,
  `HINHANH` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MAKH`),
  UNIQUE KEY `SDT_UNIQUE` (`SDT`),
  CONSTRAINT `khachhang_chk_2` CHECK (((`GIOITINH` >= 0) and (`GIOITINH` <= 2)))
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (17,'Nguyễn Chí Tín',2,'0923136637','N18DCCN188@GMAIL.COM','123123','SÀI GÒN VN','hinh-anh-avatar-nam-1-600x600.jpg'),(19,'NGUYEN-TIN 2',0,'0923136638','N18DCCN188@GMAIL.COM','123123','TPTD','av2.jpg'),(20,'new WORK',2,'0923136639','N18DCCN188@GMAIL.COM','123123','TAU khua NHU CC ????','av1.jpg'),(69,'Nguyễn văn a',1,'0923136636','akumaraito1@gmail.com','364807','Thành phố thủ đức','hinh-anh-avatar-nam-1-600x600.jpg'),(70,'Nguyentin',1,'0923136631','akumaraito10@gmail.com','123','Da lat','anh-avatar-cute-dep-ngau.jpg'),(72,'Nguyễn VĂN A',1,'1231231231','akumaraito12','123','97 MAN THIỆN',NULL),(73,'NguyenVanB',1,'1231231232','akumaraito3@gmail.com','123','Quận 9 thủ đức',NULL);
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `MASP` int unsigned NOT NULL AUTO_INCREMENT,
  `IMG` varchar(200) DEFAULT NULL,
  `TENSP` varchar(100) NOT NULL,
  `GIASP` float NOT NULL,
  `MOTA` varchar(7000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `XUATXU` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `BAOHANH` int NOT NULL,
  `LOAI` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `TSIMG` varchar(300) DEFAULT NULL,
  `TRANGTHAI` int DEFAULT '0',
  PRIMARY KEY (`MASP`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci CHECKSUM=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (24,'https://s.alicdn.com/@sc04/kf/He20d3864ec3c40b98f217a7aabc42ed5o.jpg_960x960.jpg','XZHHAY002',5000,NULL,'MỸ',12,'máy phay thường','https://i.imgur.com/FrnXAFs.png',0),(26,'https://s.alicdn.com/@sc04/kf/H70dac2596e5e4122a92316897d06651bF.jpg_960x960.jpg','X715',1000,NULL,'Mỹ',12,'máy phay thường','https://i.imgur.com/pOd8CzH.png',0),(27,'https://s.alicdn.com/@sc04/kf/HTB1mh_oezgy_uJjSZSyq6zqvVXa8.jpg_960x960.jpg','ZAY7045V',8700,NULL,'Mỹ',24,'máy phay thường','https://i.imgur.com/mOCYPQ4.png',0),(28,'https://s.alicdn.com/@sc04/kf/H6c4c1e986b934de0816d1e229ee73ca78.jpg_960x960.jpg','HV-850 • JHV-1020',12000,NULL,'Mỹ',24,'máy phay cnc','https://i.imgur.com/5DZU0vM.png',0),(29,'https://s.alicdn.com/@sc04/kf/Hd3afda56aac64389b43572c1b5cb85983.jpg_960x960.jpg','VTC-1020L',10000,NULL,'Mỹ',12,'máy phay cnc','https://i.imgur.com/juNRaox.png',0),(30,'https://s.alicdn.com/@sc04/kf/Hd0e584ab581546b681bc91bf86a7d6a1j.jpg_960x960.jpg','XK7124 XK7125',9000,NULL,'Mỹ',12,'máy phay cnc','https://i.imgur.com/uNTVT6V.png',0),(31,'https://s.alicdn.com/@sc04/kf/HTB1UbJKHFmWBuNjSspdq6zugXXah.jpg_960x960.jpg','DAS 36C CNC',15000,NULL,'Nhật',24,'máy tiện cnc','https://i.imgur.com/oCx1FG5.png',0),(32,'https://s.alicdn.com/@sc04/kf/Hd0008e331ae7455b836197a88f456ee3T.jpg_960x960.jpg','CK6132 CNC',9999,NULL,'Nhật',24,'máy tiện cnc','https://i.imgur.com/lAwvfc3.png',0),(33,'https://s.alicdn.com/@sc04/kf/HTB11MZEaSWD3KVjSZSgq6ACxVXaJ.jpg_960x960.jpg','Torno Cnc CK6140',10000,NULL,'Nhật',24,'máy tiện cnc','https://i.imgur.com/J91VyNi.png',0),(34,'https://s.alicdn.com/@sc04/kf/H4aad28e4767541ecb8ba3a8e35800048d.jpg_960x960.jpg','KD C0632A Cq6125',9000,NULL,'Mỹ',12,'máy tiện thường','https://i.imgur.com/oS4k9pz.png',0),(35,'https://s.alicdn.com/@sc04/kf/HTB18eJPbBcXBuNjt_Xoq6xIwFXaJ.jpg_960x960.jpg','C0636A C0636B',10000,NULL,'Mỹ',12,'máy tiện thường','https://i.imgur.com/md7xzix.png',0),(36,'https://s.alicdn.com/@sc04/kf/He0d5755622da4e1b9971fa84be5e5dc45.jpg_960x960.jpg','Z3080X25/1',4000,NULL,'TQ',12,'máy khoan cần','https://i.imgur.com/f8vBHtc.png',0),(37,'https://s.alicdn.com/@sc04/kf/H6c9409bbec1249d582c7babcf1cfcaccW.jpg_960x960.jpg','DD703.30',5000,NULL,'TQ',12,'máy khoan cần','https://i.imgur.com/Jarlm23.png',0),(38,'https://s.alicdn.com/@sc04/kf/Hf82b7ea14b7c4378954be7154fbffd17h.jpg_960x960.jpg','BOSM DS2020 CNC',7000,NULL,'Mỹ',12,'máy khoan cần nc','https://i.imgur.com/3vSf7iu.png',0),(39,'https://s.alicdn.com/@sc04/kf/H9d2fff5b10124039bd67aab9fdbd26e8z.jpg_960x960.jpg','RD1300NCH-III/RD1600NCH-III',8500,NULL,'Mỹ',12,'máy khoan cần nc','https://i.imgur.com/eRpqfLt.png',0),(40,'https://s.alicdn.com/@sc04/kf/H44a548907a4f47d89a7cbc88400bb8942.jpg_960x960.jpg','MD-25',10000,NULL,'Mỹ',12,'máy khoan phay','https://i.imgur.com/dpTevKD.png',0),(41,'https://s.alicdn.com/@sc04/kf/H6d47959953c4454794b8bf9d5bc8e821w.jpg_960x960.jpg','MD-40 & MD-40N2F',12000,NULL,'Mỹ',36,'máy khoan phay','https://i.imgur.com/6dq5L0o.png',0),(42,'https://s.alicdn.com/@sc04/kf/Hb1d3b25f4e8b4b24a4df8cde4dad2d0cn.jpg_960x960.jpg','DP-915AH',6000,NULL,'TQ',12,'máy khoan bàn','https://i.imgur.com/NXkHu1L.png',0),(43,'https://s.alicdn.com/@sc04/kf/H1658d590804a4dd491fdd7528f3b9482e.jpg_960x960.jpg','DP-932V',6350,NULL,'TQ',12,'máy khoan bàn','https://i.imgur.com/Y0L5P8q.png',0),(44,'https://sc04.alicdn.com/kf/HTB1y7niX5jrK1RjSsplq6xHmVXa5.jpg','OCD-2025',12000,NULL,'Mỹ',24,'máy mài tròn','https://i.imgur.com/nZv2Laz.png',0),(45,'https://s.alicdn.com/@sc04/kf/H1f0cd82cc6b143458928dc5f2996674c2.jpg_960x960.jpg','UH-350/650, 800',10000,NULL,'Mỹ',24,'máy mài tròn','https://i.imgur.com/cK3WRdS.png',0),(46,'https://s.alicdn.com/@sc04/kf/H4598ed28a5c3434e855fa36886dbebb9n.jpg_960x960.jpg','PFG-100400AHD',6000,NULL,'Nhật',24,'máy mài phẳng','https://i.imgur.com/tp4omyA.png',0),(47,'https://s.alicdn.com/@sc04/kf/H877f0f14b38346df8aef17848cf28b837.jpg_960x960.jpg','PFG-200R',9000,NULL,'Nhật',24,'máy mài phẳng','https://i.imgur.com/vay4D65.png',0),(48,'https://vinamachines.com/wp-content/uploads/2014/04/SJ-1018T.png','SJ-1018T(10″)',13000,NULL,'Mỹ',12,'máy cưa vòng','https://i.imgur.com/ZGWkGCv.png',0),(49,'http://tbcnsv.com/upload/images/auto.png','SJ-H1833(18″)',15000,NULL,'Mỹ',12,'máy cưa vòng','https://i.imgur.com/GG3ljgi.png',0),(50,'https://s.alicdn.com/@sc04/kf/H830f48f0817f43f7b1ba8a0431a83201r.jpg_960x960.jpg','BSW-530-BSW-1270',8300,NULL,'TQ',24,'máy cắt dây','https://i.imgur.com/qDwKeNX.png',1),(51,'https://s.alicdn.com/@sc04/kf/H25c8013dfc2d4dfc8cb52132e1579599y.jpg_960x960.jpg','SW-325-SW-645',9000,NULL,'Mỹ',12,'máy cắt dây','https://i.imgur.com/2TMD01i.png',0),(52,'https://s.alicdn.com/@sc04/kf/HTB1JKb4aorrK1RkSne1q6ArVVXaU.jpg_960x960.jpg','ED-6045C',11000,NULL,'Nhật',36,'máy xung điện','https://i.imgur.com/7eHtLEB.png',0),(53,'https://s.alicdn.com/@sc04/kf/H59bd1ea8d92a45d2a2cede10966c5c86N.jpg_960x960.jpg','EDM-350DE',10000,NULL,'Nhật',12,'máy xung điện','https://i.imgur.com/2oBKjbZ.png',0),(54,'https://s.alicdn.com/@sc04/kf/Hef098721214246b0b7d1caecc4dedc2ck.jpg_960x960.jpg','PLASMA BEVEL SERIES: X CUT SERIES',17000,NULL,'Nhật',36,'máy cắt plasma','https://i.imgur.com/ZadPL8P.png',0),(55,'https://s.alicdn.com/@sc04/kf/H0b8437525bb74f8e8d7a70ce0adad05ap.jpg_960x960.jpg','RS 18/25 LAKH',15000,NULL,'Nhật',24,'máy cắt plasma','https://i.imgur.com/kNyq1Or.png',0),(56,'https://s.alicdn.com/@sc04/kf/H7eb9b491ed1d465fac83737c7031e5b3I.jpg_960x960.jpg','OMAX 160X',12112,NULL,'Mỹ',12,'máy cắt tia nước','https://i.imgur.com/gE6O2DV.png',0),(57,'https://s.alicdn.com/@sc04/kf/H575fafcc383e47efb20af3ba51f0fc49H.jpg_960x960.jpg','OMAX 80X',11200,NULL,'TQ',12,'máy cắt tia nước','https://i.imgur.com/cK3WRdS.png',0);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-14 18:01:11
