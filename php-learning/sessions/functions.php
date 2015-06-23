<?php
    //Создаю файл с функциями, которые могу подключать в других файлах, например в admin.php
    function is_logged_in() {
        return isset($_SESSION['username']);
    };

    function validate_user_creds($username, $password) {
        return ( $username === USERNAME && $password === PASSWORD );
    }

?>