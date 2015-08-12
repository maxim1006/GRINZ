<?php

/*Anti-patterns*/

//echo phpinfo(); //получить информацию о php сервере, mysql.sock - ссылка на socket connection
//php -i | grep mysql.sock - тоже самое, только в командной строке

//Если не совпадают пути для работы php (в случае если проинсталенно несколько версий), то путь к соккету можно прописать в
//mysql_connect('localhost:/tmp/mysql.sock', 'root', 'password') or die('Couldn\'t connect');

require 'config.php';

try {
    $conn = new PDO('mysql:host=localhost;dbname=maxim1_pdo', $config['DB_USERNAME'], $config['DB_PASSWORD']); //PDO - объект для подключения к БД
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}


?>