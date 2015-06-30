<?php
//Первый вариант
/*
function set_count($file_name = 'counter.txt') {
    if ( file_exists($file_name) ) {//file_exists - проверяет существует ли файл
        $handle = fopen($file_name, 'r');
        $count = (int) fread($handle, 20) + 1; //20 - количество байт
        $handle = fopen($file_name, 'w');
        fwrite($handle, $count);

        fclose($handle);
    } else {
        $handle = fopen($file_name, 'w+'); //fopen метод для работы с файлами w+ - делает кучу вещей типо создать файл если его нет и т.д.
        $count = 1;
        fwrite($handle, $count); //записали цифру 1 в файл
        fclose($handle);
    }

    return $count;
}

set_count('custom_name.txt');

    require 'index.tmpl.php';

    echo "<p>You are the " . set_count() .  " visitor</p>"

*/


function set_count($file_name = 'counter.txt') {
    if ( file_exists($file_name) ) {//file_exists - проверяет существует ли файл

        $count = (int) file_get_contents($file_name) + 1;
        file_put_contents($file_name, $count);

        //также существует функция file($file_name) - которая возвращает массив с ключ значение, где ключ - номер каждой строки, а значение - то что на этой строке (начало с 0)
    } else {
        $handle = fopen($file_name, 'w+'); //fopen метод для работы с файлами w+ - делает кучу вещей типо создать файл если его нет и т.д.
        $count = 1;
        fwrite($handle, $count); //записали цифру 1 в файл
        fclose($handle);
    }

    return $count;
}

$count = set_count();

require 'index.tmpl.php';




?>