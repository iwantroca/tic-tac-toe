const GameBoard = (() => {
  let round = 1;
  let settingDone = false;
  const board = new Array(9).fill("");
  const getIndex = (e) => {
    let index = e.target.dataset.boxIndex;
    console.log(index);
    return index;
  };
  const setIndex = (e) => {
    if (!GameBoard.board[getIndex(e)]) {
      GameBoard.board[getIndex(e)] = PlayerController.getCurrentPlayer().marker;
      e.target.textContent = PlayerController.getCurrentPlayer().marker;
      console.log(GameBoard.board);
      GameBoard.round += 1;
      settingDone = true;
    } else {
      settingDone = false;
    }
  };
  return {
    round,
    board,
    getIndex,
    setIndex,
    // settingDone,
    getSettingDone: () => settingDone,
  };
})();

const Player = (marker) => {
  return { marker };
};

const PlayerController = (() => {
  let playerO = Player("O");
  let playerX = Player("X");
  let currentPlayer = playerO;
  let switchPlayer = () => {
    if (currentPlayer == playerO) {
      currentPlayer = playerX;
    } else {
      currentPlayer = playerO;
    }
  };
  return {
    playerO,
    playerX,
    switchPlayer,
    getCurrentPlayer: () => currentPlayer,
    setCurrentPlayer: (val) => (currentPlayer = val),
  };
})();
// 4. Add a test to check for win condition each time
const GameController = (() => {
  const updateGame = () => {
    let boxes = document.querySelectorAll(".board-box");
    [...boxes].forEach((x) => {
      x.addEventListener("click", (e) => {
        if (GameBoard.getSettingDone()) {
          PlayerController.switchPlayer();
        } else if (GameBoard.round === 1) {
          PlayerController.getCurrentPlayer(PlayerController.playerO);
        }
        GameBoard.getIndex(e);
        GameBoard.setIndex(e);
        console.log(GameBoard.board);
      });
    });
  };
  return { updateGame };
})();
GameController.updateGame();
