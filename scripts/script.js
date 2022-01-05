const GameBoard = (() => {
  let round = 1;
  const board = new Array(9).fill("");
  const getIndex = (e) => {
    let index = e.target.dataset.boxIndex;
    console.log(index);
    return index;
  };
  const setIndex = (e) => {
    GameBoard.board[getIndex(e)] = PlayerController.getCurrentPlayer().marker;
    console.log(GameBoard.board);
  };
  return { round, board, getIndex, setIndex };
})();

const Player = (marker) => {
  const activePlayer = false;
  return { marker, activePlayer };
};

const PlayerController = (() => {
  let playerO = Player("O");
  let playerX = Player("X");
  let currentPlayer;
  let switchPlayer = () => {
    if (currentPlayer == undefined || !playerO.activePlayer) {
      playerO.activePlayer = true;
      playerX.activePlayer = false;
      currentPlayer = playerO;
    } else if (playerO.activePlayer && !playerX.activePlayer) {
      playerX.activePlayer = true;
      playerO.activePlayer = false;
      currentPlayer = playerX;
    }
  };

  return {
    playerO,
    playerX,
    switchPlayer,
    getCurrentPlayer: () => currentPlayer,
  };
})();

const newGameController = (() => {
  const updateRound = () => {
    GameBoard.round += 1;
    console.log(GameBoard.round);
  };
  return { updateRound };
})();

// add event listener to each box
// 1. to get its index in array
//    -> to get the index add data-Index to html
// 2. and then check for player's turn
//    -> Start with O's turn and keep switching turn
// 3. as per player's turn insert that marker in the array as per the fetched index.
//    -> ticTacToe.board[index] = playerWithTurn.marker;

const GameController = (() => {
  const updateGame = () => {
    let boxes = document.querySelectorAll(".board-box");
    [...boxes].forEach((x) => {
      x.addEventListener("click", (e) => {
        PlayerController.switchPlayer();
        GameBoard.getIndex(e);
        GameBoard.setIndex(e);
        console.log(GameBoard.board);
      });
    });
  };
  return { updateGame };
})();
