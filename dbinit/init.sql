CREATE DATABASE IF NOT EXISTS tallerapi;
USE tallerapi;
DROP TABLE IF EXISTS patients;
CREATE TABLE patients(
id BIGINT unsigned NOT NULL auto_increment,
  firts_name VARCHAR(300) default NULL,
  last_name VARCHAR(300) default NULL,
  email VARCHAR(300) default NULL,
  address VARCHAR(300) default NULL,
  phone INT  default NULL,
  status VARCHAR(300) default NULL,
  PRIMARY KEY(id),
  constraint UQ_Patients_Email unique(email)
)auto_increment = 1;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_role` int NOT NULL DEFAULT 1,
  `status` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DELIMITER //
CREATE PROCEDURE  patientsSelProc()
BEGIN 
select id, firts_name, last_name, email, address, phone, status from patients;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  patientsSelOneProc(id_profile int )
BEGIN 
select id, firts_name, last_name, email, address, phone, status from patients where id = id_profile ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE patientsInsProc (fist_n varchar(300), last_n varchar(300), emailPatients varchar(300), addressPatient varchar(300), phonePatient int, statusPatient varchar(300) )
BEGIN 
INSERT INTO patients (firts_name, last_name, email, address, phone, status)
 VALUES(fist_n, last_n, emailPatients, addressPatient, phonePatient, statusPatient) ;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  patientsUpProc(id_profile int, fist_name varchar(300), last_name varchar(300), email varchar(300), address varchar(300), phone int, status varchar(300) )
BEGIN 
UPDATE patients set firts_name = fist_name, last_name = last_name, email = email, address = address, phone = phone, status = status where id = id_profile;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE  patientsDelProc(id_profile int)
BEGIN 
DELETE FROM patients where id = id_profile;
END //
DELIMITER ;