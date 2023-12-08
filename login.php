<?php
    include 'includes/header.inc.php';
?>

    <section>
        <h2>Login</h2>
        <form action="includes/login.inc.php" method="POST">
            <label for="uid">Username:</label>
            <input type="text" id="uid" name="uid" placeholder="Username or Email...">
            <label for="pwd">Password:</label>
            <input type="password" name="pwd" placeholder="Password...">
            <button type="submit" name="submit">Login</button>
        </form>
        <?php
            if(isset($_GET['error'])){
                if($_GET['error'] == "emptyinput"){
                    echo "<p><strong>All fields must be filled!</strong></p>";
                } else if ($_GET['error'] == "wronglogin") {
                    echo "<p><strong>Wrong login!</strong></p>";
                } else if ($_GET['error'] == "wrongpassword") {
                    echo "<p><strong>Wrong password!</strong></p>";
                } 
            }
        ?>
    </section>

<?php
    include 'includes/footer.inc.php';
?>