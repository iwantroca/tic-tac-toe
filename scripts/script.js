const GameBoard = () => {
  const board = new Array(9).fill("");
  return { board };
};

const Player = (marker) => {
  return { marker };
};
let ticTacToe = GameBoard();
let playerOne = Player("O");

// add event listener to each box
let boxes = document.querySelectorAll(".board-box");
// 1. to get its index in array
//    -> to get the index add data-Index to html
// 2. and then check for player's turn
//    -> Start with O's turn and keep switching turn
// 3. as per player's turn insert that marker in the array as per the fetched index.
//    -> ticTacToe.board[index] = playerWithTurn.marker;
ticTacToe.board[3] = playerOne.marker;
console.log(ticTacToe.board);
