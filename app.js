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

//function that checks the status of the game
function checkGameStatus() {
  const cells = [];
  for (let i = 0; i < cellDivs.length; i++) {
    cells.push(cellDivs[i].classList[1]);
  }

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    const [a, b, c] = combination;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      handleWin(cells[a], combination);
      return;
    }
  } 

  let isTie = true;
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i]) {
      isTie = false;
      break;
    }
  }

  if (isTie) {
    gameIsLive = false;
    statusDiv.innerHTML = `<strong>Game is tied!</strong>`;
    playAgainDiv.style.display = 'block';
  } else {
    xIsNext = !xIsNext;
    statusDiv.innerHTML = xIsNext ? `${playerXName} (${xSymbol}) is next` : `${playerOName} (${oSymbol}) is next`;
  }
}

//Resets the game state to the initial setup.
function handleReset() {
  for (let i = 0; i < cellDivs.length; i++) {
    cellDivs[i].classList.remove('x', 'o', 'won');
  }
  xIsNext = true;
  gameIsLive = true;
  statusDiv.innerHTML = `${playerXName} (${xSymbol}) is next`;
  playAgainDiv.style.display = 'block'; 
}

//Handles a click event on a game cell.
function handleCellClick(e) {
  if (!gameIsLive) return;

  const classList = e.target.classList;
  if (classList.contains('x') || classList.contains('o')) return;

  if (xIsNext) {
    classList.add('x');
  } else {
    classList.add('o');
  }
  checkGameStatus();
}

//Starts the game with the selected player names and symbols.
function startGame() {
    const player1Symbol = player1XRadio.checked ? 'x' : 'o';
    const player2Symbol = player2XRadio.checked ? 'x' : 'o';
  
  
    if (player1Symbol === player2Symbol) {
      alert("Players must choose different symbols!");
      return;
    }
  
  
    playerXName = player1Symbol === 'x' ? player1NameInput.value || 'Player 1' : player2NameInput.value || 'Player 2';
    playerOName = player1Symbol === 'o' ? player1NameInput.value || 'Player 1' : player2NameInput.value || 'Player 2';
  
  
    statusDiv.innerHTML = `${playerXName} (${xSymbol}) is next`;
    nameOverlay.style.display = 'none';
    playAgainDiv.style.display = 'none';
  }
  

//Handles the action of playing the game again.
function handlePlayAgain() {
  nameOverlay.style.display = 'flex';
  playAgainDiv.style.display = 'none';
  handleReset();
}

