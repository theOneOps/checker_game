import { useEffect, useState } from "react";
import {
  BoardType,
  Case,
  COLOR,
  LENGTH,
  positionType,
  WIDTH_CASE,
} from "../utils/types";
import { clickedFillCase } from "../utils/logicFunctions";

export default function GameBoard() {
  const [board, setBoard] = useState<BoardType>(
    Array.from({ length: LENGTH }, () =>
      Array.from({ length: LENGTH }, () => ({
        isClicked: false,
        canMoveHere: false,
        type: "empty",
      }))
    )
  );

  // state to keep track pof the game round
  //const [gameRound, setGameRound] = useState(0)

  // Placement of pawns on the board
  useEffect(() => {
    setBoard((grid) => {
      
      const newGrid = [...grid];

      newGrid.forEach((Col, j) => {
        Col.forEach((Row, i) => {
          if ([0, 1, 2, 3].includes(i)) {
            if (i % 2 == 0) {
              if ((i + j) % 2 !== 0) {
                newGrid[j][i] = {
                  color: COLOR.Black,
                  isClicked: false,
                  canMoveHere: false,
                  type: "filled",
                };
              }
            } else {
              if ((i + j) % 2 !== 0) {
                newGrid[j][i] = {
                  color: COLOR.Black,
                  isClicked: false,
                  canMoveHere: false,
                  type: "filled",
                };
              }
            }
          } else if ([6, 7, 8, 9].includes(i)) {
            if (i % 2 == 0) {
              if ((i + j) % 2 !== 0) {
                newGrid[j][i] = {
                  color: COLOR.White,
                  isClicked: false,
                  canMoveHere: false,
                  type: "filled",
                };
              }
            } else {
              if ((i + j) % 2 !== 0) {
                newGrid[j][i] = {
                  color: COLOR.White,
                  isClicked: false,
                  canMoveHere: false,
                  type: "filled",
                };
              }
            }
          }
        });
      });
      return newGrid;
    });
  }, []);

  function clickFillCase({ x, y }: positionType) {
    if (board[y][x].isClicked == true) return;

    setBoard((prevBoard) => {
      const newBoard = clickedFillCase(prevBoard, { x, y });
      return newBoard;
    });
  }

  const getCellBgClass = ({Row, i , j}: {Row:Case, i:number, j:number}) => {
    if (Row.isClicked || Row.canMoveHere) return "bg-green-900";
    return (i + j) % 2 === 0 ? "bg-amber-200" : "bg-orange-950";
  };
  

  return (
    <div className="flex">
      {board.map((Col, j) => (
        <div key={`${j}-${j}`} className="flex flex-col">
          {Col.map((Row, i) => {
  return (
            <div
              key={i}
              className={[
                getCellBgClass({Row, i, j}),
                "border border-black"
              ].join(" ")}
              style={{
                width: `${WIDTH_CASE}px`,
                height: `${WIDTH_CASE}px`,
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {Row.type === "filled" ? (
                <div
                  key={i * j + 20}
                  onClick={() => clickFillCase({ x: i, y: j })}
                  className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
                  style={{
                    backgroundColor: `${Row.color}`,
                  }}>{`(${j}-${i})`}</div>
              ) : (
                <div
                  key={i * j + 10}
                  className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl">{`(${j}-${i})`}</div>
              )}
            </div>
          )})}
        </div>
      ))}
    </div>
  );
}
