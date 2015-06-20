<?php

$name = "Max";
$age = 27;

 //$greeting = "My name is $name and I am $_GET['$age']";
 //echo $greeting;

// $greeting = sprintf("My name is %s and I am %d", $name, $age);  //sprintf сохраняет строку с параметрами в переменной, а printf - выводит на экран эту строку с параметрами
// echo $greeting;

/*printf("Today is %s %s %d", 'June', '7th', '2012'); //выводит на экран значения сразу на экран, не нужно присваивать к переменной
$posted = sprintf("Today is %s %s %d", 'June', '7th', '2012');
echo $posted;*/

/*$results = sscanf("June 7th, 2012", '%s %[^,], %d');     //в первом аргументе пишу значения через запятую, чтобы во втором применить разделение этих значений и закинуть их в переменные; %[^,] - следующее значение без запятой
print_r($results);*/

/*list($month, $day, $year) = sscanf("June 7th, 2012", '%s %[^,], %d');   //list() - определяет значение для каждого из аргументов этого метода и передает в данном случае каждый из параметров array, так как    sscanf("June 7th, 2012", '%s %[^,], %d') это  Array ( [0] => June [1] => 7th [2] => 2012 )

list($name, $age) = array('Jeffrey', 27);  //
echo $name; //'Jeffrey'
echo $age; //27*/

/*sscanf("June 7th, 2012", '%s %[^,], %d', $month, $day, $year); //можно присваивать значеня переменном в методе sscanf (как выше с примером list()) так запись покороче
echo  $month; //June
echo  $day;   //7th
echo  $year;   ///2012*/
 ?>