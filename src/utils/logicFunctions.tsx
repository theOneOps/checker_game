import { BoardType, LENGTH, positionType } from "./types";

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
    if ((newGrid[y][x].type === "empty")) {
      newGrid[y][x].canMoveHere = true;
    }
  });

  return newGrid;
}


export function isPositionOnBoard(position: positionType): boolean {
  const { x, y } = position;
  return x >= 0 && x <= LENGTH-1 && y >= 0 && y <= LENGTH-1 ? true : false;
}

export function allDiagonalMoveHere(
  board: BoardType,
  position: positionType
): positionType[] {

    const results : positionType[] = []

    function addOnBoard({x, y}:positionType)
    {
        if (isPositionOnBoard({x, y}))
            {
                if (board[y][x].type === "empty") 
                    results.push({x, y})
            }
    }


    const {x, y} = position

    // diagonal top left

    addOnBoard({x:x-1, y:y-1})

    // diagonal top right
    addOnBoard({x:x+1, y:y-1})

    // diagonal bottom left

    addOnBoard({x:x-1, y:y+1})

    // diagonal bottom right
    addOnBoard({x:x+1, y:y+1})

    console.log(results)

    return results
}
