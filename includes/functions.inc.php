<?php

function emptyInputSignup($name, $email, $username, $pwd, $pwdRepeat) {
    $result;

    if(empty($name) || empty($email) || empty($username) || empty($pwd) || empty($pwdRepeat)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}
function invalidUid($username) {
    $result;

    if(!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}
function invalidEmail($email) {
    $result;

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}
function pwdMatch($pwd, $pwdRepeat)  {
    $result;

    if($pwd !== $pwdRepeat) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

//Used both for sign up and login
function uidExists($conn, $username, $email)  {
    $sql = "SELECT * FROM users WHERE usersUid = ? OR usersEmail = ?;";
    
    $stmt = $conn->prepare($sql);
    if ($stmt==FALSE) {
        echo "There is a problem with prepare statement<br>";
        echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
        // see: https://dev.mysql.com/doc/refman/5.7/en/commands-out-of-sync.html
    }
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $resultData = $stmt->get_result();

    //login and sign up check
    if($row = $resultData->fetch_assoc()){
        return $row;
    } else {
        $result = false;
        return $result;
    }

    $stmt->close();

}

function createUser($conn, $name, $email, $username, $pwd) {
    $sql = "INSERT INTO users (usersName, usersEmail, usersUid, usersPwd) VALUES (?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if ($stmt==FALSE) {
        echo "There is a problem with prepare statement<br>";
        echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
        // see: https://dev.mysql.com/doc/refman/5.7/en/commands-out-of-sync.html
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    $stmt->bind_param("ssss", $name, $email, $username, $hashedPwd);
    $stmt->execute();

    $stmt->close();

    header("location: ../signup.php?error=none");
    exit();

}

function emptyInputLogin($username, $pwd) {
    $result;

    if(empty($username) || empty($pwd)) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

function loginUser($conn, $username, $pwd) {
    $uidExists = uidExists($conn, $username, $username);

    if($uidExists === false){
        header("location: ../login.php?error=wronglogin");
        exit();
    }

    $pwdHashed = $uidExists["usersPwd"];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if($checkPwd === false){
        header("location: ../login.php?error=wrongpassword");
        exit();
    } else if ($checkPwd === true) {
        session_start();
        $_SESSION["userid"] = $uidExists["usersId"];
        $_SESSION["useruid"] = $uidExists["usersUid"];
        $_SESSION["userscore"] = $uidExists["usersScore"];
        header("location: ../index.php");
        exit();
    }
}