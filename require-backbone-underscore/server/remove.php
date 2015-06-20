<?php

    $request = file_get_contents('php://input');
    $input = json_decode($request, true);

    $id = $input['id'];

    $accounts = mysql_connect("localhost", "maxim1_backbone", "backbone")
    or die (mysql_error());

    //выбираю бд
    mysql_select_db("maxim1_backbone", $accounts);

    //читаю данные
    $sql = "
        DELETE FROM models WHERE id=$id;
    ";

     mysql_query($sql, $accounts);


    echo $id;


?>