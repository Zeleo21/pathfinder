import { Rect, Path } from 'react-konva';
import React from 'react';
import { CellColor, type Cell, type Maze } from '../service/cell';
import { MazeGenerator } from '../service/maze';

//We draw the cell as a rect and the walls as a path containing 4 lines  
export function DrawStructure(props: { maze: Maze, currentCell: Cell }) {
 return (
    <>
      {props.maze.map((elt: Cell, index: number) => (
        <React.Fragment key={index}>
          <Rect
            x={elt.x}
            y={elt.y}
            width={MazeGenerator.wallWidth}
            height={MazeGenerator.wallHeight}
            fill={!elt.isFirstNodeOfMaze() && props.currentCell.x === elt.x && props.currentCell.y === elt.y ? CellColor.RED : elt.color}
          />
          <Path
            data={elt.draw(MazeGenerator.wallWidth, MazeGenerator.wallHeight)}
            stroke="white"
            strokeWidth={2}
          />
        </React.Fragment>
      ))}
    </>
  );
 } 
