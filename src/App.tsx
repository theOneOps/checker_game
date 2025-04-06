import GameBoard from "./components/GameBoard";
import "./App.css"

export default function App() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-orange-700 text-2xl text-center capitalize">The Checker's Game</h1>
      <div className="flex space-x-2 justify-center items-center">
        <GameBoard />
      </div>
    </div>
  );
}
