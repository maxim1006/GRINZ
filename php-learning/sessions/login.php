<?php

//так если одна форма.
if ($_SERVER['REQUEST_METHOD'] === "POST") { //$_SERVER['REQUEST_METHOD'] прослушивает методы которые происходят на странице
    $username = $_POST['username'];
    $password = $_POST['password'];

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

</body>
</html>