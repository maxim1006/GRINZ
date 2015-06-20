<?php

    $request = file_get_contents('php://input');
    $input = json_decode($request, true);

    $name = $input['name'];

    $accounts = mysql_connect("localhost", "maxim1_backbone", "backbone") or die (mysql_error());

    //выбираю бд
    mysql_select_db("maxim1_backbone", $accounts);

    //записываю данные
    $sql = "
        INSERT INTO models (name) VALUES ('$name')
    ";

    mysql_query($sql, $accounts);

    $sql1 = "
        SELECT * FROM models WHERE name='$name'
    ";

    $result = mysql_query($sql1, $accounts);

   while($row = mysql_fetch_array($result)) {
        $json = array(
           'name' => $row['name'],
           'id' => $row['id']
        );
   }

   echo json_encode($json);



?>