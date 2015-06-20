<?php

    $request = file_get_contents('php://input');
    $input = json_decode($request, true);

    $id = $input['id'];
    $name = $input['name'];





    $accounts = mysql_connect("localhost", "maxim1_backbone", "backbone")
    or die (mysql_error());

    //выбираю бд
    mysql_select_db("maxim1_backbone", $accounts);

    //читаю данные
    $sql = "
        UPDATE models SET name='$name' WHERE id=$id;
    ";

     mysql_query($sql, $accounts);


    echo $name . ' ' . $id;


/*  вывести все элементы
    foreach ($input as $key=>$value) {
        echo $key . ' = ' . $value;
    }*/

/*
    echo $id;
    echo $name;*/


?>