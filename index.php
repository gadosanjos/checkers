<?php
    include 'includes/header.inc.php';
?>

    <section>
        <?php 
                if(isset($_SESSION['useruid'])){
                    $username = $_SESSION['useruid'];
                    echo "<h1>Welcome $username</h1>";
                    echo "<p>Your score in the leaderboard is: ". $_SESSION['userscore'] . ". Ready for another <a href='game.php'>game</a>?</p> ";
                    echo "<li>$username</li>";
                } else {
                    echo "<h1>Checkers Game</h1>";
                    echo "<p>Login to play!<br>No account? Just Sign up, it's fast and easy!<br>Sign up and participate in the Scoreboard!</p>";
                }
        ?>
    </section>

    <section>

    </section>
    
<?php
    include 'includes/footer.inc.php';
?>