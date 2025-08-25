import type { CellColor } from "./cell";


export enum WallPlacement {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}

export class Wall {
  x: number;
  y: number;
  color: CellColor;
  side: WallPlacement; 

  constructor(x: number, y: number, color: CellColor, side: WallPlacement) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.side = side;
  }
}   
