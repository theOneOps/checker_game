// A button to go backwards in the history...

import { goBack } from "../utils/logicFunctions"
import { BoardType, historyGameType } from "../utils/types"

type GoBackTypeProps = {
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  historyGame:historyGameType | undefined,
  setHistoryGame: React.Dispatch<React.SetStateAction<historyGameType | undefined>>,
  setGameRound: React.Dispatch<React.SetStateAction<number>>,
  setLeftNbWhite: React.Dispatch<React.SetStateAction<number>>,
  setLeftNbBlack: React.Dispatch<React.SetStateAction<number>>,
}

export default function GoBack({ setBoard, historyGame, setHistoryGame, setGameRound, setLeftNbWhite, setLeftNbBlack}:GoBackTypeProps) {

  return (
    <button
    className="cursor-pointer"
    onClick={()=>goBack(setBoard, setGameRound, historyGame, setHistoryGame, setLeftNbWhite, setLeftNbBlack)}
    >Go Back</button>
  )
}