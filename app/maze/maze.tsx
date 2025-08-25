import { Stage, Layer, Rect, Path } from 'react-konva';
import React, { Fragment, useEffect, useState, type JSX } from 'react';
import { delay, MazeGenerator } from './service/maze';
import { Cell, CellColor, type Maze } from './service/cell';
import type { WallPlacement } from './service/wall';

export const mazeWidth = 500;
export const mazeHeight = 500;



export function MazeComponent() {

  const DrawMazeStructure = (props: { maze: Maze }): JSX.Element => {

  let pathData = '';

  props.maze.forEach((elt) => {
      pathData += elt.draw(MazeGenerator.wallWidth, MazeGenerator.wallHeight);
  });
    return ( 
      <Path
        data={pathData}
        stroke="white"
        strokeWidth={2}
      />
    )
 }


  const iterativeDFS = async() => {
    const startNode = maze[0];
    const stack: Cell[] = [];
    const currentMaze = [...maze];
    const startIndex = currentMaze.findIndex(c => c.x === startNode.x && c.y === startNode.y);
    if (startIndex !== -1) {
      currentMaze[startIndex].visited = true;
      console.log(currentMaze[startIndex]);
      stack.push(currentMaze[startIndex]);
    }

    setMaze(currentMaze);
    await delay(50);

    while(stack.length > 0) {
      const currentNode: Cell = stack.pop();
      setCurrentCell(currentNode);
      const neighbors = currentNode.getNeighbors(currentMaze); 

      if(neighbors.length > 0) {
    
        stack.push(currentNode);
        const randomUnvisitedNeighbor: Cell = neighbors[Math.floor(Math.random() * neighbors.length)];
        const chosenCellIndex = currentMaze.findIndex(c => c.x === randomUnvisitedNeighbor.x && c.y === randomUnvisitedNeighbor.y);
        if(chosenCellIndex !== -1) {
          //We get the current and the opposite wall to remove them from both cells
          const currentNodeCommonWall: WallPlacement = currentNode.getCommonWall(currentMaze[chosenCellIndex])
          const chosenNodeCommonWall: WallPlacement = currentNode.getOppositeWall(currentNodeCommonWall);

          currentNode.removeWall(currentNodeCommonWall);
          currentMaze[chosenCellIndex].removeWall(chosenNodeCommonWall);
          


          const currentCellIndex = currentMaze.findIndex(c => c.x === currentNode.x && c.y === currentNode.y);
          
          if(currentCellIndex !== -1) {
            currentMaze[currentCellIndex].visited = true;
            currentMaze[chosenCellIndex].visited = true;

            stack.push(currentMaze[chosenCellIndex]);
          }


        }
        setMaze([...currentMaze]);
        await delay(50);

      }

    }

  };

 const [maze, setMaze] = useState<Maze>(MazeGenerator.generateMazeStructure());
 const [currentCell, setCurrentCell] = useState<Cell>(maze[0]); 

  useEffect(() => {
     iterativeDFS();
  }, []);

    return (
   <>

    <div className="flex justify-center m-15">  
    <Stage width={mazeWidth} height={mazeHeight} style={{ backgroundColor: 'black' }}>
      <Layer>
        <DrawMazeStructure maze={maze}/>
      </Layer>
    </Stage>
    </div>
  </>
    )
}
