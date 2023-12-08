let selectedFieldData = false;

class Field {
  constructor(row, col, boardInstance) {
    this.selectedField = false;
    this.row = row;
    this.col = col;
    this.element = this.createField();
    this.piece = null;
    this.board = boardInstance;
    this.updateTable();
    this.blackPiece = 12;
    this.whitePiece = 12;
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
    field.addEventListener('click', (e) => {
      if (selectedFieldData === false) {
        this.selectField(e.target);
      } else if (
        (selectedFieldData.piece.row ===
          parseInt(e.target.parentElement.dataset.row) &&
          selectedFieldData.piece.col ===
            parseInt(e.target.parentElement.dataset.col)) ||
        (selectedFieldData.piece.row === parseInt(e.target.dataset.row) &&
          selectedFieldData.piece.col === parseInt(e.target.dataset.col))
      ) {
        this.selectedField = false;
        selectedFieldData = false;
        this.removeHighlight();
      } else {
        this.selectMove(e);
      }
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
      if (this.piece.dame) {
        piece.classList.add('dame');
      }
      this.element.innerHTML = '';
      this.element.appendChild(piece);
    } else {
      this.element.innerHTML = '';
    }
  }

  selectField(element) {
    if (selectedFieldData === false && element.classList.contains('piece')) {
      if (
        this.piece.row === parseInt(element.parentNode.dataset.row) &&
        this.piece.col === parseInt(element.parentNode.dataset.col) &&
        this.board.currentPlayer === this.piece.color
      ) {
        selectedFieldData = {
          piece: this.piece,
        };
        const parentElement = element.parentNode;
        parentElement.classList.add('selected-field');
        this.selectedField = this.piece;
        this.selectedField.highlightMoves();
      } else {
        alert('not your turn');
      }
    } else {
      alert('Select a piece first');
    }
  }

  selectMove(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);
    this.selectedField = selectedFieldData.piece;
    if (this.selectedField) {
      const moves = this.selectedField.checkEat();
      const move = moves.find((move) => move.row === row && move.col === col);
      if (move) {
        if (move.eat) {
          move.eatPiece.innerHTML = '';
        }
        const previousField = document.querySelector(
          `[data-row="${this.selectedField.row}"][data-col="${this.selectedField.col}"]`
        );
        previousField.innerHTML = '';
        this.selectedField.row = move.row;
        this.selectedField.col = move.col;
        this.setPiece(this.selectedField, move.row, move.col);
        this.selectedField = false;
        selectedFieldData = false;
        this.checkDame();
        this.board.currentPlayer =
          this.board.currentPlayer === 'black' ? 'white' : 'black';
        this.removeHighlight();
        const blackPieces = document.querySelectorAll('.black');
        this.blackPiece = blackPieces.length;
        const whitePieces = document.querySelectorAll('.white');
        this.whitePiece = whitePieces.length;
        console.log(this.blackPiece, this.whitePiece);
      }
    }
  }

  removeHighlight() {
    const moves = document.querySelectorAll('.possible-move');
    moves.forEach((move) => {
      move.classList.remove('possible-move');
    });
    const noMoves = document.querySelectorAll('.impossible-move');
    noMoves.forEach((move) => {
      move.classList.remove('impossible-move');
    });
    document
      .querySelector('.selected-field')
      .classList.remove('selected-field');
  }

  checkDame() {
    if (
      this.piece.row === 0 ||
      (this.piece.row === 7 && this.piece.dame === false)
    ) {
      const row = parseInt(this.piece.row);
      if (row === 7 && this.piece.color === 'black') {
        this.piece.isDame();
        this.updateTable();
      } else if (row === 0 && this.piece.color === 'white') {
        this.piece.isDame();
        this.updateTable();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

export default Field;
