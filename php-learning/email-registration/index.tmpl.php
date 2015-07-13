<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Mailing list</title>
    <style>
        ul {
            list-style: none;
        }
        
        ul li {
            margin-bottom: 20px;
        }

        .notice {
            color: red;
        }
    </style>
</head>
<body>

<h1>Join the mailing list</h1>

<form action="" method="post">
    <?php if (isset($status)) : ?>
        <p class="notice"><?php echo $status; ?></p>
    <?php endif; ?>
    <ul>
        <li>
            <label for="name">Name: </label>
            <input type="text" name="name" value="<?= old('name'); ?>" />
        </li>
        <li>
            <label for="email">Email: </label>
            <input type="text" name="email" value="<?= old('email'); ?>" />
        </li>
        <li>
            <button type="submit">Sigh up!</button>
        </li>
    </ul>
</form>


</body>
</html>