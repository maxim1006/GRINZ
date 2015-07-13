<?php
    //выношу переменные
    //echo $_SERVER['DOCUMENT_ROOT']; - //так узнаю корень документа
    define('MAILING_LIST', 'admin/mailing_list.php');



    /*
     * Add a new item to the registered users list
     */
    function add_registered_user($name, $email) {
        if (checkPresence($email)) {
            file_put_contents(MAILING_LIST, "$name: $email\n", FILE_APPEND); //для защиты этого файла, его стоит расположить выше document root ../
        }
    }


    /**
     * check if the address is already there
     * @param $email
     * @param string $path
     * @return bool
     */
    function checkPresence($email, $path = MAILING_LIST) {
        $users = file($path);

        if (count($users)) {
            foreach($users as $user) {
                list($nameToCheck, $emailToCheck) = explode(': ', htmlspecialchars($user));

                if (trim($emailToCheck) === $email) {
                    return false;
                }
            }
        }

        return true;
    }


    //нужна для того, чтобы имя или емейл не пропадал при отправке запроса
    /*
    * Save input information
    */
    function old($key) {
        if (!empty($_REQUEST[$key])) {
            return htmlspecialchars($_REQUEST[$key]);
        }

        return '';
    }


    /**
     * Validate email
     * @param $email
     * @return mixed
     */
    function valid_email($email) {
        //return preg_match('/regular expression/', $email);
        return filter_var($email, FILTER_VALIDATE_EMAIL); //встроенная в php функция, проверяет email и возвращает true/false
    }


    /**
     * Get registered users
     * @param string $path
     * @return array|bool
     */
    function get_registered_users($path = MAILING_LIST) { //первым параметром ф-ции список из email адерсов
        $users = file($path); //прочтет файл по пути и вернет массив в котором каждая строка - элемент массива

        if (count($users)) {
            return array_map(function($user) {
                return explode(': ', htmlspecialchars($user)); //разбиваем массив по : и пробелу, типо как split
            }, $users);
        }

        return false;
    }

?>