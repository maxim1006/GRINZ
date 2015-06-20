<?php

   /* if (!empty($_POST)) { //проверяю если глобальная переменная $_POST пустая
        print_r($_POST);
    }*/

    if ($_SERVER['REQUEST_METHOD'] === "POST") { //$_SERVER['REQUEST_METHOD'] прослушивает методы которые происходят на странице
        //print_r($_POST);
        if (mail('maxim1006@list.ru', 'message from grinz $_post', htmlspecialchars($_POST['message']))) {//метод mail возвращает true или false если доставлено
            $status = "Письмо направлено по адресу: {$_POST['email']}";
        }

    }

?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Post</title>
    <style>
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li {
            margin-bottom: 1em;
        }
        label {
            vertical-align: top;
        }
    </style>
</head>
<body>


    <h1>Contact form</h1>

    <form action="" method="post">
        <ul>
            <li>
                <label for="">Name</label>
                <input type="text" name="name" />
            </li>
            <li>
                <label for="">Email</label>
                <input type="text" name="email" />
            </li>
            <li>
                <label for="message">Message</label>
                <textarea name="message" id="message"></textarea>
            </li>
            <li>
                <button type="submit">Submit</button>
            </li>
        </ul>
    </form>

    <?php

        if (isset($status)) {
            echo   $status;
        }

    ?>


</body>
</html>