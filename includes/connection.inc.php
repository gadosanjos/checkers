<?php
    $servername = "localhost"; // default server name
    $username = "animeKing"; // user name that you created
    $password = "4VPnroTOC6wOU3mn"; // password that you created
    $dbname = "checkersDB";

    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error ."<br>");
    } 
    //echo "Connected successfully <br>";
    
    // Check if the database exists
    $result = $conn->query("SHOW DATABASES LIKE '$dbname'");

    // Delete the database, used for reset and test again, just delete the setup.flag file to reset
    if ($result->num_rows > 0) {
        // Database exists, so we can drop it
        $sql = "DROP DATABASE $dbname";
        if ($conn->query($sql)) {
            echo "Database $dbname was successfully dropped<br>";
        } else {
            echo 'Error dropping database: ' . $conn->error . "<br>";
        }
    }
    
    // Creation of the database
    $sql = "CREATE DATABASE $dbname";
    if ($conn->query($sql) === TRUE) {
        //echo "Database created successfully<br>";
    } else {
        echo "Error creating database: " . $conn->error ."<br>";
    }

    // close the connection
    //echo "Disconnected successfully from connection.php <br>";
    $conn->close();