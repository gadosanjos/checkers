<?php
    session_start();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkers Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="help.php">How to Play</a></li>
            <li><a href="contact.php">About Us</a></li>
            <li><a href="leaderboard.php">Leaderboard</a></li>
            <?php 
                if(isset($_SESSION['useruid'])){
                    $username = $_SESSION['useruid'];
                    echo "<li><a href='includes/logout.inc.php'>Logout</a></li>";
                    echo "<li><a href='game.php'>Play</a></li>";
                    echo "<li>$username</li>";
                } else {
                    echo "<li><a href='signup.php'>Sign up</a></li>";
                    echo "<li><a href='login.php'>Log in</a></li>";
                }
            ?>
            </ul>
        </nav>
    </header>
