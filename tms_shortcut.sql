-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: localhost    Database: tms
-- ------------------------------------------------------
-- Server version	5.7.11

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
-- Table structure for table `shortcut`
--

DROP TABLE IF EXISTS `shortcut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shortcut` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(45) DEFAULT NULL,
  `s_color` varchar(45) DEFAULT NULL,
  `s_link` varchar(500) DEFAULT NULL,
  `s_icon` varchar(45) DEFAULT NULL,
  `page_p_id` int(11) DEFAULT NULL,
  `s_del` int(11) DEFAULT '0',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shortcut`
--

LOCK TABLES `shortcut` WRITE;
/*!40000 ALTER TABLE `shortcut` DISABLE KEYS */;
INSERT INTO `shortcut` VALUES (1,'精选','#dea32c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','thumbs-up',1,0),(2,'心荐','#f15b6c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483724&idx=1&sn=1038830ec7b9a77e9229a854cab4a41f&chksm=96dd7b50a1aaf246b22dd6a1aa0e9f6cc3272a4024cf4a9f13b6b9c966d9e529731cb6002071&mpshare=1&scene=1&srcid=1202TUfE1fcbX4EVKxK0MOxS#rd','heart-empty',1,0),(3,'集采','#78a355','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483725&idx=1&sn=743c6f680596cf8e17d5f5f46283030e&chksm=96dd7b51a1aaf247df11fef6d53ca3ea8d8694cb809fa64d52a759cef8aa48344b9576d2ec37&mpshare=1&scene=1&srcid=1202RqAdcgI2K0y0l9cjuwm2#rd','globe',1,0),(4,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483739&idx=1&sn=fb65786d4d18e29f47084ebc5d312bb1&chksm=96dd7b47a1aaf251b04ad0143e5dbc7bf8d1783e5dab21478bbe1350af1a6c182c20156de35f&mpshare=1&scene=1&srcid=12029job7TzjBqdDbqZPjWYq#rd','truck',1,0),(5,'精选','#dea32c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483723&idx=1&sn=2cf8b0178a2da1b0a30217f529edabde&chksm=96dd7b57a1aaf2417319c5c77a37e81f44f576808ffb384d5f64654040a2c10f0791365df731&mpshare=1&scene=1&srcid=1202p0NGxwY6ywKwgTWSJVBx#rd','thumbs-up',2,0),(6,'心荐','#f15b6c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483724&idx=1&sn=1038830ec7b9a77e9229a854cab4a41f&chksm=96dd7b50a1aaf246b22dd6a1aa0e9f6cc3272a4024cf4a9f13b6b9c966d9e529731cb6002071&mpshare=1&scene=1&srcid=1202TUfE1fcbX4EVKxK0MOxS#rd','heart-empty',2,0),(7,'集采','#78a355','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483725&idx=1&sn=743c6f680596cf8e17d5f5f46283030e&chksm=96dd7b51a1aaf247df11fef6d53ca3ea8d8694cb809fa64d52a759cef8aa48344b9576d2ec37&mpshare=1&scene=1&srcid=1202RqAdcgI2K0y0l9cjuwm2#rd','globe',2,0),(8,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483739&idx=1&sn=fb65786d4d18e29f47084ebc5d312bb1&chksm=96dd7b47a1aaf251b04ad0143e5dbc7bf8d1783e5dab21478bbe1350af1a6c182c20156de35f&mpshare=1&scene=1&srcid=12029job7TzjBqdDbqZPjWYq#rd','truck',2,0),(9,'精选','#dea32c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483723&idx=1&sn=2cf8b0178a2da1b0a30217f529edabde&chksm=96dd7b57a1aaf2417319c5c77a37e81f44f576808ffb384d5f64654040a2c10f0791365df731&mpshare=1&scene=1&srcid=1202p0NGxwY6ywKwgTWSJVBx#rd','thumbs-up',3,0),(10,'心荐','#f15b6c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483724&idx=1&sn=1038830ec7b9a77e9229a854cab4a41f&chksm=96dd7b50a1aaf246b22dd6a1aa0e9f6cc3272a4024cf4a9f13b6b9c966d9e529731cb6002071&mpshare=1&scene=1&srcid=1202TUfE1fcbX4EVKxK0MOxS#rd','heart-empty',3,0),(11,'集采','#78a355','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483725&idx=1&sn=743c6f680596cf8e17d5f5f46283030e&chksm=96dd7b51a1aaf247df11fef6d53ca3ea8d8694cb809fa64d52a759cef8aa48344b9576d2ec37&mpshare=1&scene=1&srcid=1202RqAdcgI2K0y0l9cjuwm2#rd','globe',3,0),(12,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483739&idx=1&sn=fb65786d4d18e29f47084ebc5d312bb1&chksm=96dd7b47a1aaf251b04ad0143e5dbc7bf8d1783e5dab21478bbe1350af1a6c182c20156de35f&mpshare=1&scene=1&srcid=12029job7TzjBqdDbqZPjWYq#rd','truck',3,1),(13,'精选','#dea32c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483723&idx=1&sn=2cf8b0178a2da1b0a30217f529edabde&chksm=96dd7b57a1aaf2417319c5c77a37e81f44f576808ffb384d5f64654040a2c10f0791365df731&mpshare=1&scene=1&srcid=1202p0NGxwY6ywKwgTWSJVBx#rd','thumbs-up',4,0),(14,'心荐','#f15b6c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483724&idx=1&sn=1038830ec7b9a77e9229a854cab4a41f&chksm=96dd7b50a1aaf246b22dd6a1aa0e9f6cc3272a4024cf4a9f13b6b9c966d9e529731cb6002071&mpshare=1&scene=1&srcid=1202TUfE1fcbX4EVKxK0MOxS#rd','heart-empty',4,0),(15,'集采','#78a355','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483725&idx=1&sn=743c6f680596cf8e17d5f5f46283030e&chksm=96dd7b51a1aaf247df11fef6d53ca3ea8d8694cb809fa64d52a759cef8aa48344b9576d2ec37&mpshare=1&scene=1&srcid=1202RqAdcgI2K0y0l9cjuwm2#rd','globe',4,0),(16,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==&mid=2247483739&idx=1&sn=fb65786d4d18e29f47084ebc5d312bb1&chksm=96dd7b47a1aaf251b04ad0143e5dbc7bf8d1783e5dab21478bbe1350af1a6c182c20156de35f&mpshare=1&scene=1&srcid=12029job7TzjBqdDbqZPjWYq#rd','truck',4,0),(17,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','truck',3,0),(18,'精选','#dea32c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','thumbs-up',6,0),(19,'心荐','#f15b6c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','heart-empty',6,0),(20,'集采','#78a355','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','globe',6,0),(21,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','truck',6,1),(22,'快送','#33a3dc','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','truck',6,0),(23,'精选','#dea32c','http://mp.weixin.qq.com/s?__biz=MzIwMjYwMDMwNw==','thumbs-up',7,0);
/*!40000 ALTER TABLE `shortcut` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-07 10:50:38
