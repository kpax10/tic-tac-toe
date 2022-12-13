'use strict';

//Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.


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
  return { spaces, displayMarkers }
})();



const player = (name, marker) => {
  return { name, marker }
}

const player1 = player('player1', 'X');
const player2 = player('player2', 'O');

const game = (() => {
  const checkWinStatus = () => {
    //loop over board array, if win conditions exist, announce winner
    var winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]
    ]
    // if (arr[0] === player.marker)
    // NOT WORKING
    for (let i = 0; i < winConditions.length - 1; i++) {
      for (let j = 0; j < winConditions[i].length; j++) {
        if (gameBoard.board[i] === 'X') console.log('win');
        // if (arr[j] === 'X') {
        //   console.log("winner");
        // } else return
      }
    }
  }

  let player = player1;

  displayController.spaces.forEach(element => {
    element.addEventListener('click', (e) => {
      // add player marker to gameBoard array based on element's index
      let index = Array.from(displayController.spaces).indexOf(e.target);

      if (gameBoard.board[index] === '') {
        gameBoard.board[index] = player.marker;
        player === player1 ? player = player2 : player = player1; // change players
        displayController.displayMarkers();
        checkWinStatus(); // load markers
      } else return
    })
  });
  return { player }
})()



// gameBoard.board[5] = 'x';
// displayController.displayMarkers();
// gameBoard.board[6] = 'o';
// displayController.displayMarkers();
// console.log(player1.marker);