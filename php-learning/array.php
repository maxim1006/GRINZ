<?php

//	$months_of_year = array('January', 'February', 'March', 'April', 'May');
	$months_of_year = ['January', 'February', 'March', 'April', 'May']; //такой синтаксис только с php 5.4

	var_dump($months_of_year);
	echo "<p>";
	print_r($months_of_year);


//Ассоциативные массивы
$my_relatives = [

	'wife' => 'aliya',
	'brother1' => 'anton',
	'brother2' => 'denis'

];


?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PHP arrays</title>
</head>
<body>

	<h1>PHP arrays</h1>

	<ul>
		<li>Месяцы (обычный массив)</li>
		<?php

		     foreach ($months_of_year as $month) {
		        echo "<li>$month</li>";
		     }

		 ?>
	</ul>

	<ul>
        <li>Родственники (ассоциативные массив)</li>
        <?php
            /*
             foreach ($my_relatives as $position => $name) {
                echo "<li>$position - " . ucwords($name) . "</li>"; //ucwords - capitalize first latter
             }
			*/
         ?>

         <?php
			foreach ($my_relatives as $position => $name) :
         ?>

            <!--<li><?php //echo $position . ' - ' . ucwords($name)?></li>-->
            <li><?= $position . ' - ' . ucwords($name)?></li> <!-- = заменяет echo--> /*Преобразует в верхний регистр первый символ каждого слова в строке*/

        <?php endforeach ?>
    </ul>


	<?php echo 123 ?>
	<? echo 123 ?>
	<?= 123 ?>

	<p>

	<?php
	    //добавляю еще одно значение в array
	    //последний
	    array_push($months_of_year, 'April');
	    print_r($months_of_year);

		echo "<p>";
		//первый другая запись
		array_unshift($months_of_year, '0 month');
        print_r($months_of_year);

	    echo "<p>";

	    $months_of_year[] = 'May';//тоже что и array_push
	    print_r($months_of_year);//тоже что и array_push

	    echo "<p>";

	    //удаляю элементы из массива
	    //последний элемент
	    $removed_month = array_pop($months_of_year);
	    print_r($months_of_year);
	    echo "$removed_month is a removed month";

	    echo "<p>";
		//первый
	    array_shift($months_of_year);
        print_r($months_of_year);

        echo "<p>";

        //для более гибкого управления массивами
        $sliced = array_slice($months_of_year, 2);
        print_r($sliced);

        echo "<p>";

        $filteredMonths = array_filter($months_of_year, function($item) {return strlen($item) == 3;});
        print_r($filteredMonths);

	 ?>


</body>
</html>