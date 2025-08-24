import { mazeHeight, mazeWidth } from "../maze";
import { Cell, CellColor, type Maze } from "./cell";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MazeGenerator {

  public static wallWidth = 50;
  public static wallHeight = 50;



  public static generateMazeStructure(): Maze {
    const nbColumns = mazeWidth / MazeGenerator.wallWidth;
    const nbLines = mazeHeight / MazeGenerator.wallHeight;

    let x = 0;
    let y = 0;
    const cells = [];

    for(let i = 0; i < nbColumns; i++) {
      for(let j = 0; j < nbLines; j++) {
        cells.push(new Cell(x, y, CellColor.BLACK));
        x += MazeGenerator.wallWidth;
      }
      y += MazeGenerator.wallHeight;
      x = 0;
    }
    return cells;
  }

  public static updateMaze(maze: Maze): Maze {
    const newMaze = [...maze];
    const random = Math.floor(Math.random() * 10);
    newMaze[random] = {...newMaze[random], color: CellColor.WHITE };
    return newMaze;
  }

  public static getNeighbors(maze: Maze, cell: Cell): Cell[] {
  const neighbors: Cell[] = [];
  const cellX = cell.x;
  const cellY = cell.y;
  const cellSize = this.wallWidth;

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

}


