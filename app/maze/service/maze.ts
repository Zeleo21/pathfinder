import {Cell, CellColor, type Maze} from "./cell";
import {Algorithm, type MazeConfig} from "~/maze/service/config";
import {iterativeDFS} from "~/maze/algorithm-components/iterativedfs";

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class MazeGenerator {

  public static generateMazeStructure(config: MazeConfig): Maze {
    const nbColumns = config.width / config.wallSize;
    const nbLines = config.height / config.wallSize;

    let x = 0;
    let y = 0;
    const cells: Maze = [];

    for(let i = 0; i < nbColumns; i++) {
      for(let j = 0; j < nbLines; j++) {
        cells.push(new Cell(x, y, CellColor.BLACK, config));
        x += config.wallSize
      }
      y += config.wallSize;
      x = 0;
    }
    return cells;
  }

  public static getCellIndex(maze: Maze, { x = 0, y = 0 }): number {
    return maze.findIndex(cell => cell.x === x && cell.y === y);
  }

  public static getAlgorithm(name: Algorithm) {
      switch (name) {
      case Algorithm.ITERATIVE:
        return iterativeDFS;
    }
  }
}


