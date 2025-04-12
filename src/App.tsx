import GameBoard from "./components/GameBoard";
import "./App.css";
import { useEffect, useState } from "react";
import Score from "./components/Score";
import GoBack from "./components/GoBack";
import { BoardType, COLOR, historyGameType, LENGTH } from "./utils/types";

export default function App() {
  const [gameRound, setGameRound] = useState(0);
  const [leftNbWhite, setLeftNbWhite] = useState(20);
  const [leftNbBlack, setLeftNbBlack] = useState(20);
  const [historyGame, setHistoryGame] = useState<historyGameType>();
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

  useEffect(() => {
    let whiteCount = 0;
    let blackCount = 0;

    // Loop through the board to count pieces
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === "filled") {
          if (cell.color === COLOR.White) {
            whiteCount++;
          } else if (cell.color === COLOR.Black) {
            blackCount++;
          }
        }
      });
    });

    // Update the number of pieces left
    setLeftNbWhite(whiteCount);
    setLeftNbBlack(blackCount);
  }, [board]); // Run this effect every time the board changes

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-orange-700 text-2xl text-center capitalize">
        The Checker's Game
      </h1>
      <div>
        <div className="flex space-x-2 justify-center items-center">
          <GameBoard
            board={board}
            setBoard={setBoard}
            gameRound={gameRound}
            setGameRound={setGameRound}
            setLeftNbWhite={setLeftNbWhite}
            setLeftNbBlack={setLeftNbBlack}
            historyGame={historyGame}
            setHistoryGame={setHistoryGame}
          />
          <div className="flex flex-col">
            <Score
              gameRound={gameRound}
              leftNbWhite={leftNbWhite}
              leftNbBlack={leftNbBlack}
            />
            <GoBack
              setBoard={setBoard}
              historyGame={historyGame}
              setHistoryGame={setHistoryGame}
              setGameRound = {setGameRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
