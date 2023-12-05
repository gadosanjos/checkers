document.addEventListener("DOMContentLoaded", function () {
    let body = document.querySelector('body');
    let start = new CheckersGame(body);
});

class CheckersGame {
    constructor(container){
        this.container = container;

        this.board = new Board();
        this.board.appendTo(this.container);

        this.board.populate();
    }
    clear(){
        this.container.innerHTML = "";
    }
}

class Board {
    constructor(){
        this.section = document.createElement('section');
        this.table = document.createElement('table');
        this.table.className = 'board';

        this.section.append(this.table);

        for(let row = 0; row < 8; row++){
            let tr = document.createElement('tr');

            for(let col = 0; col < 8; col++){
                const field = this.createField(row, col);
                tr.append(field);
            }

            this.table.append(tr);
        }

    }

    createField(row, col){
        const td = document.createElement('td');
        td.className = 'field ';
        let dark = Boolean((row + col)%2);
        if (dark) {
            td.className += 'dark-field';
        } else {
            td.className += 'light-field';
        }
        td.setAttribute('data', row * 8 + col)
        return td;
    }

    populate(){
        let num = 0;
    }

    appendTo(container){    
        container.append(this.section);
    }
}
