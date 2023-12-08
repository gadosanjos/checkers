import Piece from './Piece.js';

class Dame extends Piece {
  constructor(color) {
    super(color);
    console.log(this)
    this.element.className.add(`dame`);
  }
}
export default Dame;
