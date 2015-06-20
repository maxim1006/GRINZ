<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Super globals php</title>
</head>
<body>

    <h1>Super Globals</h1>

    <p>My name: <?php
        //$_GET - это глобальный объект представляющий из себя ассоциативный массив с парами ключ - значения и разделенный &,
        // перед объектом сразу после адреса нужно поставить ?,
        //например ?name=Max&job=programmer
        //var_dump($_GET);


        if (isset($_GET['name'])) {
            echo htmlspecialchars($_GET['name']);
        } else {
            echo 'there is no name';
        };

    ?></p>

    <a href="about.php?name=Max">About</a>
</body>
</html>