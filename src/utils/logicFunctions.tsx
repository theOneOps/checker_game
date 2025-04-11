import {
  BoardType,
  Case,
  COLOR,
  historyGameType,
  LENGTH,
  positionType,
} from "./types";

// eslint-disable-next-line react-refresh/only-export-components
export const hasAnyCanTake = (board: BoardType) => {
  return board.some((col) => col.some((cell) => cell.canTake === true));
};

export function clickedFillCase(
  board: BoardType,
  position: positionType
): BoardType {

  let newGrid : BoardType = []
  const { x, y } = position;

  if (!hasAnyCanTake(board))
  {
    newGrid = board.map((col) =>
      col.map((cell) => ({
        ...cell,
        isClicked: false,
        canMoveHere: false,
        canTake:false,
        canDisappear:false
      }))
    );

    if (newGrid[y][x].type === "filled") {
      newGrid[y][x].isClicked = true;
    }

    const diagonalsMovableCases = allDiagonalMoveHere(board, position);

    diagonalsMovableCases.forEach(({ x, y }) => {
      if (newGrid[y][x].type === "empty") {
        newGrid[y][x].canMoveHere = true;
      }
    });
  }
  else
  {
    newGrid = board.map((col) =>
      col.map((cell) => ({
        ...cell,
      }))
    );

    if (newGrid[y][x].type === "filled") {
      newGrid[y][x].isClicked = true;
    }
  }

  return newGrid;
}

export function isPositionOnBoard(position: positionType): boolean {
  const { x, y } = position;
  return x >= 0 && x <= LENGTH - 1 && y >= 0 && y <= LENGTH - 1 ? true : false;
}

