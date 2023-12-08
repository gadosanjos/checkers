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
                    echo "<p><strong>All fields must be filled!</strong></p>";
                } else if ($_GET['error'] == "invaliduid") {
                    echo "<p><strong>Username must only contain a-z A-Z 0-9!</strong></p>";
                } else if ($_GET['error'] == "invalidemail") {
                    echo "<p><strong>Invalid email!</strong></p>";
                } else if ($_GET['error'] == "passworddontmatch") {
                    echo "<p><strong>Passwords don't match!</strong></p>";
                } else if ($_GET['error'] == "usernametaken") {
                    echo "<p><strong>Username or Email already exists!</strong></p>";
                } else if ($_GET['error'] == "none") {
                    echo "<p><strong>Congratulaions your account has been created, you can now login!</strong></p>";
                }
            }
        ?>
    </section>

<?php
    include 'includes/footer.inc.php';
?>