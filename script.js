'use strict;'
// player factory function
const createPlayer = (name, marker) => {
  return { name, marker }
}

// gameboard
const gameBoard = (() => {

  // generate board array
  let board = [];
  for (i = 0; i < 9; i++) {
    board.push('');
  }

  // display square for each array item
  let squares = document.querySelector('.squares');

  board.forEach(() => {
    const square = document.createElement('div');
    square.className = 'square';
    squares.appendChild(square);
  })

  // add event listeners on each square
  Array.from(squares.children).forEach((square, index) => {
    square.addEventListener('click', () => {
      // display active player marker
      square.textContent = game.activePlayer.marker;
      square.setAttribute('data', game.activePlayer.marker);
      // update array value to be that of active player
      board[index] = game.activePlayer.marker;
      // remove event listener from the marked index
      square.style.pointerEvents = 'none';
      // update remaining spots
      game.remainingSpots -= 1;
      // check winner
      game.checkWinner();
      //check remaining spots
      if (game.winnerDeclared === false) {
        if (game.remainingSpots > 0) {
          game.alertNextPlayer();
          game.nextPlayer();
        } else if (game.remainingSpots === 0) {
          game.declareTie();
        }
      }
    })
  })
  return { board }
})();

// game object
const game = (() => {
  const playerOne = createPlayer('Player 1', 'X');
  const playerTwo = createPlayer('Player 2', 'O');

  // initialize
  let activePlayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  // selectors
  let subText = document.querySelector('.subtext');
  let playerName = document.querySelector('.player-name');

  // winning conditions
  const winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check winner
  function checkWinner() {
    winningAxes.forEach((item, index) => {
      if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
        console.log('winner');
        subText.textContent = `${this.activePlayer.name} wins!`;
        this.winnerDeclared = true;
      }
    })
  }

  // alert next player
  function alertNextPlayer() {
    this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
  }

  // next player
  function nextPlayer() {
    this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    console.log('nextPlayer() ran');
    console.log('active player: ' + activePlayer.name);
  }

  // declare tie
  const declareTie = () => {
    subText.textContent = 'Tie game!';
  }

  return {
    activePlayer,
    remainingSpots,
    checkWinner,
    alertNextPlayer,
    nextPlayer,
    declareTie,
    winnerDeclared,
  }
})();
