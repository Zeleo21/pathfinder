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
            const neighbors = MazeGenerator.getNeighbors(maze, currentNode);

            console.log('neighbors : ', neighbors);
            if (neighbors.length > 0) {
                stack.push(currentNode);

                const randomUnvisitedNeighbor: Cell = neighbors[Math.floor(Math.random() * neighbors.length)];
              // Find the index of the chosen cell in the state
       const chosenCellIndex = maze.findIndex(c => c.x === randomUnvisitedNeighbor.x && c.y === randomUnvisitedNeighbor.y);

       // Create a new maze array to update the state
       const updatedMaze = [...maze];

      if (chosenCellIndex !== -1) {
        // Update the cell's properties
        updatedMaze[chosenCellIndex] = {
          ...updatedMaze[chosenCellIndex],
          color: CellColor.WHITE,
          visited: true
        };

        // Add the updated cell to the stack
        stack.push(updatedMaze[chosenCellIndex]);
      }

      setMaze(updatedMaze);
            }
            await delay(500);
        }
  };


  // const iterativeDFS = async (maze: Maze, startNode: Cell ) => {


  // console.log(startNode);
  // const stack = [startNode];

  // 

  // while (stack.length > 0) {
  //   const currentNode: Cell = stack.pop();
  //   console.log('currentNode : ', currentNode);
  //   const neighbors = MazeGenerator.getNeighbors(maze, currentNode);
  //   console.log('neighbors : ',  neighbors);
  //   const nbrOfUnvisitedNeighbors = neighbors.length;
  //   
  //   // We get a Random unvisited neighbor
  //   const randomUnvisitedNeighbor: Cell = neighbors[Math.floor(Math.random() * nbrOfUnvisitedNeighbors)];

  //   const chosenCell: Cell = {...randomUnvisitedNeighbor, color: CellColor.WHITE, visited: true};

  //   stack.push(chosenCell);


  //   setMaze(prevMaze => {
  //     const newMaze = [...prevMaze, chosenCell];
  //     return newMaze;
  //   });

  //   await delay(50); 

  //   }
  // } 






 const [maze, setMaze] = useState<Maze>(MazeGenerator.generateMazeStructure());

  useEffect(() => {

    // const interval = setInterval(() => {
    //   setMaze(prevMaze => { return MazeGenerator.updateMaze(prevMaze) });
    // }, 1000);

    // return () => clearInterval(interval);
    iterativeDFS(maze, maze[0]);
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
