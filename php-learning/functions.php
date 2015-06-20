<?php

	$arr = [
		['name' => 'Max', 'age' => '27'],
		['name' => 'Aliya', 'age' => '28'],
		['name' => 'Anton', 'age' => '29']
	];

/*	В этой функции вывожу в читаемом виде элементы массива
//    function makePre($value = 'default') { //так могу задать дефолтное значение для аргумента
	function makePre($value) {
		echo '<pre>';
			print_r($value);
		echo '</pre>';
	}
	echo makePre($arr);*/



/*	пример напсания array_pluck
	function array_pluck($toPluck, $arr) {
		$ret = []; //die(); останавливает выполнение php кода после die()

        foreach($arr as $item) {
            $ret[] = $item[$toPluck]; //это типо push в php
        }

        return $ret;
	}


	$pluckedNames = array_pluck('name', $arr);
	$pluckedAge = array_pluck('age', $arr);

	print_r($pluckedNames);
	echo "<br />";
	print_r($pluckedAge);*/



	//еще один пример реализации array_pluck
	function array_pluck($toPluck, $arr) {

		return array_map(function($item) use($toPluck) { //use - прокидывает переменную внутрь ф-ции, array_map - выполняет функцию для каждого элемента массива.
            //В php скоуп ограничивается функцией, при этом при выполнении кода парсер не идет вверх по скоупу, а ищет эти переменные только внутри этой функции.
			return $item[$toPluck];
		}, $arr);

	}

	$pluckedNames = array_pluck('name', $arr);
	$pluckedAge = array_pluck('age', $arr);

	print_r($pluckedNames);
	echo "<br />";
	print_r($pluckedAge);




/*	$arr = ['name' => 'Max', 'age' => '27'];

	print_r($arr['name']); //Maх, можно искать в массиве как в объекте.*/



?>