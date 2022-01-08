const Player = (marker) => {
  return { marker };
};
const GameBoard = (() => {
  let board = new Array(9).fill("");
  const setMarker = (index, marker) => {
    board[index] = marker;
    console.log(board);
  };
  return { board, setMarker };
})();
const DisplayController = (() => {
  const boxes = document.querySelectorAll(".board-box");

  boxes.forEach((box) =>
    box.addEventListener("click", (e) => {
      if (GameController.getGameOver() || e.target.textContent) return;
      GameController.playRound(e.target.dataset.boxIndex);
      updateDisplay(e);
      if (GameController.getResult())
        console.log(`${GameController.getResult()} is the winner`);
      PlayerController.switchPlayer();
    })
  );
  const updateDisplay = (e) => {
    e.target.textContent = `${PlayerController.getCurrentPlayer().marker}`;
  };
  return { updateDisplay };
})();
const PlayerController = (() => {
  const playerOne = Player("O");
  const playerTwo = Player("X");
  let currentPlayer = playerOne;
  const switchPlayer = () => {
    if (currentPlayer == playerOne) currentPlayer = playerTwo;
    else {
      currentPlayer = playerOne;
    }
  };
  return {
    playerOne,
    playerTwo,
    getCurrentPlayer: () => currentPlayer,
    switchPlayer,
  };
})();

const GameController = (() => {
  let round = 1;
  let gameOver = false;
  const playRound = (index) => {
    GameBoard.setMarker(index, PlayerController.getCurrentPlayer().marker);
    round++;
  };
  const getResult = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let result = winConditions.some((indices) => {
      return (
        GameBoard.board[indices[0]] ===
          PlayerController.getCurrentPlayer().marker &&
        GameBoard.board[indices[1]] ===
          PlayerController.getCurrentPlayer().marker &&
        GameBoard.board[indices[2]] ===
          PlayerController.getCurrentPlayer().marker
      );
    });
    if (result) {
      gameOver = true;
      return PlayerController.getCurrentPlayer().marker;
    }
  };
  return {
    getRound: () => round,
    playRound,
    getResult,
    getGameOver: () => gameOver,
  };
})();
