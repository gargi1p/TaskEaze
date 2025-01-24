-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: taskease
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `priority` enum('Low','Medium','High','Urgent') NOT NULL,
  `due_date` date NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (4,40,'Hitam','High','2024-12-01','2024-12-09 23:11:24'),(15,1,'Team Work','Low','2024-12-28','2024-12-10 22:03:44'),(16,12,'Team Work','Low','2024-12-28','2024-12-10 22:03:44'),(25,51,'office work','Low','2024-12-18','2024-12-11 23:18:51'),(26,50,'office work','Low','2024-12-18','2024-12-11 23:18:51'),(27,47,'office work','Low','2024-12-18','2024-12-11 23:18:51'),(29,51,'team work','Low','2024-12-26','2024-12-11 23:21:00'),(30,50,'team work','Low','2024-12-26','2024-12-11 23:21:00'),(32,50,'study','Low','2024-12-28','2024-12-11 23:50:38'),(33,47,'study','Low','2024-12-28','2024-12-11 23:50:38'),(37,1,'working','Low','2024-12-25','2024-12-13 09:20:50'),(38,13,'working','Low','2024-12-25','2024-12-13 09:20:50'),(39,53,'working','Low','2024-12-25','2024-12-13 09:20:50'),(40,50,'office work','Low','2024-12-28','2024-12-13 09:52:33'),(42,47,'office work','Low','2024-12-28','2024-12-13 09:52:33'),(43,53,'office work','Low','2024-12-28','2024-12-13 09:52:33'),(47,1,'team work','Medium','2024-12-14','2024-12-13 10:34:38'),(48,53,'team work','Medium','2024-12-14','2024-12-13 10:34:38'),(50,58,'studt','Low','2024-12-27','2024-12-14 15:45:03');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `priority` enum('Low','Medium','High','Urgent') NOT NULL,
  `repeat_option` enum('None','Daily','Weekly','Monthly') DEFAULT 'None',
  `notes` text,
  `collaborators` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (55,1,'Team Work','2024-12-28','Low','None','','Hitam@gmail.com,sunaina@gmail.com,priti@gmail.com,gargisingh@gmail.com','2024-12-10 16:33:44'),(56,12,'Team Work','2024-12-28','Low','None','','Hitam@gmail.com,sunaina@gmail.com,priti@gmail.com,gargisingh@gmail.com','2024-12-10 16:33:44'),(63,51,'office','2024-12-20','Low','None','',NULL,'2024-12-11 17:26:20'),(64,51,'office','2024-12-25','Low','None','',NULL,'2024-12-11 17:46:24'),(65,51,'office work','2024-12-18','Low','None','','tanishka@gmail.com,omprakash@gmail.com,yoyo@gmail.com,aman@gmail.com','2024-12-11 17:48:51'),(66,50,'office work','2024-12-18','Low','None','','tanishka@gmail.com,omprakash@gmail.com,yoyo@gmail.com,aman@gmail.com','2024-12-11 17:48:51'),(67,47,'office work','2024-12-18','Low','None','','tanishka@gmail.com,omprakash@gmail.com,yoyo@gmail.com,aman@gmail.com','2024-12-11 17:48:51'),(69,51,'team work','2024-12-26','Low','None','','omprakash@gmail.com,aman@gmail.com','2024-12-11 17:51:00'),(70,50,'team work','2024-12-26','Low','None','','omprakash@gmail.com,aman@gmail.com','2024-12-11 17:51:00'),(72,50,'study','2024-12-28','Low','None','','yoyo@gmail.com,omprakash@gmail.com,tanishka@gmail.com,ayushisingh@gmail.com','2024-12-11 18:20:37'),(73,47,'study','2024-12-28','Low','None','','yoyo@gmail.com,omprakash@gmail.com,tanishka@gmail.com,ayushisingh@gmail.com','2024-12-11 18:20:37'),(77,13,'working','2024-12-25','Low','None','','Hitam@gmail.com,yoyo@gmail.com,priti12@gmail.com','2024-12-13 03:50:49'),(78,1,'working','2024-12-25','Low','None','','Hitam@gmail.com,yoyo@gmail.com,priti12@gmail.com','2024-12-13 03:50:49'),(79,53,'working','2024-12-25','Low','None','','Hitam@gmail.com,yoyo@gmail.com,priti12@gmail.com','2024-12-13 03:50:49'),(81,50,'office work','2024-12-28','Low','Daily','to be completed on daily basis','yoyo@gmail.com,omprakash@gmail.com,tanishka@gmail.com,sajana@gmail.com','2024-12-13 04:22:33'),(82,47,'office work','2024-12-28','Low','Daily','to be completed on daily basis','yoyo@gmail.com,omprakash@gmail.com,tanishka@gmail.com,sajana@gmail.com','2024-12-13 04:22:33'),(83,53,'office work','2024-12-28','Low','Daily','to be completed on daily basis','yoyo@gmail.com,omprakash@gmail.com,tanishka@gmail.com,sajana@gmail.com','2024-12-13 04:22:33'),(86,58,'team work','2024-12-14','Medium','Weekly','','yoyo@gmail.com,gargi@gmail.com,hitam@gmail.com,ayushisingh@gmail.com','2024-12-13 05:04:37'),(87,1,'team work','2024-12-14','Medium','Weekly','','yoyo@gmail.com,gargi@gmail.com,hitam@gmail.com,ayushisingh@gmail.com','2024-12-13 05:04:37'),(88,53,'team work','2024-12-14','Medium','Weekly','','yoyo@gmail.com,gargi@gmail.com,hitam@gmail.com,ayushisingh@gmail.com','2024-12-13 05:04:37'),(89,58,'Study','2024-12-21','High','Weekly','OS theory for MSE',NULL,'2024-12-13 19:00:41'),(90,58,'studt','2024-12-27','Low','Daily','',NULL,'2024-12-14 10:15:03');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_tasks` int DEFAULT '0',
  `non_completed_tasks` int DEFAULT '0',
  `collabrated_task` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hitam','Hitam@gmail.com','$2a$10$mB66iLZpVBEdBcZhx.WdCe7Wgd1efHdmEN6qTDyF1PQ3SdMqy4M7O','2024-11-23 13:24:21',0,0,0),(2,'kavi','kavi@gmail.com','$2b$10$E8eKa.rwbk3n7Z.IV.ixMOU0Q1tIwV1XZyGfxzJho4J4Dk2B1qqAS','2024-11-23 14:16:25',0,0,0),(4,'gargi1','gargi1p@gmail.com','$2b$10$8fiPSPcdPkF0VtvDzx904O7pTRJQqAZcTHqUZ/QQGBmBiJagWwahW','2024-11-23 14:25:37',0,0,0),(11,'SUNU12','sunaina12@gmail.com','$2b$10$jVKKoZ5KmuzekgzvjxPA2.HVHlbwET2mE6BcjPMl3dfgUkozsM02e','2024-11-23 16:16:42',0,0,0),(12,'priti','priti@gmail.com','$2a$10$K8kHl6akcjZQmBwJfm5QkuMovL82AYe1RuGhrwd3pDXrrz8OYyBmS','2024-11-23 16:17:54',0,6,0),(13,'priti12','priti12@gmail.com','$2b$10$22e/t32NskhtZUinkzw8rO5cukpXxNI/nQSt4yppLNRCU7wwiTS8G','2024-11-23 16:25:25',0,0,1),(14,'priiti','priiti@gmail.com','$2b$10$fB/kmgcxeosWMzYIoDx/ieLEflXqnTPgRmL3nFHY5W0nyOq1LKuCq','2024-11-23 18:06:56',0,0,0),(15,'sanya','sanya@gmail.com','$2a$10$uEsTgxMTuTMucOO/3o9nRubuWCE4qfSI.NaaYcwYc46YMZUc8fSzK','2024-11-23 20:39:32',0,0,0),(16,'Hitam19','hitam19@gmail.com','$2a$10$zz.Z1V5nty3gBOpa4Ev/7eU/XEpNcCOM2SU1gBJPIZgzXLhMY7IPS','2024-11-24 13:06:26',0,0,0),(17,'Hitam19','hitam1919@gmail.com','$2a$10$5mLrhF3KLq9v.OAk98mTY.cEcPgF/voGzezwayCW2e9erGVCxT87y','2024-11-24 13:08:00',0,0,0),(18,'Hitam19','hitam18@gmail.com','$2a$10$RrTmEhhALCebDg/xLCvvTu3D4abYdmHpKnqRWOWj70pO6mgI0kiSC','2024-11-24 13:09:30',0,0,0),(19,'hitam','hitam181@gmail.com','$2a$10$LLnM8aLFaA4MCvzhfjQGTeV.GLHfLG48OPH.YkvSAUwwP2YiBLVkC','2024-11-24 13:10:21',0,1,0),(20,'hitam','hitam1818@gmail.com','$2a$10$qXVXFvwfgY0NTLd.3eL/COhgzm1GPGws/PS34Lwq5R5L91CjWf/Dq','2024-11-24 13:11:49',0,0,0),(21,'anjula','anjula@gmail.com','$2a$10$SytkrLpokZrfw96MHdACbuNaSrY0ie493emQ23NGiWA5jWnNNYu/a','2024-11-24 15:33:06',0,0,0),(22,'anjula','anjula1@gmail.com','$2a$10$o6auz/RpidEffyPmTarKRuFnhEaehB0gIsYYSGolXTOmNoq1DUy6K','2024-11-24 15:35:41',0,0,0),(23,'anjula','anjula01@gmail.com','$2a$10$F6/1/TwHKtQpToX/x6gYxOHOEhH7CTyaSRmCHG3ql.GdbAFbGTWwC','2024-11-24 15:36:15',0,0,0),(24,'anjula','anjula001@gmail.com','$2a$10$xa5K.5Vfm0ydxhPnZcXgae66KzdU83PL0XuUrG9S9W7dh/pIJiwi2','2024-11-24 15:36:54',0,0,0),(25,'anjula','anjula0001@gmail.com','$2a$10$18fFuksD1zTBBf8/FgM2KubOCuysUoBudmDGrtRuAJfReBXIz1uQ6','2024-11-24 15:38:42',0,0,0),(26,'ayyu','ayyu@gmail.com','$2a$10$ZQ/6bFs2Mmbq9tHN.GfGr.Vg81k7nqhZMNMT4pc5RdMqGUrlmEUMy','2024-11-24 17:33:39',0,0,0),(27,'gaurav','gourav.2426mca196@kiet.edu','$2a$10$3wlIiL4FQgZg2bN.jBGo0eVVpr.7/CfjHJF8J8cw3TFEAnUGmMkry','2024-11-27 10:55:47',0,0,0),(28,'gaurav','gaurav.2624@gmail.com','$2a$10$aKbFsDscQm2h1wyFKUZlgOWUH99xW5A8rWY2QuhGt.X2zzfy9dUFe','2024-11-27 11:00:27',0,0,0),(29,'gaurav','gaurav@gmail.com','$2a$10$S0DMzVdOVIZxXOeGaxZWSOhZWyIr.KC5VbEZ1fUlEgG/1WhP.MJCq','2024-11-27 11:01:42',0,0,0),(30,'gaurav','gauravsingh@gmail.com','$2a$10$U48th8HsgGrMIPzmrPtnX.gZZKXj0D3omDF8BLmiQ6vS9XOa9kYuu','2024-11-27 11:19:22',0,0,0),(31,'gaurv','gaurv@gmail.com','$2a$10$O6/tZZGbJckhEA8X37HH4euQBSw5GaNpumvKctrRUZih49MGdBxf2','2024-11-27 11:22:43',0,0,0),(32,'shristhi','shrishthi@gmail.com','$2a$10$pNF6yKtFP58r7jCd9kejbOnKLvuve11NornZX2cy/O9wnkr2Nxq9a','2024-11-27 15:35:51',0,0,0),(33,'gargi_00','grgii@gmail.com','$2a$10$FAKBeWQ5DzO8S6/7OtGIJempWbH8uhQwLOoYBfbM6nEWTBvfEsoJq','2024-11-27 15:45:10',0,0,0),(34,'gargi','gargi2@gmail.com','$2a$10$llpLcAP47xpJFLLYxcgrb.jakBPhntDeqTrfr9QypLBmvXp8cfB5C','2024-11-27 15:48:57',0,0,0),(35,'nammu','nammu@gmail.com','$2a$10$UPmQmzcfLdXekbAkgWJWweCkPmrqrL/Zf.sWNLgl7TaBT9VTCAPsG','2024-11-27 16:00:09',0,0,0),(36,'garima','garima@gmial.com','$2a$10$6dA50ALU8JpsC2WRwdY9cuTBWoL2MWCzF/OgyRgI0mlxFdj7SYUxe','2024-11-27 18:59:17',0,0,0),(37,'goli','goli@gmail.com','$2a$10$D3vyyXttGkQEgKhI4qklWODcdgwNr5oU.wCUJmTCZehHesNUK8dbe','2024-11-27 19:11:24',0,0,0),(39,'yash','yash@gmail.com','$2a$10$mxH3NlMMN7q4bguw9FHnBufA8Xun/N0Ea0ZKFcRam4e59.CEBXbHO','2024-11-27 19:25:16',0,0,0),(40,'isha','isha@gnail.com','$2a$10$HAloV3eCmkJfOOuxNDP1auNxJRV/EU9u/j1hh9OQLlXrTJB0L2.pm','2024-11-27 19:27:43',0,1,0),(41,'gbu','gbu@gmail.com','$2a$10$kWoQr9gjU593JZbBdHB5xOtEf49JphYovCW0RbSKOw8gQwTb.onfy','2024-11-28 05:43:32',0,0,0),(42,'himansh','himansh@gmail.com','$2a$10$6B9nHho5JJIECjltEHirfOCQwVbfCK/KN0UKTHDA7ugDhPraMGX2O','2024-11-28 05:44:44',0,0,0),(43,'arun','arun@gmail.com','$2a$10$EQCSIve5as.CP5h2QiP3bes/QmW1JinKjOJf/fUwJrpUvtCNxUVA2','2024-11-28 13:53:49',0,0,0),(44,'vnsh','vnsh@gmail.com','$2a$10$0XfvSzmmDMc5TMImlnYJBOSeE4fpsBvpj/SuCytKDO.r0x6720Qvi','2024-11-28 13:57:56',0,1,0),(47,'tanishka','tanishka@gmail.com','$2a$10$/lq3iDwEYhJcZI3wlQu.HuygXZGLqXeiQeJHK5hbED6Xai1EZySO6','2024-11-28 14:33:11',0,1,0),(50,'omprakash','omprakash@gmail.com','$2a$10$TX1Rsbuk9Y.omWkjY/JJEu0KnIXe5OG/qIckFAjelA5Qkbup4XD5K','2024-11-29 08:28:00',0,0,0),(51,'aman','aman@gmail.com','$2a$10$l279aD3Nrauzqxepe3vNQu8DmIVPuIx8mHIQrcNFvDPjStx.Z8ZG2','2024-11-29 08:41:27',0,1,0),(53,'yoyo','yoyo@gmail.com','$2a$10$I7l015ll9m8A7sgVQvFjuO9u8urDYG0svBedTEzhphA1e6THizxBm','2024-12-08 17:01:37',3,4,0),(58,'Gargi','gargi@gmail.com','$2a$10$ehkHukXYr0GyfG/jnmXEQeeavzGqQR2FKNOr.gf/KulmdO/eHk1Ba','2024-12-11 15:07:59',2,0,0);
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

-- Dump completed on 2024-12-15 20:12:25
