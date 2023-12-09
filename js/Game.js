import Board from './Board.js';
import Field from './Field.js';

class Game {
  constructor(size, container, playerColor, opponentColor, boardType) {
    this.container = container;
    this.board = new Board(size);
    this.board.setColors(playerColor, opponentColor, boardType);
    this.board.createBoard(() => {
      this.start();
    });
  }

  start() {
    this.container.append(this.board.section);
  }
}

export default Game;
