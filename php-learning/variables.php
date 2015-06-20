<?php

//найти php.ini можно командой php -i | grep "Loaded Configuration File"
//чтобы показывать ошибки нужно поставить display_errors = On





	/*Переменные*/
	$name = ' Max';

	$two_word_variable;

	/*или могу использовать*/
	//echo "Hello $name";
	echo 'Hello' . $name;


	$wife = 'Aliya';

    /*могу вставлять переменные, но только в двойные кавычки*/
	echo "Max\'s wife $wife";


?>