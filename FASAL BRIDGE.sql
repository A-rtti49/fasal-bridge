create database fasal_bridge;
use fasal_bridge;
create table Buyer(
Name varchar(50),
user_name varchar(60) unique not null,
password int primary key,
location varchar(100));
drop table if exists Buyer;

create table seller(
Name varchar(50),
user_name varchar(60) unique not null,
password int primary key,
farmer_id int not null,
location varchar(100));

create table crops(
crop_id int not null,
Name varchar(50),
quantity int);

show tables;