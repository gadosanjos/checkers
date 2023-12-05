<?php
    include 'includes/header.inc.php';
?>

    <section>
        <?php
            require_once 'includes/databaseHandler.inc.php';

            $sql = "SELECT * FROM users ORDER BY usersScore DESC;";
            

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $rank = 0;
                echo "<table>";
                echo "<caption>Top Players</caption>";
                echo "<thead><tr><th>Rank</th><th>id</th><th>Player</th><th>Wins</th><th>Playing since</th></tr></thead>";
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    $rank++;
                    echo "<tr><td>$rank</td><td>" . $row["usersId"]. "</td><td>" . $row["usersUid"]. "</td><td>" . $row["usersScore"]. "</td><td>" . $row["date_Joined"]. "</td></tr>";

                }
                echo "</table>";
            } else {
                echo "0 results";
            }

            $conn->close();
        ?>
    </section>

<?php
    include 'includes/footer.inc.php';
?>