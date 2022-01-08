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
      GameController.playRound(e.target.dataset.boxIndex);
      updateDisplay(e);
      // play round
      // check winner
    })
  );
  const updateDisplay = (e) => {
    e.target.textContent = `${PlayerController.getCurrentPlayer().marker}`;
  };
  return { updateDisplay };
})();
const GameController = (() => {
  let round = 1;
  const playRound = (index) => {
    GameBoard.setMarker(index, PlayerController.getCurrentPlayer().marker);
    // check winner
    // increse the round
    round++;
  };
  return { round, playRound };
})();
const PlayerController = (() => {
  const playerOne = Player("O");
  const playerTwo = Player("X");
  const currentPlayer = playerOne;
  return { playerOne, playerTwo, getCurrentPlayer: () => currentPlayer };
})();
