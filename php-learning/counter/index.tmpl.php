<!--index.tmpl.php - вьюха с минимальным количеством логики в php-->

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
</head>
<body>

    <h1>Counter page</h1>
    <p>You are <?php

        echo $count;

    ?> the visitor</p>

</body>
</html>