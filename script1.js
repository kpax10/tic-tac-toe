'use strict';

//Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

const player = (name, marker) => {
  return { name, marker }
}

const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  return { board };
})();




const displayController = (() => {
  const spaces = document.querySelectorAll('.space');
  const displayMarkers = () => {
    for (let i = 0; i < spaces.length; i++) {
      spaces[i].textContent = gameBoard.board[i]
    }
  }

  const displayPlayerTurn = (player) => {
    document.querySelector('span').textContent = player.name;
  }

  const restartButton = document.querySelector('button');
  restartButton.addEventListener('click', () => {
    gameBoard.board = ['', '', '', '', '', '', '', '', ''];
    displayMarkers();
    spaces.forEach(element => {
      element.addEventListener('click', game.displayListener)
    });
  })

  return { spaces, displayMarkers, displayPlayerTurn }
})();





const game = (() => {

  const checkWinStatus = () => {
    //loop over board array, if win conditions exist, announce winner
    const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
    const board = gameBoard.board;
    const isFull = board.every(cell => cell.length === 1)

    for (let i = 0; i < winConditions.length; i++) {
      if (board[winConditions[i][0]].includes('X') && board[winConditions[i][0]] === 'X' && board[winConditions[i][1]] === 'X' && board[winConditions[i][2]] === 'X') {
        // suspend game once player 'X' wins
        gameOver(player1);
        console.log('x wins');
        return
      }
      if (board[winConditions[i][0]].includes('O') && board[winConditions[i][0]] === 'O' && board[winConditions[i][1]] === 'O' && board[winConditions[i][2]] === 'O') {
        // suspend game once player 'O' wins
        gameOver(player2);
        console.log('o wins');
        return
      }
      if (isFull) {
        return console.log('draw');
      }
    }
  }

  const gameOver = () => {
    console.log(`${player.name} wins!`);

    displayController.spaces.forEach(element => {
      element.removeEventListener('click', displayListener)
    })
  }

  let player = player1;

  const displayListener = (e) => {
    // add player marker to gameBoard array based on element's index
    let index = Array.from(displayController.spaces).indexOf(e.target);

    if (gameBoard.board[index] === '') {
      gameBoard.board[index] = player.marker;
      displayController.displayMarkers();
      checkWinStatus(); // load markers
      player === player1 ? player = player2 : player = player1; // change players
      displayController.displayPlayerTurn(player)
    } else return
  }



  displayController.spaces.forEach(element => {
    element.addEventListener('click', displayListener)
  });
  return { player, displayListener }
})()