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
    <div className="flex justify-center">
      <button
      disabled={historyGame?.length===0}
    className="cursor-pointer px py-2 bg-amber-900 w-32 rounded-4xl text-lg capitalize transition duration-300 text-amber-100 hover:transform hover:scale-105" 
    onClick={()=>goBack(setBoard, setGameRound, historyGame, setHistoryGame)}
    >Go Back</button>
    </div>
  )
}