import Piece from './Piece.js';

class Dame extends Piece {
  constructor(color) {
    super(color);
    this.element = document.createElement('div');
    this.element.className = `dame`;
  }
}
export default Dame;
