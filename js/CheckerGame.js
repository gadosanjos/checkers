import Board from './createBoard.js';

class CheckersGame {
  constructor(container) {
    this.container = container;

    this.board = new Board();
    this.container.append(this.board);

    this.board.populate();
  }
  clear() {
    this.container.innerHTML = '';
  }

  restart() {
    this.clear();
    this.board = new Board();
    this.board.appendTo(this.container);
    this.board.populate();
  }

  start() {
    this.restart();
  }
}

export default CheckersGame;