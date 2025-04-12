export const LENGTH = 10;

export const WIDTH_CASE = 70;

export type positionType = {
  x: number;
  y: number;
};

export enum COLOR {
  Black = "black",
  White = "#beb2ae",
}

export type pieceNameType = {
  [key: string]: string;
};

export type Case = {
  type: "filled" | "empty";
  name?: pieceNameType;
  color?: COLOR; // present only when type === "filled"
  isClicked?: boolean; // present only when type === "filled"
  isQueen?: boolean; // present only if pawn become a queen
  canMoveHere?: boolean; // present only when type === "empty"
  canDisappear?: boolean; // present if pawn should disappear
  canTake?: boolean; //  present if possibility of taking some adverse pawns
};

export type BoardType = Case[][];

// type history of move played

export type historyGameType = [COLOR, positionType, positionType][]; // Color of the player who have played the move, old and new position of a pawn