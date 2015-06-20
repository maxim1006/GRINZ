<?php

 //так создаю обычный класс
/*  	Class Person {

		public $name;
		public $job;

        public function __construct($name, $job) {
            $this->name = $name;
            $this->job = $job;
        }

        public function communicate($style="mouth") {
            return "communicating with $style";
        }

	}

    $p = new Person('Max', 'Web developer');

    print_r($p);
    echo $p->communicate('Telepathy');*/


//существует и дженерик класс stdClass, но в него нельзя добавлять методы, только свойства

/*$person = new stdClass();

$person->first = 'Max';
$person->last = 'Maximov';
$person->job = 'Web Developer';

var_dump($person);*/



//чтобы задать тип переменной подписываю перед ней в скобках тип (int)'5';
//echo gettype((int)'5'); //integer

$arr = array(
    'name' => 'Max',
    'wife' => 'Aliya'
);

echo $arr['name']; //вывожу как элемент массива

$o = (object)$arr; //преобразовываю массив в строку

echo "<p></p>";

var_dump($o);

echo "<p></p>";

echo $o->name; //вывожу как свойство объекта

?>