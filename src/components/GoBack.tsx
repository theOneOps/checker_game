// A button to go backwards in the history...

import { goBack } from "../utils/logicFunctions"
import { BoardType, historyGameType } from "../utils/types"

type GoBackTypeProps = {
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>,
  historyGame:historyGameType | undefined,
  setHistoryGame: React.Dispatch<React.SetStateAction<historyGameType | undefined>>,
  setGameRound: React.Dispatch<React.SetStateAction<number>>,
}

export default function GoBack({ setBoard, historyGame, setHistoryGame, setGameRound}:GoBackTypeProps) {

  return (
    <button
    className="cursor-pointer"
    onClick={()=>goBack(setBoard, setGameRound, historyGame, setHistoryGame)}
    >Go Back</button>
  )
}