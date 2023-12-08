let btn = document.querySelector('button');
let game;
let BOARD_SIZE = 8;

btn.addEventListener('click', function () {
    let selectPiece = document.getElementById('selectPiece');
    let selectBoard = document.getElementById('selectBoard');
    const selectedColor = selectPiece.value;
    const selectedBoard = selectBoard.value;
    let opponentColor = "";

    switch (selectedColor) {
        case "white":;
            opponentColor = "black";
            goesFirst = false;
            break;
        case "black":
            opponentColor = "white";
            goesFirst = true;
            break;
        case "red":
            opponentColor = "blue";
            goesFirst = true;
            break;
        case "blue":       
            opponentColor = "red";
            goesFirst = false;
            break;
        default:
            break;
    }

    switch (selectedBoard) {
        case "regular":
            lightType = "white";
            darkType = "black";
            break;
        case "wood":
            lightType = "light";
            darkType = "dark";
            break;
        default:
            break;
    }
    let body = document.querySelector('div');
    body.innerHTML = '';
    game = new CheckersGame(body, selectedColor, opponentColor, lightType, darkType, goesFirst);
});

let boardRows = ['row-8', 'row-7', 'row-6', 'row-5', 'row-4', 'row-3', 'row-2', 'row-1'];
let boardCols = ['A','B','C','D','E','F','G','H'];
let gameBoard = [   
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.'], 
['.', '.', '.', '.', '.', '.', '.', '.']
];

console.log(gameBoard);

class CheckersGame{
    constructor(container, color1, color2, lightType, darkType, goesfirst) {
        this.container = container;
        this.lightBoardColor = lightType;
        this.darkBoardColor = darkType;
        this.board = new Board(container, this.lightBoardColor, this.darkBoardColor);
        this.player1 = new Player('Player1', color1, goesfirst, this.board, true);
        this.player2 = new Player('Player2', color2, (!goesfirst), this.board, false);
    }
}

class Board{
    constructor(container, lightType, darkType) {
        const boardContainer = container;
        const table = document.createElement('table');
        table.className = 'board';

        for (let row = 0; row < BOARD_SIZE; row++) {
            const tr = document.createElement('tr');
            tr.setAttribute('id', boardRows[row]);
            for (let col = 0; col < BOARD_SIZE; col++) {
                const cell = this.createCell(row, col, lightType, darkType);
                tr.appendChild(cell);
          }
          table.appendChild(tr);
        }
        boardContainer.appendChild(table);
        return table;
    }

    createCell(row, col, lightType, darkType) {
        const td = document.createElement('td');
        td.className = 'cell';
        td.setAttribute('id', boardRows[row] + "-" + boardCols[col]);
        td.dataset.row = row;
        td.dataset.col = col;
        let dark = Boolean((row + col)%2);
        if (dark) {
            td.className += ' '+ darkType +'-field';
        } else {
            td.className += ' '+ lightType +'-field';
        }
        td.addEventListener('click', () => handleCellClick(row, col));
        return td;
    }
}

class Player {
    constructor(playerName, pieceColor, first, board, isplayer1, player){
        this.board = board;
        this.isplayer1 = isplayer1
        this.pieceNum = 12;
        this.name = playerName;
        this.pieceColor = pieceColor;
        this.First = first;
        this.pieces = new Pieces(this.name, this.First, pieceColor, board, isplayer1, player);
    }
    movePiece(move){
        const piece = this.pieces.createPiece();

        piece.className += " " + this.pieceColor;
        piece.addEventListener('click', () => handlePieceClick(move.toRow, move.toCol, this.pieceColor, this.isplayer1, this.First))
        this.board.rows[move.toRow].cells[move.toCol].append(piece);

        this.board.rows[move.fromRow].cells[move.fromCol].innerHTML = "";
    }
}

