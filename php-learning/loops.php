<?php

	/*$arr = ['Max', 'Aliya', 'Anton', 'Denis'];

	$arr_of_month = ['Jan', 'Feb', 'April'];

	foreach($arr_of_month as $month) {
	    echo $month;
	}

	foreach($arr as $name) {
		echo $name;
	}*/


	/*$arr = array(
		'wife' => 'Aliya',
		'brother' => 'Anton',
		'brother1' => 'Denis'
	);

	$arr_of_month = array(
		'first' => 'Jan',
		'second' => 'Feb',
		'third' => 'March'
	);

	foreach($arr_of_month as $number=>$month) {
		echo "<li>$number: $month</li>"
	}

	foreach($arr as $position => $name) {
        echo "<li><strong>$position</strong> - $name</li>";
    }*/


	$arr = ['Max', 'Aliya', 'Anton', 'Denis'];

    for ($i=0; $i < count($arr); $i++) {
        echo "<li>$arr[$i]</li>";
    }
 ?>