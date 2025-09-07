import { Rect, Path } from 'react-konva';
import React from 'react';
import { CellColor, type Cell, type Maze } from '../service/cell';
import {defaultConfig, type MazeConfig} from "~/maze/service/config";

//We draw the cell as a rect and the walls as a path containing 4 lines
export function DrawStructure(props: { maze: Maze, currentCell: Cell, config: MazeConfig }) {
    const width = props.config?.width ?? defaultConfig.width;
    const height = props.config?.height ?? defaultConfig.height;
    const wallSize = props.config?.wallSize ?? defaultConfig.wallSize;
    return (
    <>
      {props.maze.map((elt: Cell, index: number) => (
        <React.Fragment key={index}>
          <Rect
            x={elt.x}
            y={elt.y}
            width={wallSize}
            height={wallSize}
            fill={!elt.isFirstNodeOfMaze() && props.currentCell.x === elt.x && props.currentCell.y === elt.y ? CellColor.RED : elt.color}
          />
          <Path
            data={elt.draw(wallSize, wallSize)}
            stroke="white"
            strokeWidth={props.config?.strokeSize ?? defaultConfig.strokeSize}
          />
        </React.Fragment>
      ))}
        </>
      );
 } 
