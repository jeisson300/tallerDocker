-- Adminer 4.8.1 MySQL 5.5.61-0ubuntu0.14.04.1-log dump
CREATE DATABASE IF NOT EXISTS user_profile;
USE user_profile;

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `first_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `public_info` tinyint(1) DEFAULT NULL,
  `postal_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biography` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `links` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 2023-10-21 23:13:58
