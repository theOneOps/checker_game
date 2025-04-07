import { BoardType, caseEmptied, caseFilled, LENGTH, positionType } from "./types";

export function clickedFillCase(
  board: BoardType,
  position: positionType
): BoardType {
  const newGrid = board.map((col) =>
    col.map((cell) => {
      if (cell === undefined) return undefined;
      if (cell as caseFilled) {
        return { ...(cell as caseFilled), isClicked: false };
      } else {
        return { ...cell as caseEmptied, canMoveHere: false };
      }
    })
  );

  const { x, y } = position;

  if (newGrid[y][x] !== undefined) {
    (newGrid[y][x] as caseFilled).isClicked = true;
  }

  const diagonalsMovalbleCases = allDiagonalMoveHere(board, position)

  diagonalsMovalbleCases.forEach(({x,y})=>{
    if (newGrid[y][x] !== undefined)
        (newGrid[y][x] as caseEmptied).canMoveHere = true;
})

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

    function addOnBoard({x:newX, y:newY}:positionType)
    {
        if (isPositionOnBoard({x:newX, y:newY}))
            {
                if (board[newY][newX] === undefined)
                    results.push({x:newX, y:newY})
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
