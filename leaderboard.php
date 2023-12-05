<?php
    include 'includes/header.inc.php';
?>

    <section>
        <?php
            require_once 'includes/databaseHandler.inc.php';

            $sql = "SELECT * FROM users ORDER BY usersScore DESC;";
            

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table>";
                // output data of each row
                while($row = $result->fetch_assoc()) {

                    echo "<tr><td>id: " . $row["usersId"]. " </td><td>Name: " . $row["usersUid"]. " </td><td>Score: " . $row["usersScore"]. "</td><td> Playing since: " . $row["date_Joined"]. " </td></tr>";

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