import { MazeGenerator } from "./maze";
import { WallPlacement, Wall } from "./wall";


export type Maze = Cell[];

export enum CellColor {
  BLACK = "black",
  WHITE = "white",
  RED = "red",
  ORANGE = "orange",
  YELLOW = "yellow",
  GREEN = "green",
  BLUE = "blue",
}

export const nbOfWalls = 4;

export class Cell {

  x: number;
  y: number;
  color: CellColor 
  walls: Wall[]; 
  visited: boolean;
  

  constructor(x: number , y: number, color: CellColor) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.visited = false;
    this.walls = [
      new Wall(x, y, CellColor.WHITE, WallPlacement.TOP),
      new Wall(x, y + MazeGenerator.wallHeight , CellColor.WHITE, WallPlacement.BOTTOM),
      new Wall(x, y, CellColor.WHITE, WallPlacement.LEFT),
      new Wall(x + MazeGenerator.wallWidth, y, CellColor.WHITE, WallPlacement.RIGHT),
    ];
  } 


  public draw(width: number, height: number) {
    let path = '';
    const topWall = this.walls.find(wall => wall.side === WallPlacement.TOP);
    const bottomWall = this.walls.find(wall => wall.side === WallPlacement.BOTTOM);
    const leftWall = this.walls.find(wall => wall.side === WallPlacement.LEFT);
    const rightWall = this.walls.find(wall => wall.side === WallPlacement.RIGHT);

    if (topWall) {
      path += `M ${this.x} ${this.y} L ${this.x + width} ${this.y}`;
    }

    if (rightWall) {
      path += `M ${this.x + width} ${this.y} L ${this.x + width} ${this.y + height}`;
    }

    if (bottomWall) {
      path += `M ${this.x + width} ${this.y + height} L ${this.x} ${this.y + height}`;
    }

    if (leftWall) {
      path += `M ${this.x} ${this.y + height} L ${this.x} ${this.y}`;
    }

    return path;
  }


 public getNeighbors(maze: Maze): Cell[] {
    const neighbors: Cell[] = [];
    const cellX = this.x;
    const cellY = this.y;
    const cellSize = MazeGenerator.wallWidth;

    const possibleNeighbors = [
      { x: cellX, y: cellY - cellSize }, 
      { x: cellX, y: cellY + cellSize }, 
      { x: cellX - cellSize, y: cellY }, 
      { x: cellX + cellSize, y: cellY }, 
    ];

    for (const pos of possibleNeighbors) {
      const neighborCell = maze.find(c => c.x === pos.x && c.y === pos.y && c.visited === false);
      if (neighborCell) {
        neighbors.push(neighborCell);
      }
    }

    return neighbors;
  }

  public getCommonWall(cell: Cell): WallPlacement {
    if(cell.y > this.y) return WallPlacement.BOTTOM;
    if(cell.y < this.y) return WallPlacement.TOP;
    if(cell.x > this.x) return WallPlacement.RIGHT;
    return WallPlacement.LEFT;
  }

  public getOppositeWall(side: WallPlacement): WallPlacement {
    switch(side){
      case WallPlacement.LEFT:
        return WallPlacement.RIGHT;
      case WallPlacement.TOP:
        return WallPlacement.BOTTOM;
      case WallPlacement.RIGHT:
        return WallPlacement.LEFT;
      case WallPlacement.BOTTOM:
        return WallPlacement.TOP;
    }
  }

  public removeWall(side: WallPlacement): Wall[] {
    const newWalls = this.walls.filter((wall) => wall.side !== side);
    this.walls = newWalls;
    return newWalls;
  }

  public isFirstNodeOfMaze() {
    return this.x === MazeGenerator.startingXCell && this.y === MazeGenerator.startingYCell; 
  }
}
