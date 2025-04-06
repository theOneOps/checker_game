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

export type pieceType = {
  color: COLOR;
  name?: pieceNameType;
};

export type BoardType = (pieceType | undefined)[][];

// type historique des coups joués