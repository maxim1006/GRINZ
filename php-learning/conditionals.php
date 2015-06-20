<?php

	$wife = 'Aliya';

/*	if ($wife === 'Aliya') { //могу использовать &&, ||
		echo 'true';
	} else if ($wife === 'Gulya') {
		echo "Denis's wife";
	} else {
		echo 'false';
	}*/

/*	switch ($wife) {
		case 'Aliya':
			echo 'true';
			break;
		case 'Gulya':
		    echo "Denis's wife";
		    break;
		default:
		    echo 'false';
	}*/


	$arr = array(
		"Aliya" => 'true',
		"Gulya" => "Denis's wife"
	);

	echo isset($arr[$wife]) ? $arr[$wife] : 'false';

?>