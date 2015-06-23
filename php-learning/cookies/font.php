<?php

    if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
        setcookie('fontSize', (int) $_POST['font-size'], time() + 60*60);
    }

    if ( isset($_POST['font-size']) ) {
        $font_size = $_POST['font-size'] . 'px';
    } else if ( isset($_COOKIE['font-size']) ) {
        $font_size = $_COOKIE['font-size'] . 'px';
    } else {
        $font_size = '16px';
    }

?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Font-size</title>
    <style>
        body {
            font-size: <?= htmlspecialchars($font_size); ?>
        }
    </style>
</head>
<body>

<form action="" method="post">
    <label>
        <span>Your Preferred font-size</span>
        <select class="font-size" name="font-size" id="font-size">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>
    </label>
    <br/>
    <button type="submit">Submit</button>
</form>

<h2>My page</h2>

<p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam debitis deserunt expedita facilis magni maiores,
    perspiciatis rem voluptates voluptatum! Accusantium ad aliquid, debitis libero maxime nam neque omnis quibusdam
    vitae?
</p>

</body>
</html>