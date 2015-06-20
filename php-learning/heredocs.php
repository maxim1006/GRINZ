<?php

    $array = array(
        'name' => 'Max',
        'wife' => 'Aliya'
    );

/*echo "<p>My name is: {$array['name']}, And wife's name is: {$array['wife']}</p>";*/ //чтобы вывести в двойных кавычках элемент массива надо обернуть его в {}


//Можно использовать конкатенацию следующим образом: $variable = ...;
// $variable .= ...;


extract($array); //этот метод превращает основания в ассоциативном массиве в переменные со значением. Например $name = 'Max'

echo $name;


//это heredoc, нужны чтобы удобочитаемо писать html. перед закрывающим EOT;
// нельзя ставить пробелы, также файл не может заканчиваться heredoc
$string =  <<<EOT
    <p>Your name: $name</p>
    <p>Your wife: $wife</p>
EOT;

echo $string;

?>