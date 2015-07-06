<?php

    //$files = glob('r*.txt');//glob ищет файлы в дериктории с папкой в которой лежит файл, можно искать рекурсивно.
    //$files = glob('img/*.jpg');
    //print_r($files);
    $images = glob('img/*.{jpg,jpeg,png}', GLOB_BRACE);//GLOBE_BRACE, нужен для того, чтобы искать файлы с несколькими расширениями, между расширениями файлов нельзя ставить пробелы, так как эти пробелы ищатся в имени файла


foreach($images as $img) {
    //echo basename($img); //получить имя файла
    //echo dirname($img); //получить имя папки
    $info = pathinfo($img);
    /*echo $info['extension'];
    echo $info['filename'];*/
    //echo pathinfo($img, PATHINFO_EXTENSION);
    //echo pathinfo($img, PATHINFO_FILENAME);
//    $file_name = pathinfo($img, PATHINFO_FILENAME) . '.' . pathinfo($img, PATHINFO_EXTENSION);
//    echo $file_name;
//    echo "\n";
    //print_r(pathinfo($img));
}

//Также могу найти имя файла с помощью regexp
$file_path = 'img/arr-left.png';

//$file_name = explode('/', $file_path); // explode - возвратит массив с элементами, которые получились при разеделении строки через /
$file_name = implode(', ', ['max', 'anton', 'aliya']); // implode - возвратит строку из массива (как split в js)
//echo end($file_name); //end - берет последний элемент массива
//$file_name = str_replace('.png', '', end($file_name)); //заменяю расширение на пустую строку, тем самым получаю файл
//$file_name = preg_replace('/\.png$/i', '', end($file_name)); //тоже что и str_replace, только через рег. выражение

echo $file_name;

?>