class Pieces {
    constructor(player, first, pieceColor, board, isplayer1, playerObj){
        this.board = board;
        if(isplayer1 == true){
            this.populateP1(pieceColor, first, playerObj);
        } else {
            this.populateP2(pieceColor, first, playerObj);
        }
    }
    populateP1(pieceColor, first, playerObj) {
        for (let row = 5; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
              if ((row + col) % 2 === 1) {
                gameBoard[row][col] = 'o';
                const piece = this.createPiece();

                piece.className += " " + pieceColor;
                piece.addEventListener('click', () => handlePieceClick(row, col, pieceColor, true, first))
                this.board.rows[row].cells[col].append(piece);
              }
            }
        } 
    }
    populateP2(pieceColor, first, playerObj){

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
              if ((row + col) % 2 === 1) {
                gameBoard[row][col] = 'x';
                const piece = this.createPiece();

                piece.className += " " + pieceColor;
                piece.addEventListener('click', () => handlePieceClick(row, col, pieceColor, false, first))
                this.board.rows[row].cells[col].append(piece);
                }
            }
        }
    }

    createPiece() {
        const piece = document.createElement('div');
        piece.className = 'piece';
        return piece;
    }
}

function handleCellClick(row, col) {
    console.log(`Clicked on cell (${boardRows[row]}, ${boardCols[col]})`);
}
let move;
let move2;
let valid; 
let valid2;
function handlePieceClick(row, col, pieceColor, player1, goesFirst){
    let brows = boardRows[row];
    let bcols = boardCols[col];
    let canGoUP = row-1;
    let canGoDown = row+1;

    let checkersRows = document.querySelector("#"+brows);
    let checkersCols = document.querySelector("#"+brows+"-"+bcols);

    if(player1){
        console.log(`You clicked on piece (${boardRows[row]}, ${boardCols[col]}, ${pieceColor}, plays first:${goesFirst})`);
        if(brows == "row-1" || brows == "row-3" || brows == "row-5" || brows == "row-7"){
            let possibleJump;
            let possibleJump2;
            switch (bcols) {
                case 'A':
                    console.log("you can go to " + boardRows[canGoUP] + " B");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-B");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 1);
                    //console.log(JSON.stringify(move));
                    valid = makeMovePlayer1(move);
                    if(valid){
                        possibleJump.addEventListener('click', handleClick(move));  
                    }
                    break;
                case 'C':
                    console.log("you can go to " + boardRows[canGoUP] + " B or D");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-B");
                    possibleJump2 = document.querySelector("#"+boardRows[canGoUP]+"-D");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    possibleJump2.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 1);
                    move2 = new Move(row, col, canGoUP, 3);
                    valid = makeMovePlayer1(move);
                    valid2 = makeMovePlayer1(move2);
                    if(valid && valid2) {
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2)); 
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));
                        break;
                    } else if (valid && !valid2) {
                        console.log("valid && !valid2")
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2));  
                    } else if (!valid && valid2) {
                        console.log("!valid && valid2")
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));  
                    }

                    break;
                case 'E':
                    console.log("you can go to " + boardRows[canGoUP] + " D or F");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-D");
                    possibleJump2 = document.querySelector("#"+boardRows[canGoUP]+"-F");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    possibleJump2.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 3);
                    move2 = new Move(row, col, canGoUP, 5);
                    valid = makeMovePlayer1(move);
                    valid2 = makeMovePlayer1(move2);
                    if(valid && valid2) {
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2)); 
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));
                        break;
                    } else if (valid && !valid2) {
                        console.log("valid && !valid2")
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2));  
                    } else if (!valid && valid2) {
                        console.log("!valid && valid2")
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));  
                    }

                    break;
                case 'G':
                    console.log("you can go to " + boardRows[canGoUP] + " F or H");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-F");
                    possibleJump2 = document.querySelector("#"+boardRows[canGoUP]+"-H");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    possibleJump2.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 5);
                    move2 = new Move(row, col, canGoUP, 7);
                    valid = makeMovePlayer1(move);
                    valid2 = makeMovePlayer1(move2);
                    if(valid && valid2) {
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2)); 
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));
                        break;
                    } else if (valid && !valid2) {
                        console.log("valid && !valid2")
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2));  
                    } else if (!valid && valid2) {
                        console.log("!valid && valid2")
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));  
                    }

                    break;
            }
        } else {
            switch (bcols) {
                case 'B':
                    console.log("you can go to " + boardRows[--row] + " A or C");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-A");
                    possibleJump2 = document.querySelector("#"+boardRows[canGoUP]+"-C");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    possibleJump2.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 0);
                    move2 = new Move(row, col, canGoUP, 2);
                    valid = makeMovePlayer1(move);
                    valid2 = makeMovePlayer1(move2);
                    if(valid && valid2) {
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2)); 
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));
                        break;
                    } else if (valid && !valid2) {
                        console.log("valid && !valid2")
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2));  
                    } else if (!valid && valid2) {
                        console.log("!valid && valid2")
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));  
                    }

                    console.log("noooo");
                    break;
                case 'D':
                    console.log("you can go to " + boardRows[--row] + " C or E");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-C");
                    possibleJump2 = document.querySelector("#"+boardRows[canGoUP]+"-E");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    possibleJump2.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 2);
                    move2 = new Move(row, col, canGoUP, 4);
                    valid = makeMovePlayer1(move);
                    valid2 = makeMovePlayer1(move2);
                    if(valid && valid2) {
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2)); 
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));
                        break;
                    } else if (valid && !valid2) {
                        console.log("valid && !valid2")
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2));  
                    } else if (!valid && valid2) {
                        console.log("!valid && valid2")
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));  
                    }

                    break;
                case 'F':
                    console.log("you can go " + boardRows[--row] + " to E or G");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-E");
                    possibleJump2 = document.querySelector("#"+boardRows[canGoUP]+"-G");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    possibleJump2.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
                    
                    move = new Move(row, col, canGoUP, 4);
                    move2 = new Move(row, col, canGoUP, 6);
                    valid = makeMovePlayer1(move);
                    valid2 = makeMovePlayer1(move2);
                    if(valid && valid2) {
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2)); 
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));
                        break;
                    } else if (valid && !valid2) {
                        console.log("valid && !valid2")
                        possibleJump.addEventListener('click', handleClick2(move, possibleJump2));  
                    } else if (!valid && valid2) {
                        console.log("!valid && valid2")
                        possibleJump2.addEventListener('click', handleClick2(move2, possibleJump));  
                    }

                    break;
                case 'H':
                    console.log("you can go " + boardRows[--row] + " to G");
                    possibleJump = document.querySelector("#"+boardRows[canGoUP]+"-G");
                    possibleJump.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';

                    move = new Move(row, col, canGoUP, 6);
                    //console.log(JSON.stringify(move));
                    valid = makeMovePlayer1(move);
                    if(valid){
                        possibleJump.addEventListener('click', handleClick(move));  
                    }
                    break;
            }
        }

    } else{
        console.log(`Player 2 clicked on piece (${boardRows[row]}, ${boardCols[col]}, ${pieceColor}, plays first:${goesFirst})`);

    }
}

