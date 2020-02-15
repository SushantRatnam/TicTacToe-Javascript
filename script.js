const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let xTurn;
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const overlay = document.getElementById("overlay");
const messageText = document.querySelector("[data-message-text]");
const restart = document.querySelector(".restart");

function startGame() {
  xTurn = true;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClicked);
    cell.addEventListener("click", handleClicked, { once: true });
  });
  setBoardHoverClass();
  overlay.classList.remove("show");
}

function handleClicked(e) {
  const cellClicked = e.target;
  const addClass = xTurn ? X_CLASS : O_CLASS;
  placeMark(cellClicked, addClass);
  if (checkWin(addClass)) {
    endgame(false);
  } else if (isDraw()) {
    endgame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endgame(draw) {
  if (draw) {
    messageText.textContent = "Draw!";
  } else {
    messageText.textContent = `${xTurn ? "X's" : "O's"} Win`;
  }
  overlay.classList.add("show");
}

function placeMark(cellClicked, addClass) {
  cellClicked.classList.add(addClass);
}

function swapTurn() {
  xTurn = !xTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (xTurn) board.classList.add(X_CLASS);
  else board.classList.add(O_CLASS);
}

function checkWin(className) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(className);
    });
  });
}

restart.addEventListener("click", startGame);

startGame();
