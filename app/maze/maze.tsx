import { Stage, Layer, Rect, Path } from 'react-konva';
import React, { Fragment, useEffect, useState, type JSX } from 'react';
import { delay, MazeGenerator } from './service/maze';
import { Cell, CellColor, type Maze } from './service/cell';

export const mazeWidth = 500;
export const mazeHeight = 500;



const createCell = (x: number, y: number, color: string): JSX.Element => {
  return (
  <Rect
    x={x}
    y={y}
    width={MazeGenerator.wallWidth}
    height={MazeGenerator.wallHeight}
    fill={color}
   />
  )
}





export function MazeComponent() {

  const DrawMazeStructure = (props: { maze: Maze }): JSX.Element => {

  const cells: JSX.Element[] = [];

  props.maze.forEach((elt) => {
    cells.push(createCell(elt.x, elt.y, elt.color));
  });
    return <>{cells}</>
 }


 


  const iterativeDFS = async () => {
      const startNode = maze[0];
      const stack: Cell[] = [];

      // Create a copy of the maze to work with
      const newMaze = [...maze];

      // Find and update the start cell in the new maze copy
     const startIndex = newMaze.findIndex(c => c.x === startNode.x && c.y === startNode.y);
     if (startIndex !== -1) {
        newMaze[startIndex] = { ...newMaze[startIndex], visited: true, color: CellColor.WHITE };
        stack.push(newMaze[startIndex]);
     }

       setMaze(newMaze);
        await delay(50);

        while (stack.length > 0) {
            const currentNode: Cell = stack.pop();

            console.log('currentNode : ', currentNode);
            const neighbors = MazeGenerator.getNeighbors(currentNode, newMaze);

            console.log('neighbors : ', neighbors);
            if (neighbors.length > 0) {
                stack.push(currentNode);

                const randomUnvisitedNeighbor: Cell = neighbors[Math.floor(Math.random() * neighbors.length)];
       const chosenCellIndex = newMaze.findIndex(c => c.x === randomUnvisitedNeighbor.x && c.y === randomUnvisitedNeighbor.y);

        console.log('chosenCellIndex : ', chosenCellIndex);

      if (chosenCellIndex !== -1) {
        newMaze[chosenCellIndex] = {
          ...newMaze[chosenCellIndex],
          color: CellColor.WHITE,
          visited: true
        };

        stack.push(newMaze[chosenCellIndex]);
      }

      setMaze([...newMaze]);
            }
            await delay(50);
        }
  };


 const [maze, setMaze] = useState<Maze>(MazeGenerator.generateMazeStructure());

  useEffect(() => {

    // const interval = setInterval(() => {
    //   setMaze(prevMaze => { return MazeGenerator.updateMaze(prevMaze) });
    // }, 1000);

    // return () => clearInterval(interval);
    iterativeDFS();
  }, []);

    return (
   <>

    <div className="flex justify-center m-15">  
    <Stage width={mazeWidth} height={mazeHeight} style={{ backgroundColor: 'white' }}>
      <Layer>
        <DrawMazeStructure maze={maze}/>
      </Layer>
    </Stage>
    </div>
  </>
    )
}
