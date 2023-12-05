<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_POST["submit"])){

            $name = $_POST['name'];
            $email = $_POST['email'];
            $username = $_POST['uid'];
            $pwd = $_POST['pwd'];
            $pwdRepeat = $_POST['pwdRepeat'];

        } else {
            header("location: ../signup.php");
        }
    }
