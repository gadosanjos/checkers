<?php
    include 'includes/header.inc.php';
?>

    <section>
        <h2>Login</h2>
        <form action="includes/login.inc.php" method="POST">
            <input type="text" name="name" placeholder="Username or Email...">
            <input type="password" name="pwd" placeholder="Password...">
            <button type="submit" name="submit">Login</button>
        </form>
    </section>

<?php
    include 'includes/footer.inc.php';
?>