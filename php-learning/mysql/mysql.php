<?php

    //http://dev.mysql.com/doc/refman/5.0/en/set-password.html - про задание паролей;
    //вход через командную строку: mysql -u root -p
    //show databases
    //show tables
    // CREATE TABLE users(
    //  id INT AUTO_INCREMENT,
    //  first_name varchar(50) NOT NULL,
    //  PRIMARY KEY (id)); - задаем параметр значения которого будут уникальными
    // )
    //describe table_name - показать табличку



    /*SELECT*/
    //select * from table_name - выбрать все
    //SELECT * FROM `users` ORDER BY last_name DESC - выбрать таблицу в определенном порядке
    //SELECT * from users LIMIT 2 - выбрать 2 ряда из таблицы
    //select column_name from table_name - выбрать отдельный столбик



    /*INSERT*/
    //insert into users (first_name, last_name, email_address) values('Max', "Maximov", "max@max.ru")



    /*DELETE*/
    //DELETE from users WHERE last_name = 'Maximov'
?>