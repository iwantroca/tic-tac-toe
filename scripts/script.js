const GameBoard = (() => {
  const board = new Array(9).fill("");
  let round = 1;
  let settingDone = false;
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
      if (getResult()) {
        console.log(`${PlayerController.getCurrentPlayer().marker} wins`);
      }
    } else {
      settingDone = false;
    }
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
        board[indices[0]] === PlayerController.getCurrentPlayer().marker &&
        board[indices[1]] === PlayerController.getCurrentPlayer().marker &&
        board[indices[2]] === PlayerController.getCurrentPlayer().marker
      );
    });
    return result;
  };
  return {
    round,
    board,
    getIndex,
    setIndex,
    getSettingDone: () => settingDone,
    getResult,
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
const GameController = (() => {
  const updateGame = () => {
    let boxes = document.querySelectorAll(".board-box");
    [...boxes].forEach((x) => {
      x.addEventListener("click", (e) => {
        if (GameBoard.getSettingDone()) {
          PlayerController.switchPlayer();
        }
        //  else if (GameBoard.round === 1) {
        //   PlayerController.getCurrentPlayer(PlayerController.playerO);
        // }
        GameBoard.getIndex(e);
        GameBoard.setIndex(e);
        console.log(GameBoard.board);
      });
    });
  };
  return { updateGame };
})();
GameController.updateGame();
// window.addEventListener("click", GameController.updateGame());
