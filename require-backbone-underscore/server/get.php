<?php
//задаю хедер для json
header('Content-type: text/javascript');

//  подключаюсь к базе данных, первый агрумент, где находится база, второй имя, третий пароль
    $accounts = mysql_connect("localhost", "maxim1_backbone", "backbone")
    or die (mysql_error());

    //выбираю бд
    mysql_select_db("maxim1_backbone", $accounts);

    //создаю таблицу
//    $sql = "CREATE TABLE models
//    (
//        id int NOT NULL AUTO_INCREMENT,
//        PRIMARY KEY(id),
//        name varchar(30)
//    )
//    ";
//    mysql_query($sql, $accounts);*/



    //вставляю данные
/*    $sql = "
    INSERT INTO models (name) VALUES('Denis')
    ";

    mysql_query($sql, $accounts);*/



    //читаю данные
    $sql = "
    SELECT * FROM models
    ";

    $result = mysql_query($sql, $accounts);

    //пробегаю по всем строкам $row['name'] - это значения столбца name
    $counter = 0;
    $numRows = mysql_num_rows($result);

    echo '[';

    while($row = mysql_fetch_array($result)) {
         $json = array(
            'name' => $row['name'],
            'id' => $row['id']
        );

        if (++$counter == $numRows) {
          echo json_encode($json);
        } else {
            echo json_encode($json) . ',';
        }

       //могу сконкатенировать строки и значения например $row['name'] . "' is a name'"
    }

    echo ']';
?>