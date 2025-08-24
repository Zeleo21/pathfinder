

export type Maze = Cell[];

export enum CellColor {
  BLACK = "black",
  WHITE = "white",
  RED = "red",
}

export class Cell {

  x: number;
  y: number;
  color: CellColor 
  visited = false;
  // add other properties later on
  

  constructor(x: number , y: number, color: CellColor) {
    this.x = x;
    this.y = y;
    this.color = color;
  } 
}
