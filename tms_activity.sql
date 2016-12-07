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
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_img` varchar(200) DEFAULT NULL,
  `a_link` varchar(200) DEFAULT NULL,
  `a_title` varchar(50) DEFAULT NULL,
  `a_del` int(11) DEFAULT '0',
  `page_p_id` int(11) NOT NULL,
  PRIMARY KEY (`a_id`),
  KEY `fk_activity_page1_idx` (`page_p_id`),
  CONSTRAINT `fk_activity_page1` FOREIGN KEY (`page_p_id`) REFERENCES `page` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',0,1),(2,'http://shopimg.weimob.com/55910475/Group/1612011408395472.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25200','和情饼干 带你扛饿带你飞',0,1),(3,'http://shopimg.weimob.com/55910475/Group/1611251516068525.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14098','冲饮饮品 早餐 你吃了吗？',0,1),(4,'http://shopimg.weimob.com/55910475/Group/1611251521203224.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14086','红酒饮品 品味质感生活',0,1),(5,'http://shopimg.weimob.com/55910475/Group/1611251522142606.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14075','牛乳饮品 开启健康生活',0,1),(6,'http://shopimg.weimob.com/55910475/Group/1611251523590887.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14113','速食产品 没啥 就是方便',0,1),(7,'http://shopimg.weimob.com/55910475/Group/1611251525294193.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14061','糖巧甜品 爱 就要把我带回家 ',0,1),(8,'http://shopimg.weimob.com/55910475/Group/1611251526366494.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=24161','洗护用品 来自大自然的呼唤',0,1),(9,'http://shopimg.weimob.com/55910475/Group/1611251527445534.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14086','饮料饮品 休闲时的好搭档',0,1),(10,'http://shopimg.weimob.com/55910475/Group/1611290942559262.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14250','营养丰富 体质肥美 口感鲜美',0,1),(11,'http://shopimg.weimob.com/55910475/Group/1612010924599164.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25201','7D芒果干 想不到的好吃',0,1),(12,'http://shopimg.weimob.com/55910475/Group/1611251543344137.png','javascript:;','日本Royce生巧克力 世界卓越口感',0,1),(13,'http://shopimg.weimob.com/55910475/Group/1611251544181963.png','javascript:;','韩国好丽友品牌专场 休闲小食 满足味蕾',0,1),(14,'http://shopimg.weimob.com/55910475/Group/1612011409052030.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25202','卡乐比麦片 好吃就是卡乐比',0,1),(15,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25199','朱蒂丝饼干 好吃不胖饼干',0,2),(16,'http://shopimg.weimob.com/55910475/Group/1612011408395472.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25200','和情饼干 带你扛饿带你飞',0,2),(17,'http://shopimg.weimob.com/55910475/Group/1611251516068525.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14098','冲饮饮品 早餐 你吃了吗？',0,2),(18,'http://shopimg.weimob.com/55910475/Group/1611251521203224.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14086','红酒饮品 品味质感生活',0,2),(19,'http://shopimg.weimob.com/55910475/Group/1611251522142606.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14075','牛乳饮品 开启健康生活',0,2),(20,'http://shopimg.weimob.com/55910475/Group/1611251523590887.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14113','速食产品 没啥 就是方便',0,2),(21,'http://shopimg.weimob.com/55910475/Group/1611251525294193.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14061','糖巧甜品 爱 就要把我带回家 ',0,2),(22,'http://shopimg.weimob.com/55910475/Group/1611251526366494.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=24161','洗护用品 来自大自然的呼唤',0,2),(23,'http://shopimg.weimob.com/55910475/Group/1611251527445534.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14086','饮料饮品 休闲时的好搭档',0,2),(24,'http://shopimg.weimob.com/55910475/Group/1611290942559262.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14250','营养丰富 体质肥美 口感鲜美',0,2),(25,'http://shopimg.weimob.com/55910475/Group/1612010924599164.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25201','7D芒果干 想不到的好吃',0,2),(26,'http://shopimg.weimob.com/55910475/Group/1611251543344137.png','javascript:;','日本Royce生巧克力 世界卓越口感',0,2),(27,'http://shopimg.weimob.com/55910475/Group/1611251544181963.png','javascript:;','韩国好丽友品牌专场 休闲小食 满足味蕾',0,2),(28,'http://shopimg.weimob.com/55910475/Group/1612011409052030.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25202','卡乐比麦片 好吃就是卡乐比',0,2),(29,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25199','朱蒂丝饼干 好吃不胖饼干',0,3),(30,'http://shopimg.weimob.com/55910475/Group/1612011408395472.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25200','和情饼干 带你扛饿带你飞',0,3),(31,'http://shopimg.weimob.com/55910475/Group/1611251516068525.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14098','冲饮饮品 早餐 你吃了吗？',0,3),(32,'http://shopimg.weimob.com/55910475/Group/1611251521203224.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14086','红酒饮品 品味质感生活',0,3),(33,'http://shopimg.weimob.com/55910475/Group/1611251522142606.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14075','牛乳饮品 开启健康生活',0,3),(34,'http://shopimg.weimob.com/55910475/Group/1611251523590887.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14113','速食产品 没啥 就是方便',0,3),(35,'http://shopimg.weimob.com/55910475/Group/1611251525294193.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14061','糖巧甜品 爱 就要把我带回家 ',0,3),(36,'http://shopimg.weimob.com/55910475/Group/1611251526366494.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=24161','洗护用品 来自大自然的呼唤',0,3),(37,'http://shopimg.weimob.com/55910475/Group/1611251527445534.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14086','饮料饮品 休闲时的好搭档',0,3),(38,'http://shopimg.weimob.com/55910475/Group/1611290942559262.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=14250','营养丰富 体质肥美 口感鲜美',0,3),(39,'http://shopimg.weimob.com/55910475/Group/1612010924599164.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25201','7D芒果干 想不到的好吃',0,3),(40,'http://shopimg.weimob.com/55910475/Group/1611251543344137.png','javascript:;','日本Royce生巧克力 世界卓越口感',0,3),(41,'http://shopimg.weimob.com/55910475/Group/1611251544181963.png','javascript:;','韩国好丽友品牌专场 休闲小食 满足味蕾',0,3),(42,'http://shopimg.weimob.com/55910475/Group/1612011409052030.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25202','卡乐比麦片 好吃就是卡乐比',0,3),(43,'http://shopimg.weimob.com/55910475/Group/1612011409052030.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify&Id=25202','卡乐比麦片 好吃就是卡乐比',0,4),(44,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',0,4),(45,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',1,4),(46,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',1,4),(47,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',1,4),(48,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',1,1),(49,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',0,6),(50,'http://shopimg.weimob.com/55910475/Group/1612011408034869.png','http://55910475.m.weimob.com/vshop/55910475/Goods/GoodsListNew1?type=GoodsClassify','朱蒂丝饼干 好吃不胖饼干',0,7);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
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