export function allDiagonalMoveHere(
  board: BoardType,
  position: positionType
): positionType[] {
  const results: positionType[] = [];

  function addOnBoard({ x, y }: positionType) {
    if (isPositionOnBoard({ x, y })) {
      // if (board[y][x].type === "filled")
      // {
      //   results.push({ x, y });
      //   return
      // }
      if (board[y][x].type === "empty") results.push({ x, y });
    }
  }

  const { x, y } = position;

  // if a queen then add the others two possibilities too
  if (board[y][x].color === COLOR.White) {
    addOnBoard({ x: x - 1, y: y - 1 });
    addOnBoard({ x: x - 1, y: y + 1 });
  } else {
    addOnBoard({ x: x + 1, y: y - 1 });
    addOnBoard({ x: x + 1, y: y + 1 });
  }

  // diagonal top left

  // diagonal top right

  // we do this ⬇️ only for a queen pawn

  // // diagonal bottom left

  // addOnBoard({x:x-1, y:y+1})

  // // diagonal bottom right
  // addOnBoard({x:x+1, y:y+1})

  console.log(results);

  return results;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getCellBgClass = ({
  Row,
  i,
  j,
}: {
  Row: Case;
  i: number;
  j: number;
}) => {
  if (Row.isClicked || Row.canMoveHere) return "bg-green-900";
  return (i + j) % 2 === 0 ? "bg-amber-200" : "bg-orange-950";
};

export function ChangePosition(
  board: BoardType,
  color: COLOR,
  currentPosition: positionType,
  newPosition: positionType,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setGameRound: React.Dispatch<React.SetStateAction<number>>,
  historyGame: historyGameType | undefined,
  setHistoryGame: React.Dispatch<
    React.SetStateAction<historyGameType | undefined>
  >,
  canTake: boolean
) {
  const { x, y } = currentPosition;

  if (board[y][x].isClicked === true && board[y][x].color === color) {
    if (board[newPosition.y][newPosition.x].canMoveHere === true) {
      setBoard((prevBoard) => {
        const newBoard: BoardType = prevBoard.map((col) =>
          col.map((cell) => ({
            ...cell,
            canMoveHere: false,
            isClicked: false,
            canTake: false,
            canDisappear: false,
          }))
        );

        // Déplacement du pion
        newBoard[newPosition.y][newPosition.x] = {
          ...newBoard[newPosition.y][newPosition.x],
          type: "filled",
          color: newBoard[y][x].color,
        };

        newBoard[y][x] = {
          type: "empty",
        };

        // Supprimer le pion adverse s'il y a eu prise
        if (canTake) {
          const dx = (newPosition.x - currentPosition.x) / 2;
          const dy = (newPosition.y - currentPosition.y) / 2;
          const takenX = currentPosition.x + dx;
          const takenY = currentPosition.y + dy;

          if (
            isPositionOnBoard({ x: takenX, y: takenY }) &&
            newBoard[takenY][takenX].type === "filled" &&
            newBoard[takenY][takenX].color !== color
          ) {
            newBoard[takenY][takenX] = {
              type: "empty",
            };
          }
        }

        setGameRound((round) => round + 1);

        // Met à jour l’historique
        if (historyGame !== undefined) {
          const newHistoryGame = [...historyGame];
          setHistoryGame([...newHistoryGame, [currentPosition, newPosition]]);
        } else {
          setHistoryGame([[currentPosition, newPosition]]);
        }

        return newBoard;
      });
    }
  }
}


// eslint-disable-next-line react-refresh/only-export-components
export function moveFunc(
  gameRound: number,
  currentPosition: positionType,
  newPosition: positionType,
  board: BoardType,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setGameRound: React.Dispatch<React.SetStateAction<number>>,
  historyGame: historyGameType | undefined,
  setHistoryGame: React.Dispatch<
    React.SetStateAction<historyGameType | undefined>
  >,
  canTake:boolean
) {
  if (gameRound % 2 == 0) {
    ChangePosition(
      board,
      COLOR.White,
      currentPosition,
      newPosition,
      setBoard,
      setGameRound,
      historyGame,
      setHistoryGame,
      canTake
    );
    updateBoardWithWinning(setBoard, COLOR.Black);
  } else {
    ChangePosition(
      board,
      COLOR.Black,
      currentPosition!,
      newPosition,
      setBoard,
      setGameRound,
      historyGame,
      setHistoryGame,
      canTake
    );
    updateBoardWithWinning(setBoard, COLOR.White);
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function checkIfShouldPlay(
  board: BoardType,
  { x, y }: positionType,
  gameRound: number,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<positionType | undefined>
  >
) {
  if (gameRound % 2 == 0) {
    if (board[y][x].color === COLOR.White)
      clickFillCase(board, { x, y }, setBoard, setCurrentPosition);
  } else {
    if (board[y][x].color === COLOR.Black)
      clickFillCase(board, { x, y }, setBoard, setCurrentPosition);
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function clickFillCase(
  board: BoardType,
  { x, y }: positionType,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<positionType | undefined>
  >
) {
  if (board[y][x].isClicked == true) return;

  setBoard((prevBoard) => {
    const newBoard = clickedFillCase(prevBoard, { x, y });
    setCurrentPosition({ x, y });
    return newBoard;
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export function updateBoardWithWinning(
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  nextPlayer: COLOR
) {
  setBoard((prevBoard) => {
    const newBoard = prevBoard.map((col) =>
      col.map((cell) => ({ ...cell }))
    );

    function applyModif(x: number, y: number, dx: number, dy: number) {
      const adversePos: positionType = { x: x + dx, y: y + dy };

      const nextPos: positionType = {
        x: adversePos.x + dx,
        y: adversePos.y + dy,
      };

      if (isPositionOnBoard(adversePos) && isPositionOnBoard(nextPos)) {
        if (
          newBoard[nextPos.y][nextPos.x].type === "empty" &&
          newBoard[adversePos.y][adversePos.x].type === "filled" &&
          newBoard[adversePos.y][adversePos.x].color !== nextPlayer
        ) {
          newBoard[adversePos.y][adversePos.x].canDisappear = true;
          newBoard[nextPos.y][nextPos.x].canMoveHere = true;
          newBoard[y][x].canTake = true;
        }
      }
    }

    for (let j = 0; j < newBoard.length; j++) {
      //y
      for (let i = 0; i < newBoard[j].length; i++) {
        //x
        if (nextPlayer === COLOR.White) {
          if (
            newBoard[j][i].color !== undefined &&
            newBoard[j][i].color === nextPlayer
          ) {
            applyModif(i, j, -1, -1);
            applyModif(i, j, -1, 1);
          }
        } else {
          if (
            newBoard[j][i].color !== undefined &&
            newBoard[j][i].color === nextPlayer
          ) {
            applyModif(i, j, 1, -1);
            applyModif(i, j, 1, 1);
          }
        }
      }
    }

    return newBoard;
  });
}
