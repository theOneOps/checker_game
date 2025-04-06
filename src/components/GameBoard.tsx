import { useEffect, useState } from "react";
import {
  BoardType,
  COLOR,
  LENGTH,
  pieceType,
  WIDTH_CASE,
} from "../utils/types";

export default function GameBoard() {
  const piece: pieceType = {
    color: COLOR.White,
    name: {
      e: "5",
    },
  };

  const [board, setBoard] = useState<BoardType>(
    Array.from({ length: LENGTH }, () =>
      Array.from({ length: LENGTH }, () => undefined)
    )
  );

  // to know if we click or not on the case
  
  const [boardClicked, setBoardClicked] = useState<BoardType>(
    Array.from({ length: LENGTH }, () =>
      Array.from({ length: LENGTH }, () => undefined)
    )
  );



  useEffect(() => {
    setBoard((grid) => {
      const newGrid = [...grid];

      newGrid[0][0] = piece;

      newGrid[2][9] = {...piece, color:COLOR.Black};
      return newGrid;
    });

    
  }, []);

  return (
    <div className="flex">
      {board.map((Col, j) => (
        <div className="flex flex-col">
          {Col.map((Row, i) => (
            <div
              className={
                boardClicked[j][i]
    ? "bg-green-200 border border-black":
                (i + j) % 2 == 0
                  ? `bg-amber-200 border border-black`
                  : `bg-orange-950 border border-black`
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
              {Row !== undefined && (
                <div
                  className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
                  style={{
                    backgroundColor: `${Row.color}`,
                  }}></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