//Game handling functions
function handleClick(move) {
    // This is the actual event handler function
    return function handleClick() {
        // Remove the event listener after the click is handled if needed
        this.removeEventListener('click', handleClick);
        this.style.backgroundColor = '';
        game.player1.movePiece(move);
    };
}

function handleClick2(move, element) {
    // This is the actual event handler function
    return function handleClick2() {
        // Remove the event listener after the click is handled if needed
        this.removeEventListener('click', handleClick2);
        this.style.backgroundColor = '';
        element.removeEventListener('click', handleClick2);
        element.style.backgroundColor = '';
        game.player1.movePiece(move);

    };
}


const Purayah = {
    PLAYER1: 'PLAYER1',
    PLAYER2: 'PLAYER2'
};

const Piece = {
    EMPTY: 'EMPTY',
    PLAYER1_PIECE: 'PLAYER1_PIECE',
    PLAYER2_PIECE: 'PLAYER2_PIECE',
    PLAYER1_KING: 'PLAYER1_KING',
    PLAYER2_KING: 'PLAYER2_KING'
}

class Move{
    constructor(fromRow, fromCol, toRow, toCol){
        this.fromRow = fromRow;
        this.fromCol = fromCol; 
        this.toRow = toRow; 
        this.toCol = toCol;
    }
}

function makeMovePlayer1(move){
    if(gameBoard[move.toRow][move.toCol] == "."){
        gameBoard[move.fromRow][move.fromCol] = '.';
        gameBoard[move.toRow][move.toCol] = "o";
        console.log(gameBoard);
        return true;
    } else if(gameBoard[move.toRow][move.toCol] == "x") {
        //JUMP CHECK
        if(gameBoard[move.toRow-1][move.toCol+1] == "."){
            gameBoard[move.fromRow][move.fromCol] = '.';
            gameBoard[move.toRow-1][move.toCol+1] = "o";
            gameBoard[move.toRow][move.toCol] == "."; //Player 2 looses a piece
            console.log(gameBoard);
            return true;
        }  
    } else {
        console.log("invalid");
        return false;
    }
}