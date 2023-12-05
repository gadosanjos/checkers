<?php
    $servername = "localhost"; // default server name
    $username = "animeKing"; // user name that you created
    $password = "4VPnroTOC6wOU3mn"; // password that you created
    $dbname = "checkersDB";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error ."<br>");
    } 
    //echo "Connected successfully <br>";

    $sql = "CREATE TABLE users (
        usersId INT(11) NOT NULL AUTO_INCREMENT,
        usersName VARCHAR(100) NOT NULL,
        usersEmail VARCHAR(100) NOT NULL,
        usersUid VARCHAR(100) NOT NULL,
        usersScore INT(11),
        date_Joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (usersId)
    );";

    if ($conn->query($sql) === TRUE) {
        //echo "Table animeList created successfully<br>";
    } else {
        //echo "Error creating table: " . $conn->error ."<br>";
    }

    // Close the connection
    //echo "Disconnected successfully from tableCreation.php <br>";
    $conn->close();
