<?php
    include 'includes/header.inc.php';
?>

    <section>
        <h2>Sign up</h2>
        <form action="includes/signup.inc.php" method="POST">
            <input type="text" name="name" placeholder="Your name...">
            <input type="text" name="email" placeholder="youremail@example.com...">
            <input type="text" name="uid" placeholder="Username...">
            <input type="password" name="pwd" placeholder="Password...">
            <input type="password" name="pwdrepeat" placeholder="Repeat Password...">
            <button type="submit" name="submit">Sign up</button>
        </form>
        <?php
            if(isset($_GET['error'])){
                if($_GET['error'] == "emptyinput"){
                    echo "<p>All fields must be filled!</p>";
                } else if ($_GET['error'] == "invaliduid") {
                    echo "<p>Username must only contain a-z A-Z 0-9!</p>";
                } else if ($_GET['error'] == "invalidemail") {
                    echo "<p>Invalid email!</p>";
                } else if ($_GET['error'] == "passworddontmatch") {
                    echo "<p>Passwords don't match!</p>";
                } else if ($_GET['error'] == "usernametaken") {
                    echo "<p>Username or Email already exists!</p>";
                } else if ($_GET['error'] == "none") {
                    echo "<p>Congratulaions your account has been created, you can now login!</p>";
                }
            }
        ?>
    </section>

<?php
    include 'includes/footer.inc.php';
?>