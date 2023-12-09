<?php
    include 'includes/header.inc.php';
    // $_SESSION["player1pieces"] = field.firstPlayer;
    // $_SESSION["player2pieces"] = field.secondPlayer;
?>

<?php
    echo "
        <section id='gameInfo'>
        <p>{$_SESSION['useruid']} pieces: <b id='firstPlayer'>0</b></p>
        <p>Player 2 pieces:<b id='secondPlayer'>0</b></p>
        </section>
    ";
?>
    <div>
        <p>
            <label for="selectPiece">Choose your piece color:</label>
            <select name="selectPiece" id="selectPiece">
                <option value="white" selected>White</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
            </select>
        </p>
        <p>
            <label for="selectBoard">Choose your board color:</label>
            <select name="selectBoard" id="selectBoard">
                <option value="regular" selected>White&Black</option>
                <option value="wood">LightWood&DarkWood</option>
            </select>
        </p>
        <button type="button">Play</button>
    </div>
    <script src="js/createBoard.js" type="module"></script>
    
<?php
    include 'includes/footer.inc.php';
?>