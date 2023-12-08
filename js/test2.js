const BOARD_SIZE = 8;

const Player = {
  PLAYER1: 0,
  PLAYER2: 1,
};

const Piece = {
  EMPTY: 0,
  PLAYER1_PIECE: 1,
  PLAYER2_PIECE: 2,
  PLAYER1_KING: 3,
  PLAYER2_KING: 4,
};

class Move {
  constructor(fromRow, fromCol, toRow, toCol) {
    this.fromRow = fromRow;
    this.fromCol = fromCol;
    this.toRow = toRow;
    this.toCol = toCol;
  }
}

class CheckersGame {
  constructor() {
    this.currentPlayer = Player.PLAYER1;
    this.board = this.initializeBoard();
  }

  initializeBoard() {
    const board = Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => Piece.EMPTY)
    );

    for (let row = 0; row < BOARD_SIZE; ++row) {
      for (let col = 0; col < BOARD_SIZE; ++col) {
        if ((row + col) % 2 == 1) {
          if (row < 3) board[row][col] = Piece.PLAYER1_PIECE;
          else if (row > BOARD_SIZE - 4) board[row][col] = Piece.PLAYER2_PIECE;
        }
      }
    }

    return board;
  }

  printBoard() {
    for (let row = 0; row < BOARD_SIZE; ++row) {
      for (let col = 0; col < BOARD_SIZE; ++col) {
        switch (this.board[row][col]) {
          case Piece.EMPTY:
            process.stdout.write(". ");
            break;
          case Piece.PLAYER1_PIECE:
            process.stdout.write("X ");
            break;
          case Piece.PLAYER2_PIECE:
            process.stdout.write("O ");
            break;
          case Piece.PLAYER1_KING:
          case Piece.PLAYER2_KING:
            process.stdout.write("K ");
            break;
        }
      }
      console.log();
    }
  }

  isValidMove(player, move) {
    // Check if the move is within the bounds of the board
    if (
      move.fromRow < 0 ||
      move.fromRow >= BOARD_SIZE ||
      move.fromCol < 0 ||
      move.fromCol >= BOARD_SIZE ||
      move.toRow < 0 ||
      move.toRow >= BOARD_SIZE ||
      move.toCol < 0 ||
      move.toCol >= BOARD_SIZE
    ) {
      return false;
    }

    // Check if the piece at the starting position belongs to the current player
    if (
      player === Player.PLAYER1 &&
      (this.board[move.fromRow][move.fromCol] !== Piece.PLAYER1_PIECE &&
        this.board[move.fromRow][move.fromCol] !== Piece.PLAYER1_KING)
    ) {
      return false;
    }

    if (
      player === Player.PLAYER2 &&
      (this.board[move.fromRow][move.fromCol] !== Piece.PLAYER2_PIECE &&
        this.board[move.fromRow][move.fromCol] !== Piece.PLAYER2_KING)
    ) {
      return false;
    }

    // Check if the destination is an empty space
    if (this.board[move.toRow][move.toCol] !== Piece.EMPTY) {
      return false;
    }

    // Check if the move is diagonal
    const rowDiff = Math.abs(move.toRow - move.fromRow);
    const colDiff = Math.abs(move.toCol - move.fromCol);
    if (rowDiff !== colDiff || rowDiff !== 1) {
      return false;
    }

    return true;
  }

  isCaptureMove(player, move) {
    // Check if the move is capturing an opponent's piece
    const rowDiff = Math.abs(move.toRow - move.fromRow);
    const colDiff = Math.abs(move.toCol - move.fromCol);

    if (rowDiff === 2 && colDiff === 2) {
      const capturedRow = (move.toRow + move.fromRow) / 2;
      const capturedCol = (move.toCol + move.fromCol) / 2;

      if (
        player === Player.PLAYER1 &&
        (this.board[capturedRow][capturedCol] === Piece.PLAYER2_PIECE ||
          this.board[capturedRow][capturedCol] === Piece.PLAYER2_KING)
      ) {
        return true;
      }

      if (
        player === Player.PLAYER2 &&
        (this.board[capturedRow][capturedCol] === Piece.PLAYER1_PIECE ||
          this.board[capturedRow][capturedCol] === Piece.PLAYER1_KING)
      ) {
        return true;
      }
    }

    return false;
  }

  isKingRow(row, player) {
    // Check if a piece is in the king row for the current player
    if (player === Player.PLAYER1 && row === BOARD_SIZE - 1) {
      return true;
    }

    if (player === Player.PLAYER2 && row === 0) {
      return true;
    }

    return false;
  }

  makeKing(player, row, col) {
    // Make a piece at a given position a king
    if (player === Player.PLAYER1) {
      this.board[row][col] = Piece.PLAYER1_KING;
    } else {
      this.board[row][col] = Piece.PLAYER2_KING;
    }
  }

  makeMove(player, move) {
    if (!this.isValidMove(player, move)) {
      return false;
    }

    // Make the move
    this.board[move.toRow][move.toCol] = this.board[move.fromRow][move.fromCol];
    this.board[move.fromRow][move.fromCol] = Piece.EMPTY;

    // Check for a capture move
    if (this.isCaptureMove(player, move)) {
      const capturedRow = (move.toRow + move.fromRow) / 2;
      const capturedCol = (move.toCol + move.fromCol) / 2;

      this.board[capturedRow][capturedCol] = Piece.EMPTY;
    }

    // Check for kinging
    if (this.isKingRow(move.toRow, player)) {
      this.makeKing(player, move.toRow, move.toCol);
    }

    // Switch to the next player
    this.currentPlayer = this.currentPlayer === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1;

    return true;
  }

  isGameOver() {
    // Check if one of the players has no pieces left
    let player1PiecesLeft = false;
    let player2PiecesLeft = false;

    for (let row = 0; row < BOARD_SIZE; ++row) {
      for (let col = 0; col < BOARD_SIZE; ++col)