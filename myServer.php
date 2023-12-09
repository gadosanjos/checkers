<?php
//initial setup
    if(isset($_GET['start'])){
            $setupFlagFile = 'setup.flag';
            if(!file_exists($setupFlagFile)){
                include_once 'includes/connection.inc.php';
                include_once 'includes/tableCreation.inc.php';
                include_once 'includes/populate.inc.php';

                file_put_contents($setupFlagFile, 'Setup has been completed.');
            }
    }
    if(isset($_GET['returnT'])){
        echo true;
    }

    if(isset($_GET['player1Wins'])){
        include_once 'databaseHandler.inc.php';
        $sql = "SELECT usersScore FROM users WHERE usersUid = 'test';";
        
        $result = $conn->query($sql);

        $result+=1;

        $sql = "UPDATE users SET usersScore = ? WHERE usersUid = 'test';";
        $stmt = $conn->prepare($sql);
        if ($stmt==FALSE) {
            echo "There is a problem with prepare <br>";
            echo $conn->error; // Need to connect/reconnect before the prepare call otherwise it doesnt work
            // see: https://dev.mysql.com/doc/refman/5.7/en/commands-out-of-sync.html
        }
        $stmt->bind_param("i", $result);  
        $stmt->execute();

        //echo "New records created successfully<br>";
    
        $stmt->close();
    
        // Close the connection
        $conn->close(); 
    }
    if(isset($_GET['player2'])){
        echo true;
    }
    //no the winning condition not activating