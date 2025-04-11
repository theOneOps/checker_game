import { useEffect, useState } from "react";
import {
  BoardType,
  COLOR,
  historyGameType,
  LENGTH,
  positionType,
  WIDTH_CASE,
} from "../utils/types";
import {
  checkIfShouldPlay,
  getCellBgClass,
  moveFunc,
  hasAnyCanTake,
} from "../utils/logicFunctions";

export default function GameBoard() {
  const [board, setBoard] = useState<BoardType>(
    Array.from({ length: LENGTH }, () =>
      Array.from({ length: LENGTH }, () => ({
        isClicked: false,
        canMoveHere: false,
        canDisappear: false,
        canTake: false,
        isQueen: false,
        type: "empty",
      }))
    )
  );

  const [historyGame, setHistoryGame] = useState<historyGameType>();

  const [currentPosition, setCurrentPosition] = useState<positionType>();

  const [canTake, setCanTake] = useState(false)

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

  useEffect(()=>{
    setCanTake(()=>hasAnyCanTake(board))
  },[board, gameRound])


  return (
    canTake ?<div className="flex">
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
                  onClick={ Row.canTake
                        ? () =>
                            checkIfShouldPlay(
                              board,
                              { x: i, y: j },
                              gameRound,
                              setBoard,
                              setCurrentPosition
                            )
                        : ()=>console.log("")}
                  className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
                  style={{
                    backgroundColor: Row.color,
                    border: Row.canTake ? "3px solid gold" : "none",
                  }}>
                  {`(${j}-${i})`}
                </div>
              ) : (
                <div
                  key={i * j + 10}
                  onClick={
                    Row.canMoveHere
                      ? () =>
                          moveFunc(
                            gameRound,
                            currentPosition!,
                            { x: i, y: j },
                            board,
                            setBoard,
                            setGameRound,
                            historyGame,
                            setHistoryGame,
                             canTake
                          )
                      : undefined
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
  :    <div className="flex">
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
                onClick={()=>checkIfShouldPlay(
                          board,
                          { x: i, y: j },
                          gameRound,
                          setBoard,
                          setCurrentPosition)
                }
                className="absolute w-[50px] h-[50px] rounded-4xl shadow-2xl"
                style={{
                  backgroundColor: `${Row.color}`,
                }}>
                {`(${j}-${i})`}
              </div>
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
                          setGameRound,
                          historyGame,
                          setHistoryGame,
                          canTake
                        )}
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
  
  )
}


