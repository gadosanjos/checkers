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
    </section>

<?php
    include 'includes/footer.inc.php';
?>