import Field from './Field.js';
import Piece from './Piece.js';

class Board {
  constructor(size) {
    this.size = size;
    this.boardArray = [];
    this.selectedPiece = null;
    this.currentPlayer = null;
  }

  setColors(playerColor, opponentColor, boardType) {
    this.playerColor = playerColor;
    this.opponentColor = opponentColor;
    this._boardType = boardType;
    this._currentPlayer = this.playerColor;
  }

  createBoard(callback) {
    this.section = document.createElement('div');
    this.section.className = 'board';
    for (let row = 0; row < this.size; row++) {
      this.boardArray[row] = [];
      for (let col = 0; col < this.size; col++) {
        const field = new Field(
          row,
          col,
          this,
          this.playerColor,
          this.opponentColor,
          this.boardType
        );
        this.boardArray[row][col] = field;
        this.section.appendChild(this.boardArray[row][col].element);
      }
    }
    this.initializeBoard();
    if(callback){
      callback();
    }
  }

  initializeBoard() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if ((row + col) % 2 && row < 3) {
          const piece = new Piece(this, this.playerColor, row, col);
          this.boardArray[row][col].setPiece(piece, row, col);
        } else if ((row + col) % 2 && row > 4) {
          const piece = new Piece(this, this.opponentColor, row, col);
          this.boardArray[row][col].setPiece(piece, row, col);
        }
      }
    }
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get boardType() {
    return this._boardType;
  }

  set currentPlayer(color) {
    if (color === this.playerColor) {
      this._currentPlayer = this.opponentColor;
    }else{
      this._currentPlayer = this.playerColor;
    }
  }

  endGame() {
    if (this.firstPlayer === 0) {
      alert('Player 1 wins!');
      
      return true;
    } else if (this.secondPlayer === 0) {
      alert('Player 2 wins!');
      return true;
    }
  }
}

export default Board;
