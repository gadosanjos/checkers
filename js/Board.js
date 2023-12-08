import Field from './Field.js';
import Piece from './Piece.js';

class Board {
  constructor(size) {
    this.size = size;
    this.boardArray = [];
    this.createBoard();
    this.selectedPiece = null;
    this.currentPlayer = 'black';
  }

  createBoard() {
    this.section = document.createElement('div');
    this.section.className = 'board';
    for (let row = 0; row < this.size; row++) {
      this.boardArray[row] = [];
      for (let col = 0; col < this.size; col++) {
        const field = new Field(
          row,
          col,
          this,
        );
        this.boardArray[row][col] = field;
        this.section.appendChild(this.boardArray[row][col].element);
      }
    }
    this.initializeBoard();
  }

  initializeBoard() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if ((row + col) % 2 && row < 3) {
          const piece = new Piece('black', row, col);
          this.boardArray[row][col].setPiece(piece, row, col);
        } else if ((row + col) % 2 && row > 4) {
          const piece = new Piece('white', row, col);
          this.boardArray[row][col].setPiece(piece, row, col);
        }
      }
    }
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  set currentPlayer(color) {
    this._currentPlayer = color;
  }

  endGame() {
    if (this.blackPiece === 0) {
      alert('White wins!');
      return true;
    } else if (this.whitePiece === 0) {
      alert('Black wins!');
      return true;
    }
  }
}

export default Board;
