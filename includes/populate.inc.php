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

    $stmt = $conn->prepare("INSERT INTO users (usersName, usersEmail, usersUid, usersPwd, usersScore) VALUES (?, ?, ?, ?, ?)");
    if ($stmt==FALSE) {
        echo "There is a problem with prepare <br>";
        echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
        // see: https://dev.mysql.com/doc/refman/5.7/en/commands-out-of-sync.html
    }
    $stmt->bind_param("ssssi", $name, $email, $username , $hashedPwd, $scoreBoard);

    $name = "Gabriel";
    $email = "fakeemail@example.com";
    $username = "Gabe";
    $pwd = "123";
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    $scoreBoard = 999;
    $stmt->execute();

    $name = "Russo";
    $email = "fakeemail2@example.com";
    $username = "Russo";
    $pwd = "123";
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    $scoreBoard = 1001;
    $stmt->execute();

    echo "New records created successfully<br>";

    $stmt->close();

    // Close the connection
    $conn->close();