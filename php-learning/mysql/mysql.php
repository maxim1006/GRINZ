<?php

    //show table - показывает таблицу
    //describe table - подробное описание таблицы

    //http://dev.mysql.com/doc/refman/5.0/en/set-password.html - про задание паролей;
    //вход через командную строку: mysql -u root -p
    //show databases
    //show tables
    // CREATE TABLE users(
    //  id INT AUTO_INCREMENT,
    //  first_name varchar(50) NOT NULL,
    //  PRIMARY KEY (id)); - задаем параметр значения которого будут уникальными
    // )


/*Пример создания таблицы*/
/*CREATE TABLE posts(
    ID INT AUTO_INCREMENT,
    title varchar(150),
    body text,
    author_id INT NOT NULL,
    PRIMARY KEY (id)
);*/



    /*SELECT*/
    //select * from table_name - выбрать все
    //SELECT * FROM `users` ORDER BY last_name DESC - выбрать таблицу в определенном порядке
    //SELECT * from users LIMIT 2 - выбрать 2 ряда из таблицы
    //select column_name from table_name - выбрать отдельный столбик



    /*INSERT*/
    //insert into users (first_name, last_name, email_address) values('Max', "Maximov", "max@max.ru")



    /*DELETE*/
    //DELETE from users WHERE last_name = 'Maximov'



    /*UPDATE*/
    /*UPDATE posts SET author_id = 2 WHERE id = 1;*/
/*UPDATE posts SET title = "Updated again", body = "Updated body" WHERE id = 1;*/
/*ALTER TABLE posts CHANGE subject title varchar(100); - апдейт названия колонки*/



    /*JOIN*/
    /*SELECT * FROM posts inner JOIN users on users.id = posts.author_id*/ //inner JOIN - возвращает все строки, совпадающие в 2х таблицах
    /*SELECT * FROM users1 INNER JOIN orders ON orders.user_id = users1.id;*/
    /*SELECT users1.id, username, number as order_number FROM users1 INNER JOIN orders ON orders.user_id = users1.id;*/ //as - меняю на лету название колонки
/*SELECT users1.id, username, number as order_number FROM users1 INNER JOIN orders ON orders.user_id = users1.id where id = 1;*/ //выбираю все строки в смерженной таблице, где id = 1;
/*SELECT users1.id, username, count(orders.number) as order_number from users1 inner join orders on orders.user_id = users1.id where users1.id = 1;*/ // count - считает количество ордеров, которые заказал users1.id = 1
?>