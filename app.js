const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const playAgainDiv = document.querySelector('.play-again');
const cellDivs = document.querySelectorAll('.game-cell');
const nameOverlay = document.querySelector('.name-overlay');
const startGameButton = document.querySelector('#startGame');
const player1NameInput = document.querySelector('#player1Name');
const player1XRadio = document.querySelector('#player1X');
const player1ORadio = document.querySelector('#player1O');
const player2NameInput = document.querySelector('#player2Name');
const player2XRadio = document.querySelector('#player2X');
const player2ORadio = document.querySelector('#player2O');


// Game constants
const xSymbol = '×';
const oSymbol = '○';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// Game variables
let gameIsLive = true;
let xIsNext = true;
let playerXName = '';
let playerOName = '';


// Functions
function letterToSymbol(letter) {
  return letter === 'x' ? xSymbol : oSymbol;
}

//function for handling Win
function handleWin(letter, winningCombination) {
  gameIsLive = false;
  const winner = letter === 'x' ? playerXName : playerOName;
  statusDiv.innerHTML = `<strong>${winner} (${letterToSymbol(letter)}) has won!</strong>`;
  for (let i = 0; i < winningCombination.length; i++) {
    cellDivs[winningCombination[i]].classList.add('won');
  }
  playAgainDiv.style.display = 'block';
}

