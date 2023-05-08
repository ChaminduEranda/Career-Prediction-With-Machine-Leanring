CREATE DATABASE finalproject;

USE finalproject;

CREATE TABLE accounts (
	id int(11) NOT NULL auto_increment,
    username varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(100) NOT NULL,
    primary key(id)
);

select * from accounts;