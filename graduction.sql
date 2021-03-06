/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : graduction

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-05-09 18:55:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `name` varchar(255) DEFAULT '',
  `phone` varchar(255) DEFAULT '',
  `firstletter` varchar(255) DEFAULT '',
  `username` varchar(255) NOT NULL DEFAULT ' '
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('马化腾,马云,雷军', '13832977679,13832977587,18000351425', 'M,M,L', '18000351426');
INSERT INTO `address` VALUES ('系统管理员', '18000351426', 'X', '13832977679');
INSERT INTO `address` VALUES ('系统管理员,尹铮', '18000351426,18000351426', 'X,Y', '13832977587');

-- ----------------------------
-- Table structure for elevator
-- ----------------------------
DROP TABLE IF EXISTS `elevator`;
CREATE TABLE `elevator` (
  `status` varchar(255) DEFAULT NULL COMMENT '0 保养完成-未评价 1保养完成-已评价 2 待保养 3保养中 4超期 5紧急',
  `code` int(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `statement` varchar(255) DEFAULT NULL,
  `xiafatime` int(20) DEFAULT NULL,
  `baoyangtime` int(20) DEFAULT NULL,
  `pingjiatime` int(20) DEFAULT NULL,
  `score1` smallint(11) DEFAULT NULL COMMENT '评分',
  `score2` smallint(11) DEFAULT NULL,
  `pingjia` varchar(255) DEFAULT NULL,
  `headman` varchar(255) DEFAULT NULL COMMENT '负责人',
  `wanchengtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of elevator
-- ----------------------------
INSERT INTO `elevator` VALUES ('3', '123', '123', 'status = 3', '1556425917', null, null, null, null, null, '18000351426', null);
INSERT INTO `elevator` VALUES ('5', '12222', '12222', '紧急任务测试', '1556452848', null, null, null, null, null, null, null);
INSERT INTO `elevator` VALUES ('2', '12345', '123', 'status = 4', '1556426012', null, null, null, null, null, null, null);
INSERT INTO `elevator` VALUES ('1', '12345678', '12345678', '急修测试', '1556452226', null, null, null, null, null, null, null);
INSERT INTO `elevator` VALUES ('1', '1508030301', '时光澔韵4-1', 'status = 1', '1556093286', '1556093286', '1556093286', '4', '2', '', null, null);
INSERT INTO `elevator` VALUES ('0', '1508030302', '时光澔韵4-1', 'status = 0', '1556093286', '1556093286', null, null, null, null, '18000351426', null);

-- ----------------------------
-- Table structure for groupmsg
-- ----------------------------
DROP TABLE IF EXISTS `groupmsg`;
CREATE TABLE `groupmsg` (
  `username` varchar(255) DEFAULT NULL,
  `myname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of groupmsg
-- ----------------------------

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `content` varchar(255) DEFAULT NULL,
  `receiveId` varchar(255) DEFAULT NULL,
  `sendId` varchar(255) DEFAULT NULL,
  `s_time` varchar(255) DEFAULT NULL,
  `sendnickname` varchar(255) DEFAULT NULL,
  `receivename` varchar(255) DEFAULT NULL,
  `send_avat` varchar(255) DEFAULT NULL,
  `receive_avat` varchar(255) DEFAULT NULL,
  `avat_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('马云发给尹铮的测试消息1', '18000351426', '13832977587', '1557395607000', null, null, null, null, 'http://140.143.34.162:3000/2.jpg', '马云');
INSERT INTO `message` VALUES ('测试消息2', '18000351426', '13832977587', '1557395613000', null, null, null, null, 'http://140.143.34.162:3000/2.jpg', '马云');
INSERT INTO `message` VALUES ('测试消息3', '18000351426', '13832977587', '1557395619000', null, null, null, null, 'http://140.143.34.162:3000/2.jpg', '马云');
INSERT INTO `message` VALUES ('马云你好', '13832977587', '18000351426', '1557397500000', null, null, null, null, 'undefined', 'undefined');
INSERT INTO `message` VALUES ('你好', '13832977587', '18000351426', '1557399254000', null, null, null, null, 'http://140.143.34.162:3000/2.jpg', 'Month');

-- ----------------------------
-- Table structure for message_13832977678
-- ----------------------------
DROP TABLE IF EXISTS `message_13832977678`;
CREATE TABLE `message_13832977678` (
  `content` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `sendname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message_13832977678
-- ----------------------------

-- ----------------------------
-- Table structure for message_18000351425
-- ----------------------------
DROP TABLE IF EXISTS `message_18000351425`;
CREATE TABLE `message_18000351425` (
  `content` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `sendname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message_18000351425
-- ----------------------------

-- ----------------------------
-- Table structure for message_18000351426
-- ----------------------------
DROP TABLE IF EXISTS `message_18000351426`;
CREATE TABLE `message_18000351426` (
  `username` varchar(255) DEFAULT NULL,
  `sendname` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message_18000351426
-- ----------------------------
INSERT INTO `message_18000351426` VALUES ('18000351426', '13832977587', '1,2,3,究极测试');
INSERT INTO `message_18000351426` VALUES ('18000351426', '13832977586', '13832977586,测试');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `time` varchar(255) DEFAULT NULL COMMENT '发布时间',
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `avat_url` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13832977587', '123456', 'q589315lqs', '1', 'http://140.143.34.162:3000/2.jpg', '马云', '2587423053@qq.com');
INSERT INTO `user` VALUES ('13832977679', '123456', 'toot0l0j55i', '0', 'http://140.143.34.162:3000/2.jpg', '马化腾', '2587423053@qq.com');
INSERT INTO `user` VALUES ('18000351424', '123456', 'rlzgupfhdfk', '0', 'http://140.143.34.162:3000/2.jpg', '张一鸣', '2587423053@qq.com');
INSERT INTO `user` VALUES ('18000351425', '123456', '8va15ivmzyu', '0', '../../static/头像.jpg', '雷军', '2587423053@qq.com');
INSERT INTO `user` VALUES ('18000351426', '123456', 'qeozofm2db', '0', 'http://140.143.34.162:3000/2.jpg', 'Month', '2587423053@qq.com');
