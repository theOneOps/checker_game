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

export type caseFilled = {
  color: COLOR;
  isClicked:boolean;
  name?: pieceNameType;
}

export type caseEmptied = {
  name?: pieceNameType;
  canMoveHere:boolean
};

export type BoardType = (caseFilled | caseEmptied | undefined)[][];

// type historique des coups joués