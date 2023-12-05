<?php
    include 'includes/header.inc.php';
?>

    <section>
        <h2>Sign up</h2>
        <form action="includes/signup.inc.php" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your name...">

            <label for="email">E-mail:</label>
            <input type="text" id="email" name="email" placeholder="youremail@example.com...">

            <label for="uid">Username:</label>
            <input type="text" id="uid" name="uid" placeholder="Username...">

            <label for="pwd">Password:</label>
            <input type="password" id="pwd" name="pwd" placeholder="Password...">

            <label for="pwdrepeat">Repeat Password:</label>
            <input type="password" id="pwdrepeat" name="pwdrepeat" placeholder="Repeat Password...">
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