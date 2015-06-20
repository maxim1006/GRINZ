<?php
//get object
$request = file_get_contents('php://input');
$data = json_decode($request, true);

//get value of input that was checked
$val = $data["checkedValue"];

//get content of textfile
$filename = "poll_results.txt";
$content = file($filename);

//put content in array
$array = explode("||", $content[0]);

$array[$val] += 1;

$variant1 = $array[0];
$variant2 = $array[1];
$variant3 = $array[2];

//insert variants to txt file
$insert_variants = $variant1."||".$variant2."||".$variant3;
$fp = fopen($filename,"w");
fputs($fp,$insert_variants);
fclose($fp);
?>

<div class="poll-quest-cap">Результат:</div>
    <div class="poll-answer">
        <p class="poll-quest">вариант 1</p>
        <div class="line-height36">
            <div style="width:<?php echo(100*round($variant1 /($variant2+$variant1+$variant3),2));?>px;height:20px;background-color:#ccc;"></div>
            <span class="poll-numbers"><?php echo($variant1); ?> чел.</span>
        </div>
    </div>
    <div class="poll-answer">
        <p class="poll-quest">вариант 2</p>
        <div class="line-height36">
            <div style="width:<?php echo(100*round($variant2/($variant2+$variant1+$variant3),2));?>px;height:20px;background-color:#ccc;"></div>
            <span class="poll-numbers"><?php echo($variant2); ?> чел.</span>
        </div>
    </div>
    <div class="poll-answer">
        <p class="poll-quest">вариант 3</p>
        <div class="line-height36">
            <div style="width:<?php echo(100*round($variant3/($variant2+$variant1+$variant3),2));?>px;height:20px;background-color:#ccc;"></div>
            <span class="poll-numbers"><?php echo($variant3); ?> чел.</span>
        </div>
    </div>
    <div class="poll-all-votes">
        Всего проголосовали: <span class="poll-numbers"><?php echo($variant3+$variant2+$variant1); ?> чел.</span>
    </div>
</div>