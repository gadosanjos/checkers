<?php
    include 'includes/header.inc.php';
?>

    <section>
        <h2>Login</h2>
        <form action="includes/login.inc.php" method="POST">
            <input type="text" name="uid" placeholder="Username or Email...">
            <input type="password" name="pwd" placeholder="Password...">
            <button type="submit" name="submit">Login</button>
        </form>
        <?php
            if(isset($_GET['error'])){
                if($_GET['error'] == "emptyinput"){
                    echo "<p>All fields must be filled!</p>";
                } else if ($_GET['error'] == "wronglogin") {
                    echo "<p>Wrong login!</p>";
                } else if ($_GET['error'] == "wrongpassword") {
                    echo "<p>Wrong password!</p>";
                } 
            }
        ?>
    </section>

<?php
    include 'includes/footer.inc.php';
?>