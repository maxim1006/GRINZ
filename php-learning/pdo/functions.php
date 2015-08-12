<?php

/*Anti-patterns*/

//echo phpinfo(); //�������� ���������� � php �������, mysql.sock - ������ �� socket connection
//php -i | grep mysql.sock - ���� �����, ������ � ��������� ������

//���� �� ��������� ���� ��� ������ php (� ������ ���� ������������� ��������� ������), �� ���� � ������� ����� ��������� �
//mysql_connect('localhost:/tmp/mysql.sock', 'root', 'password') or die('Couldn\'t connect');

require 'config.php';

try {
    $conn = new PDO('mysql:host=localhost;dbname=maxim1_pdo', $config['DB_USERNAME'], $config['DB_PASSWORD']); //PDO - ������ ��� ����������� � ��
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}


?>