import { Stage, Layer, Rect, Path } from 'react-konva';
import React, { Fragment, useEffect, useState, type JSX } from 'react';
import type { Cell, Maze } from '../service/cell';
import { MazeGenerator } from '../service/maze';
import { DrawStructure } from './drawStructure';
import { iterativeDFS } from '../algorithm-components/iterativedfs';

export const canvasWidth = 500;
export const canvasHeight = 500;



export function Canvas() {

  const [maze, setMaze] = useState<Maze>(MazeGenerator.generateMazeStructure());
  const [currentCell, setCurrentCell] = useState<Cell>(maze[0]); 
  const [currentGenerationAlgorithm, setCurrentGenerationAlgorithm] =
  useState(() => iterativeDFS);
  const [isAlgoRunning, setIsAlgoRunning] = useState(false);

  const handleStart = () => {
    setIsAlgoRunning(true);
  }

  useEffect(() => {
    if(isAlgoRunning) {
      currentGenerationAlgorithm(maze, setMaze, setCurrentCell);
    }
  },[isAlgoRunning]);

  return (
     <div>
      <div className="flex justify-center m-10">
        <div className="flex space-x-5">
          <button onClick={handleStart} className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"> Start </button>
        </div>
      </div>
      <div className="flex justify-center m-10">  
      <Stage width={canvasWidth} height={canvasHeight} style={{ backgroundColor: 'black' }}>
        <Layer>
          <DrawStructure maze={maze} currentCell={currentCell}/>
        </Layer>
      </Stage>
      </div>
    </div>
  );
}
