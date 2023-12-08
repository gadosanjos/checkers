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
        echo "Connected successfully <br>";

    $sql = "CREATE TABLE users (
        usersId INT(11) NOT NULL AUTO_INCREMENT,
        usersName VARCHAR(100) NOT NULL,
        usersEmail VARCHAR(100) NOT NULL,
        usersUid VARCHAR(100) NOT NULL,
        usersPwd VARCHAR(255) NOT NULL,
        usersScore INT(11) DEFAULT 0,
        date_Joined DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (usersId)
    );";

    if ($conn->query($sql) === TRUE) {
        echo "Table $dbname created successfully<br>";
    } else {
        echo "Error creating table: " . $conn->error ."<br>";
    }

    // Close the connection
    $conn->close();
