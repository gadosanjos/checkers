import Dame from './Dame.js';

class Field {
  constructor(row, col, boardInstance) {
    this.selectedField = false;
    this.row = row;
    this.col = col;
    this.element = this.createField();
    this.piece = null;
    this.board = boardInstance;
    this.updateTable();
  }

  createField() {
    const field = document.createElement('div');
    field.classList.add('field');
    if ((this.row + this.col) % 2) {
      field.classList.add('dark-field');
    } else {
      field.classList.add('light-field');
    }
    field.dataset.row = this.row;
    field.dataset.col = this.col;
    const self = this;
    field.addEventListener('click', (e) => {
      console.log('before click', self.selectedField);
      if(self.selectedField === false) {
        self.selectField(e.target);
      } else {
        self.selectMove(e);
      }
      console.log('after click', this.selectedField);
    });
    
    return field;
  }

  setPiece(piece, row, col) {
    this.piece = piece;
    this.row = row;
    this.col = col;
    this.updateTable();
  }

  updateTable() {
    if (this.piece) {
      const piece = document.createElement('div');
      piece.classList.add('piece', this.piece.color);
      if (this.piece instanceof Dame) {
        piece.classList.add('dame');
      }
      this.element.innerHTML = '';
      this.element.appendChild(piece);
    } else {
      this.element.innerHTML = '';
    }
  }

  selectField(element) {
    if (this.selectedField === false && element.classList.contains('piece')) {
      if (
        this.piece.row === parseInt(element.parentNode.dataset.row) &&
        this.piece.col === parseInt(element.parentNode.dataset.col) &&
        this.board.currentPlayer === this.piece.color
      ) {
        this.selectedField = this.piece;
        const parentElement = element.parentNode;
        parentElement.classList.add('selected-field');
        this.selectedField.highlightMoves();
        console.log(this.selectedField);
      } else {
        console.log('not your turn');
      }
    } else {
      console.log('Select a piece first');
    }
  }

  selectMove(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    console.log(row, col, this.selectedField);
    if (this.selectedField) {
      const moves = this.selectedField.getMoves();
      const move = moves.find((move) => move.row === row && move.col === col);
      if (move) {
        this.selectedField.row = move.row;
        this.selectedField.col = move.col;
        this.setPiece(this.selectedField, move.row, move.col);
        this.selectedField = null;
        this.board.currentPlayer =
          this.board.currentPlayer === 'black' ? 'white' : 'black';
        this.board.boardArray.forEach((row) => {
          row.forEach((field) => {
            field.element.classList.remove('possible-move');
            field.element.classList.remove('selected-field');
          });
        });
      }
    }
  }
}

export default Field;
