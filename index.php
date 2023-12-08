<?php
    include 'includes/header.inc.php';
?>

    <section>
        <?php 
                if(isset($_SESSION['useruid'])){
                    $username = $_SESSION['useruid'];
                    echo "<h1>Welcome $username</h1>";
                    echo "<p>Your score in the leaderboard is: ". $_SESSION['userscore'] . ". Ready for another <a href='game.php'><strong>game</strong></a>?</p> ";
                } else {
                    echo "<h1>Checkers Game</h1>";
                    echo "<p>Login to play!<br>No account? No problem! Just <a href='signup.php'><strong>Sign up</strong></a>, it's fast and easy!<br>Sign up and participate in the <a href ='leaderboard.php'><strong>Leaderboard!</strong></a></p>";
                }
        ?>
    </section>

    <section>

    </section>
    <script src="js/firstSetup.js"></script>
<?php
    include 'includes/footer.inc.php';
?>