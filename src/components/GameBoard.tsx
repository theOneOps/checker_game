import { useEffect, useState } from "react";
import {
  BoardType,
  caseEmptied,
  caseFilled,
  COLOR,
  LENGTH,
  positionType,
  WIDTH_CASE,
} from "../utils/types";
import { clickedFillCase } from "../utils/logicFunctions";

export default function GameBoard() {

  const [board, setBoard] = useState<BoardType>(
    Array.from({ length: LENGTH }, () =>
      Array.from({ length: LENGTH }, () => undefined)
    )
  );

  const [gameRound, setGameRound] = useState(0)

  // Placement of pawns on the board
  useEffect(() => {
    setBoard((grid) => {
      const newGrid = [...grid];

      newGrid.forEach((Col, j)=>
      {
        Col.forEach((Row, i)=>{
          if ([0, 1, 2, 3].includes(i))
          {
            if (i % 2 == 0)
            {
              if ((i+j)%2 !== 0)
                {
                  newGrid[j][i] = {
                    color:COLOR.Black,
                    isClicked:false,
                    canMoveHere:false
                  }
                }
            }
            else
            {
              if ((i+j) % 2 !== 0)
                {
                  newGrid[j][i] = {
                    color:COLOR.Black,
                    isClicked:false,
                    canMoveHere:false
                  }
                }
            }
          }
          else if ([6, 7, 8, 9].includes(i))
            {
              if (i % 2 == 0)
                {
                  if ((i+j)%2 !== 0)
                    {
                      newGrid[j][i] = {
                        color:COLOR.White,
                        isClicked:false,
                        canMoveHere:false
                      }
                    }
                }
                else
                {
                  if ((i+j)%2 !== 0)
                    {
                      newGrid[j][i] = {
                        color:COLOR.White,
                        isClicked:false,
                        canMoveHere:false
                      }
                    }
                }
            } 
        })
      })
      return newGrid;
    });
  }, []);

  function clickFillCase({x, y}:positionType)
  {

    if (board[y][x] !== undefined && (board[y][x] as caseFilled).isClicked == true)
      return

    setBoard(prevBoard => {
      const newBoard = clickedFillCase(prevBoard, {x, y})
      return newBoard
    })
  }

  function isCaseFilled(cell: any): cell is caseFilled {
  return cell && cell.color;
}

function isCaseEmptied(cell: any): cell is caseEmptied {
  return cell && !cell.color;
}



  return (
    <div className="flex">
      {board.map((Col, j) => (
        <div
        key={`${j}-${j}`}
         className="flex flex-col">
          {Col.map((Row, i) => (
            <div
            key={i}
            className={
              Row !== undefined && isCaseFilled(Row) && Row.isClicked
                ? "bg-green-900 border border-black"
                : Row !== undefined && isCaseEmptied(Row) && Row.canMoveHere
                ? "bg-green-900 border border-black"
                : (i + j) % 2 === 0
                ? "bg-amber-200 border border-black"
                : "bg-orange-950 border border-black"
            }
            
              style={{
                width: `${WIDTH_CASE}px`,
                height: `${WIDTH_CASE}px`,
                cursor: "pointer",
                position: "relative",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
              }}>
              {Row !== undefined ? (
                <div
                key={i*j+1}
                onClick={()=>clickFillCase({x:i, y:j})}
                  className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
                  style={{
                    backgroundColor: `${(Row as caseFilled).color}`,
                  }}>{`(${j}-${i})`}</div>
              ): <div
              key={(i*j)+10}
              className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
              >{`(${j}-${i})`}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
