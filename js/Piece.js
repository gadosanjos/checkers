class Piece {
  constructor(color, row, col) {
    this.color = color;
    this.dame = false;
    this.row = row;
    this.col = col;
  }

  isDame() {
    return this.dame = true;
  }
  
  getMoves() {
    const moves = [];
    let directions = [];
    if (this.dame) {
      directions = [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
      directions.forEach((direction) => {
        const row = this.row + direction[0];
        const col = this.col + direction[1];
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
          moves.push({ row, col });
        }
      });
    } else
    if (this.color === 'black') {
      directions = [
        [1, 1],
        [1, -1],
      ];
      directions.forEach((direction) => {
        const row = this.row + direction[0];
        const col = this.col + direction[1];
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
          moves.push({ row, col });
        }
      });
    } else if (this.color === 'white') {
      directions = [
        [-1, 1],
        [-1, -1],
      ];
      directions.forEach((direction) => {
        const row = this.row + direction[0];
        const col = this.col + direction[1];
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
          moves.push({ row, col });
        }
      });
    }
    return moves;
  }

  checkEat() {
    const moves = this.getMoves();
    let directions;
    let opponentColor = '';
    if (this.dame === true && this.color === 'black') {
      opponentColor = 'white';
      directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    } else if (this.dame === true && this.color === 'white') {
      opponentColor = 'black';
      directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    } else if (this.color === 'black') {
      opponentColor = 'white';
      directions = [[1, 1], [1, -1]];
    } else if (this.color === 'white'){
      opponentColor = 'black';
      directions = [[-1, 1], [-1, -1]];
    }

    for (const direction of directions) {
      let jumpRow = this.row + direction[0];
      let jumpCol = this.col + direction[1];
      let nextRow = jumpRow + direction[0];
      let nextCol = jumpCol + direction[1];

      if (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
        const jumpField = document.querySelector(`[data-row="${jumpRow}"][data-col="${jumpCol}"]`);
        const nextField = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`);

        if (jumpField.hasChildNodes() && !nextField.hasChildNodes()) {
          const jumpedPiece = jumpField.firstChild;

          if (jumpedPiece.classList.contains('piece') && jumpedPiece.classList.contains(opponentColor)) {
            moves.push({ row: nextRow, col: nextCol , eat: true, eatPiece: jumpedPiece.parentElement});
          }
        }
      }
    }
    return moves;
  }


  highlightMoves() {
    const moves = this.checkEat();
  
    if (moves.length > 0) {
      moves.forEach((move) => {
        const field = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
        if (field.hasChildNodes()) {
          field.classList.add('impossible-move');
        }else {
          field.classList.add('possible-move');
        }
      });
    } else {
      const regularMoves = this.getMoves();
      regularMoves.forEach((move) => {
        const field = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
        if (!field.hasChildNodes() || this instanceof Dame) {
          field.classList.add('possible-move');
        }
      });
    }
  }
  

  removePiece() {
    this.element.removeChild();
  }
}

export default Piece;
