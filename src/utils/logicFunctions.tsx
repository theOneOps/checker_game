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

// eslint-disable-next-line react-refresh/only-export-components
export function isPositionOnBoard(position: positionType): boolean {
  const { x, y } = position;
  return x >= 0 && x <= LENGTH - 1 && y >= 0 && y <= LENGTH - 1 ? true : false;
}

// eslint-disable-next-line react-refresh/only-export-components
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


// eslint-disable-next-line react-refresh/only-export-components
export function allDiagonalMoveHere(
  board: BoardType,
  position: positionType
): positionType[] {
  const results: positionType[] = [];

  function addOnBoard({ x, y }: positionType) {
    if (isPositionOnBoard({ x, y })) {
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

  console.log(results);

  return results;
}



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
  canTake: boolean,
  setLeftNbWhite: React.Dispatch<React.SetStateAction<number>>,
  setLeftNbBlack: React.Dispatch<React.SetStateAction<number>>
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
          color:undefined
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
            const oldColor = newBoard[takenY][takenX].color
            if (oldColor === COLOR.Black)
            {
              setLeftNbBlack(prevNb=> prevNb - 1)
            }
            else
            {
              setLeftNbWhite(prevNb=> prevNb - 1)
            }
            newBoard[takenY][takenX] = {
              type: "empty",
              color:undefined
            };

            if (historyGame !== undefined) {
              const newHistoryGame = [...historyGame];
              setHistoryGame([...newHistoryGame, [oldColor!, {x:takenX, y:takenY}, {x:-1,y:-1}]]);
            } else {
              setHistoryGame([[oldColor!, {x:takenX, y:takenY}, {x:-1,y:-1}]]);
            }
          }
        }

        setGameRound((round) => round + 1);

        // update history of moves played
        if (historyGame !== undefined) {
          const newHistoryGame = [...historyGame];
          setHistoryGame([...newHistoryGame, [color, currentPosition, newPosition]]);
        } else {
          setHistoryGame([[color, currentPosition, newPosition]]);
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
  canTake:boolean, 
  setLeftNbWhite: React.Dispatch<React.SetStateAction<number>>,
  setLeftNbBlack: React.Dispatch<React.SetStateAction<number>>
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
      canTake,
      setLeftNbWhite,
      setLeftNbBlack
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
      canTake,
      setLeftNbWhite,
      setLeftNbBlack
    );
    updateBoardWithWinning(setBoard, COLOR.White);
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function checkIfShouldPlay(
  getBoard: () => BoardType,
  { x, y }: positionType,
  gameRound: number,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<positionType | undefined>
  >
) {
  const board = getBoard(); // lecture au moment du clic
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
  if (board[y][x].isClicked === true) return;

  const updatedBoard = clickedFillCase(board, { x, y });
  setBoard(updatedBoard);             // first we update the board
  setCurrentPosition({ x, y });       // then we update the position
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


// eslint-disable-next-line react-refresh/only-export-components
export function goBack(
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setGameRound: React.Dispatch<React.SetStateAction<number>>,
  historyGame: historyGameType | undefined,
  setHistoryGame: React.Dispatch<React.SetStateAction<historyGameType | undefined>>,
) {
  if (!historyGame || historyGame.length === 0) return;

  const lastMove = historyGame[historyGame.length - 1];
  const [color, oldPos, newPos] = lastMove;

  setBoard((prevBoard) => {
    const newBoard: BoardType = prevBoard.map((row) =>
      row.map((cell) => ({
        ...cell,
        canMoveHere: false,
        canTake: false,
        canDisappear: false,
        isClicked: false,
      }))
    );

    if (newPos.x === -1 && newPos.y === -1) {
      // Un pion a été capturé → on le remet
      newBoard[oldPos.y][oldPos.x] = {
        type: "filled",
        color,
      };
    } else {
      // Sinon, on annule juste le déplacement
      newBoard[oldPos.y][oldPos.x] = {
        type: "filled",
        color,
      };

      newBoard[newPos.y][newPos.x] = {
        type: "empty",
      };
    }

    return newBoard;
  });

  // Mise à jour du tour et de l'historique
  setGameRound((round) => round - 1);
  setHistoryGame((prev) =>
    prev && prev.length > 0 ? prev.slice(0, prev.length - 1) : undefined
  );
}
