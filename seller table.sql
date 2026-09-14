
use fasal_bridge;
create table seller (
name varchar(50),
user_name varchar(60) unique not null,
password int primary key,
farmer_id int not null,
location varchar(100));


