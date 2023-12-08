class Checkers {
    constructor() {
      this.board = this.createBoard();
      this.populateBoard();
    }
  
    createBoard() {
      const boardContainer = document.getElementById('board-container');
      const board = [];
      for (let row = 0; row < 8; row++) {
        const rowArray = [];
        for (let col = 0; col < 8; col++) {
          const cell = this.createCell(row, col);
          rowArray.push(cell);
          boardContainer.appendChild(cell);
        }
        board.push(rowArray);
      }
      return board;
    }
  
    createCell(row, col) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', () => this.handleCellClick(row, col));
      return cell;
    }
    movePiece(){
        
    }
    createPiece() {
      const piece = document.createElement('div');
      piece.className = 'piece';
      return piece;
    }
  
    populateBoard() {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
          if ((row + col) % 2 === 1) {
            const piece = this.createPiece();
            this.board[row][col].appendChild(piece);
          }
        }
      }
  
      for (let row = 5; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if ((row + col) % 2 === 1) {
            const piece = this.createPiece();
            this.board[row][col].appendChild(piece);
          }
        }
      }
    }
  
    handleCellClick(row, col) {
      console.log(`Clicked on cell (${row}, ${col})`);
    }
  }
  
  const checkersGame = new Checkers();
