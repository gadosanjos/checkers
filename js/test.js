let btn = document.querySelector('button');

btn.addEventListener('click', function () {
    let body = document.querySelector('div');
    body.innerHTML = '';
    let start = new CheckersGame(body);
});

class CheckersGame {
    constructor(container) {
        this.container = container;

        this.board = this.createBoard(container);
        this.populateBoard();

    }

    createBoard(container) {
        const boardContainer = container;
        const table = document.createElement('table');
        table.className = 'board';

        for (let row = 0; row < 8; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < 8; col++) {
                const cell = this.createCell(row, col);
                tr.appendChild(cell);
          }
          table.appendChild(tr);
        }
        boardContainer.appendChild(table);
        return table;
    }

    createCell(row, col) {
        const td = document.createElement('td')
        td.className = 'cell';
        td.dataset.row = row;
        td.dataset.col = col;
        let dark = Boolean((row + col)%2);
        if (dark) {
            td.className += ' dark-field';
        } else {
            td.className += ' light-field';
        }
        td.addEventListener('click', () => this.handleCellClick(row, col));
        return td;
    }

    createPiece() {
        const piece = document.createElement('div');
        piece.className = 'piece';
        return piece;
    }

    populateBoard(collorT, collorB) {
        collorT = "red";
        collorB = "blue";
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
              const piece = this.createPiece();
              piece.className += " " + collorT;
              piece.addEventListener('click', () => this.handlePieceClick(row, col, collorT, false))
              this.board.rows[row].cells[col].appendChild(piece);
            }
          }
        }
    
        for (let row = 5; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 1) {
              const piece = this.createPiece();
              piece.className += " " + collorB;
              piece.addEventListener('click', () => this.handlePieceClick(row, col, collorB, true))
              this.board.rows[row].cells[col].appendChild(piece);
            }
          }
        }
    }

    handleCellClick(row, col) {
        console.log(`Clicked on cell (${row}, ${col})`);
    }

    handlePieceClick(row, col, collorT, player1){
        if(player1){
            console.log(`You clicked on piece (${row}, ${col}, ${collorT})`);
        } else{
            console.log(`Player 2 clicked on piece (${row}, ${col}, ${collorT})`);
        }
        if(row%2 == 0){
            switch (col) {
                case 0:
                    console.log('you can go to 1');
                    break;
                case 2:
                    break;
                case 4:
                    break;
                case 6:
                    break;
            }
        } else {
            console.log(col);
        }
    }
}