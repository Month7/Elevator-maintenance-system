/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : graduction

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-25 19:58:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `firstletter` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('马化腾,马云,李彦宏', '18000351426,18000351425', 'M,M,L', '18000351426');

-- ----------------------------
-- Table structure for elevator
-- ----------------------------
DROP TABLE IF EXISTS `elevator`;
CREATE TABLE `elevator` (
  `status` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `statement` varchar(255) DEFAULT NULL,
  `xiafatime` bigint(20) DEFAULT NULL,
  `baoyangtime` bigint(20) DEFAULT NULL,
  `pingjiatime` bigint(20) DEFAULT NULL,
  `score1` int(11) DEFAULT NULL COMMENT '评分',
  `score2` int(11) DEFAULT NULL,
  `pingjia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of elevator
-- ----------------------------
INSERT INTO `elevator` VALUES ('4', '121', '121', '测试', '1556097448000', null, null, null, null, null);
INSERT INTO `elevator` VALUES ('0', '1508030301', '时光澔韵4-1', '请尽快派人来修！', '1556093286', '1556093286', '1556093286', null, null, null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `avat_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('18000351426', '123456', 'ce5fsi69xi', '0', null, null);
INSERT INTO `user` VALUES ('18000351426', '1234', 'ce5fsi69xi', '1', 'null', null);
INSERT INTO `user` VALUES ('18000351426', '1234', 'ce5fsi69xi', '1', 'null', null);
INSERT INTO `user` VALUES ('18000351426', '1234', 'ce5fsi69xi', '1', 'null', null);
INSERT INTO `user` VALUES ('18000351426', '1234', 'ce5fsi69xi', '1', 'null', null);
INSERT INTO `user` VALUES ('13832977587', '123', 'rifhzsd24pn', '1', 'null', null);
