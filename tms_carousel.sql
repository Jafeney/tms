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
-- Table structure for table `carousel`
--

DROP TABLE IF EXISTS `carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carousel` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_img` varchar(200) DEFAULT NULL,
  `c_link` varchar(200) DEFAULT NULL,
  `page_p_id` int(11) NOT NULL,
  `c_del` int(11) DEFAULT '0',
  PRIMARY KEY (`c_id`),
  KEY `fk_carousel_page1_idx` (`page_p_id`),
  CONSTRAINT `fk_carousel_page1` FOREIGN KEY (`page_p_id`) REFERENCES `page` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carousel`
--

LOCK TABLES `carousel` WRITE;
/*!40000 ALTER TABLE `carousel` DISABLE KEYS */;
INSERT INTO `carousel` VALUES (1,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify',1,0),(2,'http://shopimg.weimob.com/55910475/Group/1612010941583966.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14250',1,0),(3,'http://shopimg.weimob.com/55910475/Group/1612020903564222.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14050',1,0),(4,'http://shopimg.weimob.com/55910475/Group/1611301119204903.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14254',2,0),(5,'http://shopimg.weimob.com/55910475/Group/1612010941583966.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14250',2,0),(6,'http://shopimg.weimob.com/55910475/Group/1612011358027950.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14050',2,0),(7,'http://shopimg.weimob.com/55910475/Group/1611301119204903.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14254',3,0),(8,'http://shopimg.weimob.com/55910475/Group/1612010941583966.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14250',3,0),(9,'http://shopimg.weimob.com/55910475/Group/1612011358027950.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14050',3,0),(10,'http://shopimg.weimob.com/55910475/Group/1612011358027950.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14050',4,0),(11,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify',4,0),(12,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify',6,0),(13,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify',7,0);
/*!40000 ALTER TABLE `carousel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-07 10:50:37
