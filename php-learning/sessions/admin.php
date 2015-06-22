<?php
    session_start();
    if ( !isset($_SESSION['username']) ) {
        header('Location: login.php');
        die();
    }

    echo "Hello " . $_SESSION['username'];
?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Admin page</title>
</head>
<body>
<a href="logout.php">Logout</a>
</body>
</html>

