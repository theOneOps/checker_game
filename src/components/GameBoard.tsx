import { useEffect, useState } from "react";
import {
  BoardType,
  historyGameType,
  positionType,
  WIDTH_CASE,
} from "../utils/types";
import {
  checkIfShouldPlay,
  getCellBgClass,
  moveFunc,
  hasAnyCanTake,
} from "../utils/logicFunctions";

type gameBoardType = {
  board:BoardType,
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  gameRound:number,
  setGameRound: React.Dispatch<React.SetStateAction<number>>,
  setLeftNbWhite: React.Dispatch<React.SetStateAction<number>>,
  setLeftNbBlack: React.Dispatch<React.SetStateAction<number>>,
  historyGame: historyGameType | undefined,
  setHistoryGame : React.Dispatch<React.SetStateAction<historyGameType | undefined>>
}

export default function GameBoard({board,setBoard,gameRound, setGameRound, setLeftNbWhite, setLeftNbBlack, historyGame, setHistoryGame}:gameBoardType) {
  

  const [currentPosition, setCurrentPosition] = useState<positionType>();

  const [canTake, setCanTake] = useState(false)
  

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
                              ()=>board,
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
                             canTake,
                             setLeftNbWhite,
                             setLeftNbBlack
                          )
                      : ()=>console.log("")
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
                  ()=>board,
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
                          canTake,
                          setLeftNbWhite,
                             setLeftNbBlack
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


