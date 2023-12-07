import Board from "./Board.js";

class Game {
  constructor(size, container) {
    this.container = container;
    this.board = new Board(size);
    this.container.append(this.board.section);
    this.start();
  }

  start() {
    this.board.createBoard();
  }
}

export default Game;
