# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.44)
# Database: micro_adm
# Generation Time: 2024-05-08 01:22:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table adm_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `adm_user`;

CREATE TABLE `adm_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(300) NOT NULL DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `adm_user` WRITE;
/*!40000 ALTER TABLE `adm_user` DISABLE KEYS */;

INSERT INTO `adm_user` (`id`, `username`, `password`)
VALUES
	(1,'admin','25d55ad283aa400af464c76d713c07ad');

/*!40000 ALTER TABLE `adm_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table page_route
# ------------------------------------------------------------

DROP TABLE IF EXISTS `page_route`;

CREATE TABLE `page_route` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `route_name` varchar(30) NOT NULL DEFAULT '' COMMENT '名称',
  `path` varchar(300) NOT NULL DEFAULT '' COMMENT '路由地址',
  `tem_json` text NOT NULL COMMENT '模版json',
  `script_json` text NOT NULL COMMENT 'js ',
  `page_html` text COMMENT '页面',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1 未生成 2 生成中 3 完成 4 草稿',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `page_route` WRITE;
/*!40000 ALTER TABLE `page_route` DISABLE KEYS */;

INSERT INTO `page_route` (`id`, `project_id`, `route_name`, `path`, `tem_json`, `script_json`, `page_html`, `status`, `create_time`, `update_time`)
VALUES
	(1,1,'路由测试','/hba/list','{\"template\":{\"lc_id\":\"root\",\"__children\":[{\"div\":{\"class\":\"container\",\"style\":\"min-height: 100%;\",\"lc_id\":\"container\",\"__children\":[{\"el-button\":{\"lc-mark\":\"\",\"type\":\"primary\",\"@click\":\"btnClick\",\"lc_id\":\"snu735e6p3\",\"__children\":[],\"__text__\":\"主要按钮\"}}]}}]}}','\n{\n  data() {\n    return {\n    };\n  },\n  methods: {\n  },\n}\n','<template> \n  <div class=\"container\" style=\"min-height: 100%;\">\n      <el-button type=\"primary\" @click=\"btnClick\">主要按钮</el-button>\n  </div>\n \n</template>\n\n<script>\nexport default {\n  props: [],\n  components: {},\n  data() {\n    return {}\n  },\n  watch: {},\n  computed: {},\n  beforeCreate() {},\n  created() {},\n  beforeMount() {},\n  mounted() {},\n  beforeUpdate() {},\n  updated() {},\n  destroyed() {},\n  methods: {\n    request() {},\n    btnClick() {},\n  },\n  fillter: {},\n}\n\n</script>\n\n<style scoped>\n.container{}\n\n</style>\n  ',3,'2024-05-07 13:22:37','2024-05-07 13:22:37'),
	(2,1,'测试3','/vsa/index','{\"template\":{\"lc_id\":\"root\",\"__children\":[{\"div\":{\"class\":\"container\",\"style\":\"min-height: 100%;\",\"lc_id\":\"container\",\"__children\":[{\"el-button\":{\"lc-mark\":\"\",\"type\":\"primary\",\"@click\":\"btnClick\",\"lc_id\":\"g1bjxrmbvo\",\"__children\":[],\"__text__\":\"主要按钮\"}},{\"el-button\":{\"lc-mark\":\"\",\"lc_id\":\"i8iatt4v7d\",\"__children\":[],\"__text__\":\"默认按钮\"}}]}}]}}','\n{\n  data() {\n    return {\n    };\n  },\n  methods: {\n  },\n}\n','<template> \n  <div class=\"container\" style=\"min-height: 100%;\">\n      <el-button type=\"primary\" @click=\"btnClick\">主要按钮</el-button>\n      <el-button>默认按钮</el-button>\n  </div>\n \n</template>\n\n<script>\nexport default {\n  props: [],\n  components: {},\n  data() {\n    return {}\n  },\n  watch: {},\n  computed: {},\n  beforeCreate() {},\n  created() {},\n  beforeMount() {},\n  mounted() {},\n  beforeUpdate() {},\n  updated() {},\n  destroyed() {},\n  methods: {\n    request() {},\n    btnClick() {},\n  },\n  fillter: {},\n}\n\n</script>\n\n<style scoped>\n.container{}\n\n</style>\n  ',3,'2024-05-07 13:23:50','2024-05-07 14:14:58');

/*!40000 ALTER TABLE `page_route` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(2) NOT NULL COMMENT '1 pc 2 mobile',
  `code` varchar(3) NOT NULL DEFAULT '' COMMENT '三字码',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '项目名称',
  `desc` varchar(300) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '1 禁用 2 启用 3 发布中',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;

INSERT INTO `project` (`id`, `type`, `code`, `name`, `desc`, `status`, `create_time`, `update_time`)
VALUES
	(1,1,'cha','页面生成','PC 端低代码平台',2,'2024-05-03 09:08:12','2024-05-03 09:08:12');

/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
