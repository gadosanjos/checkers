import Game from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
  let btn = document.querySelector('button');
  let game;
  let BOARD_SIZE = 8; //NOT IMPLEMENTED YET

  btn.addEventListener('click', function () {
    let selectPiece = document.getElementById('selectPiece');
    let selectBoard = document.getElementById('selectBoard');
    const selectedColor = selectPiece.value;
    const selectedBoard = selectBoard.value;
    let opponentColor = '';

    switch (selectedColor) {
      case 'white':
        opponentColor = 'black';
        break;
      case 'black':
        opponentColor = 'white';
        break;
      case 'red':
        opponentColor = 'blue';
        break;
      case 'blue':
        opponentColor = 'red';
        break;
      default:
        break;
    }

    // switch (selectedBoard) {
    //   case 'regular':
    //     lightType = 'white';
    //     darkType = 'black';
    //     break;
    //   case 'wood':
    //     lightType = 'light';
    //     darkType = 'dark';
    //     break;
    //   default:
    //     break;
    // }
    let body = document.querySelector('div');
    body.innerHTML = '';
    game = new Game(8, body);
  });
});
