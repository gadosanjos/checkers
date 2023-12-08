<?php
    $servername = "localhost"; // default server name
    $dbusername = "animeKing"; // user name that you created
    $dbpassword = "4VPnroTOC6wOU3mn"; // password that you created
    $dbname = "checkersDB";

    // Create connection
    $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error ."<br>");
    } 
    //echo "Connected successfully <br>";
    
    //REMEMBER! close the connection after done
