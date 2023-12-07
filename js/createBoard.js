import Game from './Game.js';

document.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('div');
    const checkers = new Game(8, body);
});