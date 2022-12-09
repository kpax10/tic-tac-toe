'use strict';

//Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// Modules
const gameBoard = (() => {
  const board = ['X', 'O', '', '', '', '', '', '', ''];

  return { board };
})();

const displayController = (() => {
  const spaces = document.querySelectorAll('.space');

  for (let i = 0; i < spaces.length; i++) {
    spaces[i].textContent = gameBoard.board[i]
  }
  return { spaces }
})();

// gameBoard.board[0] = 'x'

// Factories
const player = (name, marker) => {
  return { name, marker }
}

const player1 = player('player1', 'X');
