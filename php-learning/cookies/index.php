<?php
    //Куки - хранят до 4кб даты, к ним легко получить доступ, поэтому не стоит хранить важную инфурмацию
    //setcookie('fontSize', '25px', time() +  60 * 60 * 24 * 365, '/');
    //первый аргумент имя,
    // затем значение,
    // третий - время жизни куки (если не указать время жизни, то кука висит до закрытия браузера/окончания сессии);
    // Четвертый указание к какой секции принадлежит кука (/ - ко всему домену)


//Также куки можно задавать в виде array
setcookie('prefs[fontSize]', 25);
setcookie('prefs[favouriteCategory]', 'news');
setcookie('prefs[screenWidth]', '1024');

//Чтобы удалить куку надо поставить время жизни time() - ...
//time() - текущее время в секундах
/*date_default_timezone_set("Europe/Moscow");
echo date('Y-m-d h:i');*/ //текущее время в Москве
?>


<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Cookies</title>
    <style>
        body {
            font-size: <?= $_COOKIE['fontSize']; ?>;
        }
    </style>
</head>
<body>

    <p>Hi there</p>

    <?php
        if ( isset($_COOKIE['prefs']) ) {
            echo '<ul>';
            foreach ($_COOKIE['prefs'] as $key => $val) {
                echo '<li>' . htmlspecialchars($key) . ': ' . htmlspecialchars($val) . '</li>';
            }
            echo '</ul>';
        }
    ?>

</body>
</html>