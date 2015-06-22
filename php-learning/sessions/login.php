<?php

session_start();

//define - предназначено для создания констант, т.е. переменных которые никогда не меняются
define('USERNAME', 'maxim1006');
define('PASSWORD', '123');

//так если одна форма.
if ($_SERVER['REQUEST_METHOD'] === "POST") { //$_SERVER['REQUEST_METHOD'] прослушивает методы которые происходят на странице
    $username = $_POST['username']; //$_POST - перехватывает все что в пост запросе и дает доступ к массиву в котором находится инфа
    $password = $_POST['password'];

    if ( $username === USERNAME && $password === PASSWORD) {
        $_SESSION['username'] = $username;
        header("Location: admin.php"); //редирект на admin.php
    } else {
        $status = "Неправильные имя/пароль";
    }
}

//так могу проверить если много форм на странице
/*    if(isset($_POST['username'])) {
        print_r($_POST['username']);
    };*/

?>


<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>

<form action="login.php" method="post">
    <ul>
        <li>
            <label for="username">Username:</label>
            <input type="text" name="username"/>
        </li>
        <li>
            <label for="password">Password:</label>
            <input type="text" name="password"/>
        </li>
        <li>
            <button type="submit">Login</button>
        </li>
    </ul>
</form>

<?php

    if ( isset($status) ) {
        echo $status;
    }

?>

</body>
</html>