export const LENGTH = 10;

export const WIDTH_CASE = 70

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
  canMoveHere?: boolean; // present only when type === "empty"
  isQueen?:boolean; // present only if pawn become a queen
};

export type BoardType = Case[][];

// type historique des coups joués