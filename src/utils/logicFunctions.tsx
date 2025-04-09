import { BoardType, Case, COLOR, LENGTH, positionType } from "./types";

export function clickedFillCase(
  board: BoardType,
  position: positionType
): BoardType {
  const newGrid: BoardType = board.map((col) =>
    col.map((cell) => ({
      ...cell,
      isClicked: false,
      canMoveHere: false,
    }))
  );

  const { x, y } = position;

  if (newGrid[y][x].type === "filled") {
    newGrid[y][x].isClicked = true;
  }

  const diagonalsMovableCases = allDiagonalMoveHere(board, position);

  diagonalsMovableCases.forEach(({ x, y }) => {
    if (newGrid[y][x].type === "empty") {
      newGrid[y][x].canMoveHere = true;
    }
  });

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
  setGameRound: React.Dispatch<React.SetStateAction<number>>
) {
  const { x, y } = currentPosition;
  if (board[y][x].isClicked == true && board[y][x].color === color) {
    if (board[newPosition.y][newPosition.x].canMoveHere === true) {
      setBoard((prevBoard) => {
        const newBoard: BoardType = prevBoard.map((col) =>
          col.map((cell) => ({
            ...cell,
            canMoveHere: false,
            isClicked: false,
          }))
        );

        newBoard[newPosition.y][newPosition.x] = {
          ...newBoard[newPosition.y][newPosition.x],
          type: "filled",
          color: newBoard[y][x].color,
          isClicked: false,
          canMoveHere: false,
        };

        newBoard[y][x] = {
          ...newBoard[y][x],
          type: "empty",
          color: undefined,
          isClicked: false,
          canMoveHere: false,
        };
        setGameRound((round) => round + 1);
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
  setGameRound: React.Dispatch<React.SetStateAction<number>>
) {
  if (gameRound % 2 == 0) {
    ChangePosition(
      board,
      COLOR.White,
      currentPosition,
      newPosition,
      setBoard,
      setGameRound
    );
  } else {
    ChangePosition(
      board,
      COLOR.Black,
      currentPosition!,
      newPosition,
      setBoard,
      setGameRound
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function checkIfShouldPlay(
  board: BoardType,
  { x, y }: positionType,
  gameRound: number,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  setCurrentPosition: React.Dispatch<React.SetStateAction<positionType|undefined>>
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
  setCurrentPosition: React.Dispatch<React.SetStateAction<positionType|undefined>>
) {
  if (board[y][x].isClicked == true) return;

  setBoard((prevBoard) => {
    const newBoard = clickedFillCase(prevBoard, { x, y });
    setCurrentPosition({ x, y });
    return newBoard;
  });
}
