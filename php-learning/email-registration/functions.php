<?php

    function add_registered_user($name, $email) {
        file_put_contents('mailing_list.php', "$name: $email\n", FILE_APPEND); //для защиты этого файла, его стоит расположить выше document root ../
    }

//нужна для того, чтобы имя или емейл не пропадал при отправке запроса
    function old($key) {
        if (!empty($_REQUEST[$key])) {
            return htmlspecialchars($_REQUEST[$key]);
        }

        return '';
    }

    function valid_email($email) {
        //return preg_match('/regular expression/', $email);
        return filter_var($email, FILTER_VALIDATE_EMAIL); //встроенная в php функция, проверяет email и возвращает true/false
    }

?>