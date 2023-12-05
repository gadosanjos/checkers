<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_POST["submit"])){
            echo "It works!";
        } else {
            header("location: ../signup.php");
        }
    }