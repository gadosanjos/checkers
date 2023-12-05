<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_POST["submit"])){

            $username = $_POST['uid']; //alos works with e-mail
            $pwd = $_POST['pwd'];


            require_once 'databaseHandler.inc.php';
            require_once 'functions.inc.php';

            if(emptyInputLogin($username, $pwd) !== false){
                header("location: ../login.php?error=emptyinput");
                exit();
            }
            loginUser($conn, $username, $pwd);

        } else {
            header("location: ../login.php");
            exit();
        }
    }