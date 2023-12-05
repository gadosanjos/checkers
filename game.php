<?php
    include 'includes/header.inc.php';
    $_SESSION["player1pieces"] = 12;
    $_SESSION["player2pieces"] = 12;
?>
<?php
    echo "<p>{$_SESSION['useruid']} pieces: {$_SESSION['player1pieces']}</p><p>Player 2 pieces: {$_SESSION['player1pieces']}</p>";
?>
    <div>

    </div>


    <script src="js/createBoard.js"></script>
    
<?php
    include 'includes/footer.inc.php';
?>