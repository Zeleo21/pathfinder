import { canvasHeight, canvasWidth } from "../components/canvas";
import { Cell, CellColor, type Maze } from "./cell";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MazeGenerator {

  public static wallWidth = 25;
  public static wallHeight = 25;
  public static startingXCell = 0;
  public static startingYCell = 0;


  public static generateMazeStructure(): Maze {
    const nbColumns = canvasWidth / MazeGenerator.wallWidth;
    const nbLines = canvasHeight / MazeGenerator.wallHeight;

    let x = 0;
    let y = 0;
    const cells: Maze = [];

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

}


