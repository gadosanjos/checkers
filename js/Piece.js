class Piece {
  constructor(color, row, col) {
    this.color = color;
    this.dame = false;
    this.row = row;
    this.col = col;
  }

  isDame() {
    this.dame = true;
  }

  getMoves() {
    const moves = [];
    let directions = [];
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

  highlightMoves() {
    const moves = this.getMoves();
    moves.forEach((move) => {
      const field = document.querySelector(
        `[data-row="${move.row}"][data-col="${move.col}"]`
      );
      field.classList.add('possible-move');
    });
  }
}

export default Piece;
