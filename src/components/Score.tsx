// Here, we print who is next to play, and the number of pawns each player has taken form each other
// So for the second part, we need two state to keep  the number of pawns in track

type scoreType = {
  gameRound: number;
  leftNbWhite: number;
  leftNbBlack: number;
};
export default function Score({
  gameRound,
  leftNbWhite,
  leftNbBlack,
}: scoreType) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 justify-center">
        <span className="text-white">Turn of</span>
        <div className="w-[25px] h-[25px] rounded-4xl shadow-2xl"
        style={gameRound % 2 === 0 ? {backgroundColor: "#beb2ae"} : {backgroundColor: "black"}}
        ></div>
      </div>

      <div className="flex gap-2">

        <div className="flex flex-col">{/* black div */} 
          <div className="flex gap-1">
            <div className="w-[25px] h-[25px] rounded-4xl shadow-2xl"
            style={{backgroundColor: "black"}}></div> {/* black */} 
            <span  className="text-white">left : {leftNbBlack}</span>
          </div>
        </div>

        <div className="flex flex-col">{/* white div */} 
          <div className="flex gap-1">
            <div className="w-[25px] h-[25px] rounded-4xl shadow-2xl"
            style={{backgroundColor: "#beb2ae"}}
            ></div> {/* white */} 
            <span  className="text-white">left : {leftNbWhite}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
