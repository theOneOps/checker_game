import { useEffect, useState } from "react";
import {
  BoardType,
  COLOR,
  LENGTH,
  positionType,
  WIDTH_CASE,
} from "../utils/types";
import {
  checkIfShouldPlay,
  getCellBgClass,
  moveFunc,
} from "../utils/logicFunctions";

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

  const [currentPosition, setCurrentPosition] = useState<positionType>();

  // state to keep track pof the game round
  const [gameRound, setGameRound] = useState(0);

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

  return (
    <div className="flex">
      {board.map((Col, j) => (
        <div key={`${j}-${j}`} className="flex flex-col">
          {Col.map((Row, i) => {
            return (
              <div
                key={i}
                className={[
                  getCellBgClass({ Row, i, j }),
                  "border border-black",
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
                    onClick={() =>
                      checkIfShouldPlay(
                        board,
                        { x: i, y: j },
                        gameRound,
                        setBoard,
                        setCurrentPosition
                      )
                    }
                    className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
                    style={{
                      backgroundColor: `${Row.color}`,
                    }}>{`(${j}-${i})`}</div>
                ) : (
                  <div
                    key={i * j + 10}
                    onClick={() =>
                      moveFunc(
                        gameRound,
                        currentPosition!,
                        { x: i, y: j },
                        board,
                        setBoard,
                        setGameRound
                      )
                    }
                    className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl">
                    {`(${j}-${i})`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
